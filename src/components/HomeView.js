import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 10,
};

Geolocation.setRNConfiguration(GEOLOCATION_OPTIONS);

export default class HomeView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      myPosition: null,
      region: null,
    };
  }

  watchLocation() {
    this.watchID = Geolocation.watchPosition(
      (position) => {
        const myLastPosition = this.state.myPosition;
        const myPosition = position.coords;
        if (myPosition !== myLastPosition) {
          this.setState({myPosition});
          let region = {
            latitude: myPosition.latitude,
            longitude: myPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          this.setState({region});
        }
      },
      null,
      this.props.geolocationOptions,
    );
  }

  componentDidMount() {
    this.mounted = true;

    if (Platform.OS === 'android') {
      PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <MapView style={styles.map} region={this.state.region}>
          <Marker
            anchor={{x: 0.5, y: 0.5}}
            style={styles.mapMarker}
            {...this.props}
            coordinate={this.state.myPosition}>
            <View style={styles.container}>
              <View style={styles.markerHalo} />

              <View style={styles.marker} />
            </View>
            {this.props.children}
          </Marker>
        </MapView>
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
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    width: HALO_SIZE,
    height: HALO_SIZE,
    borderRadius: Math.ceil(HALO_SIZE / 2),
    margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  marker: {
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: SIZE,
    height: SIZE,
    borderRadius: Math.ceil(SIZE / 2),
    margin: (HEADING_BOX_SIZE - SIZE) / 2,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
