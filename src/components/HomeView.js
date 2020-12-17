import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

Icon.loadFont();

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 10,
};

Geolocation.setRNConfiguration(GEOLOCATION_OPTIONS);

const myPlace = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        bike: "true",
        pedestrian: "true",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [3.725266456604004, 51.05965805789785],
            [3.71912956237793, 51.060602094874234],
            [3.716897964477539, 51.05720347167124],
            [3.719301223754883, 51.05412831189872],
            [3.7192153930664062, 51.052239954696695],
            [3.720674514770508, 51.05175436468443],
            [3.7204170227050777, 51.04905654967599],
            [3.721532821655273, 51.04500953250352],
            [3.718271255493164, 51.042635117855774],
            [3.724880218505859, 51.039073267688664],
            [3.728656768798828, 51.047734562953956],
            [3.731789588928223, 51.04862488469109],
            [3.728055953979492, 51.055692892390816],
            [3.728957176208496, 51.05701465195619],
            [3.726167678833008, 51.05812058504876],
            [3.7265539169311523, 51.05933438364608],
            [3.725266456604004, 51.05965805789785],
          ],
        ],
      },
    },
  ],
};

export default class HomeView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      myPosition: myPlace,
      region: null,
      followLocation: true,
    };
  }

  componentWillMount() {
    ////
    // 1.  Wire up event-listeners
    //

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(this.onLocation, this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(this.onMotionChange);

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(this.onActivityChange);

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange(this.onProviderChange);

    ////
    // 2.  Execute #ready method (required)
    //
    BackgroundGeolocation.ready(
      {
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        // Activity Recognition
        stopTimeout: 1,
        // Application config
        debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: true, // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true, // <-- Auto start tracking when device is powered-up.
        // HTTP / SQLite config
        url: 'http://192.168.0.20/api/locations',
        batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
        autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
        headers: {
          // <-- Optional HTTP headers
          'X-FOO': 'bar',
        },
        params: {
          // <-- Optional HTTP params
          auth_token: 'maybe_your_server_authenticates_via_token_YES?',
        },
      },
      (state) => {
        console.log(
          '- BackgroundGeolocation is configured and ready: ',
          state.enabled,
        );

        if (!state.enabled) {
          ////
          // 3. Start tracking!
          //
          BackgroundGeolocation.start(function () {
            console.log('- Start success');
          });
        }
      },
    );
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }
  onLocation(location) {
    console.log('[location] -', location);
  }
  onError(error) {
    console.warn('[location] ERROR -', error);
  }
  onActivityChange(event) {
    console.log('[activitychange] -', event); // eg: 'on_foot', 'still', 'in_vehicle'
  }
  onProviderChange(provider) {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  onMotionChange(event) {
    console.log('[motionchange] -', event.isMoving, event.location);
  }

  watchLocation() {
    this.watchID = Geolocation.watchPosition(
      (position) => {
        const myPosition = position.coords;
        if (myPosition !== this.state.myPosition) {
          this.setState({ myPosition });
          if (this.state.followLocation) {
            let region = {
              latitude: myPosition.latitude,
              longitude: myPosition.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            };
            this.setState({ region });
          }
        }
      },
      null,
      this.props.geolocationOptions
    );
  }

  componentDidMount() {
    this.mounted = true;

    if (Platform.OS === "android") {
      PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((granted) => {
        if (granted && this.mounted) {
          this.watchLocation();
        }
      });
    } else {
      this.watchLocation();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.watchID) {
      Geolocation.clearWatch(this.watchID);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onPanDrag={(event: MapEvent) =>
            this.setState({ followLocation: false })
          }
        >
          <Marker
            anchor={{ x: 0.5, y: 0.5 }}
            style={styles.mapMarker}
            {...this.props}
            coordinate={this.state.myPosition}
          >
            <View style={styles.container}>
              <View style={styles.markerHalo} />

              <View style={styles.marker} />
            </View>
            {this.props.children}
          </Marker>
          <Geojson
            geojson={myPlace}
            strokeColor="#3498db"
            fillColor="#3498db44"
            strokeWidth={2}
          />
        </MapView>
        <View style={styles.button}>
          <Button
            icon={
              <Icon
                raised
                name="location-arrow"
                type="font-awesome"
                size={23}
                color={this.state.followLocation ? "blue" : "grey"}
              />
            }
            type="outline"
            raised
            onPress={() => {
              this.setState({ followLocation: true });
              let region = {
                latitude: this.state.myPosition.latitude,
                longitude: this.state.myPosition.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              };
              this.setState({ region });
            }}
          />
        </View>
      </View>
    );
  }
}

const SIZE = 12;
const HALO_RADIUS = 7;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
  },
  mapMarker: {
    zIndex: 1000,
  },
  markerHalo: {
    position: "absolute",
    backgroundColor: "white",
    top: 0,
    left: 0,
    width: HALO_SIZE,
    height: HALO_SIZE,
    borderRadius: Math.ceil(HALO_SIZE / 2),
    margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  marker: {
    justifyContent: "center",
    backgroundColor: "blue",
    width: SIZE,
    height: SIZE,
    borderRadius: Math.ceil(SIZE / 2),
    margin: (HEADING_BOX_SIZE - SIZE) / 2,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  button: {
    position: "absolute",
    top: 5,
    right: 5,
    alignSelf: "flex-end",
  },
});
