import * as React from 'react';
import {View, Text, StyleSheet, Settings, Platform, Alert, Pressable} from 'react-native';
import MapView, {Marker, Geojson} from 'react-native-maps';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Notifications} from 'react-native-notifications';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

Icon.loadFont();

export default class HomeView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.navigation = props.navigation;

    let deviceId;
    if (this.getData('deviceId') == null) {
      deviceId = uuidv4();
      this.SetData('deviceId', deviceId);
    } else {
      deviceId = this.getData('deviceId');
    }

    let initialPosition;
    if (Platform.OS == 'android') {
      initialPosition = {
        latitude: 50.85,
        longitude: 4.35,
        latitudeDelta: 2.5,
        longitudeDelta: 2.5
      };
    } else {
      initialPosition = null;
    }

    this.state = {
      myPosition: initialPosition,
      region: initialPosition,
      followLocation: true,
      lastState: false,
      geojson: null,
      deviceId: deviceId,
    };

    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground(
      (notification: Notification, completion) => {
        console.log(
          `Notification received in foreground: ${notification.title} : ${notification.body}`,
        );
        completion({alert: false, sound: false, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification: Notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
      },
    );
  }

  async getData(key) {
      if (Platform.OS == 'android') {
          try {
              const settings = await AsyncStorage.getItem('settings');
              return JSON.parse(settings)[key];
          } catch (e) {
              console.warn(e);
              return null;
          }
      } else {
          return Settings.get(key);
      };
  };

  async setData(data) {
      if (Platform.OS == 'android') {
          await AsyncStorage.mergeItem('settings',JSON.stringify(data));
      } else {
          Settings.set(data);
      };
  };

  async componentDidMount() {
    warnings = await this.getData('sendWarnings');
    if (warnings == null) {
        this.navigation.replace('Welcome');
        return () => { this.setData({'sendWarnings': false}); };
    };

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.MEDIUM_ACCURACY,
      stationaryRadius: 10,
      distanceFilter: 10,
      notificationTitle: 'What the mask houdt een oogje in het zeil',
      notificationText: 'ingeschakeld',
      debug: false,
      startOnBoot: true,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: 'http://192.168.81.15:3000/location',
      httpHeaders: {
          'pragma': 'no-cache',
          'cache-control': 'no-cache'
      },
    });

    BackgroundGeolocation.on('location', (location) => this.onLocation(location) );
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      // BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        // BackgroundGeolocation.endTask(taskKey);
      // });
    // });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();

    // Some code to prevent caching of the geojson file
    var myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

    var myInit = {
      method: 'GET',
      headers: myHeaders,
    };

    let response = await fetch(
      'https://bat.ipieter.be/bat/policy/zones.geojson',
      myInit,
    );

    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      this.setState({geojson: json});
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  componentWillUnmount() {
    // unregister all event listeners
    BackgroundGeolocation.removeAllListeners();
  }

  onLocation(location) {
    console.log('[location] -', location);
    const myPosition = {
      latitude: location.latitude,
      longitude: location.longitude
    };
    this.setState({myPosition});
    if (this.state.followLocation) {
      let region = {
        latitude: myPosition.latitude,
        longitude: myPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      this.setState({region});
    }

    let currentState = false;
    let time = (new Date()).getHours();

    if (this.state.geojson != null) {
      for (let feature of this.state.geojson.features) {
        let startHour = feature.properties.start || 0;
        let endHour = feature.properties.end || 23;
        if (startHour <= time
            && endHour > time
            && this.inside(myPosition, feature.geometry.coordinates[0])) {
              currentState = true;
            }
      }

      if (currentState !== this.state.lastState) {
          //show notifications
          if (currentState)
          this.showEnteringZoneNotification();
          else this.showLeavingZoneNotification();
        }

        //and log events on remote server for debugging/statistics
        this.logEvent(
          location,
          currentState ? 'entering_zone' : 'leaving_zone',
        );


      this.setState({lastState: currentState});
    }
  }

  async logEvent(location, event) {
    location.event = event;
    location.deviceId = this.state.deviceId;
    const i = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(location),
    };

    let response = await fetch('https://bat.ipieter.be/bat/events/trigger', i);
    console.log(response.ok);
  }

  showEnteringZoneNotification(activity = 'walking') {
    console.log('Inside polygon, sending notification.');
    let localNotification = Notifications.postLocalNotification({
      body: 'Je bent nu in een mondmaskerzone voor voetgangers.',
      title: 'Draag je mondmasker.',
      sound: 'chime.aiff',
      silent: false,
      category: 'SOME_CATEGORY',
      userInfo: {},
    });
  }

  showLeavingZoneNotification(activity = 'walking') {
    console.log('Outside polygon, sending notification.');
    let localNotification = Notifications.postLocalNotification({
      body: 'Je verlaat een mondmaskerzone voor voetgangers.',
      title: 'Geen mondmaskerplicht.',
      sound: 'chime.aiff',
      silent: false,
      category: 'SOME_CATEGORY',
      userInfo: {},
    });
  }

  onError(error) {
    console.warn('[location] ERROR -', error);
  }
  // onActivityChange(event) {
  //   console.log('[activitychange] -', event); // eg: 'on_foot', 'still', 'in_vehicle'
  // }
  onProviderChange(provider) {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  // onMotionChange(event) {
  //   console.log('[motionchange] -', event.isMoving, event.location);
  // }

  inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point.longitude,
      y = point.latitude;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0],
        yi = vs[i][1];
      var xj = vs[j][0],
        yj = vs[j][1];

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <MapView
          compassOffset={{x: -370, y: 0}}
          style={styles.map}
          region={this.state.region}
          onPanDrag={(event) => this.setState({followLocation: false})}>
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
          {this.state.geojson != null ? (
            <Geojson
              geojson={this.state.geojson}
              strokeColor="#3498db"
              fillColor="#3498db44"
              strokeWidth={2}
            />
          ) : (
            <View />
          )}
        </MapView>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              this.setState({followLocation: true});
              let _this = this;
              let region = {
                latitude: _this.state.myPosition.latitude,
                longitude: _this.state.myPosition.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              };
              this.setState({region});
            }}>
            <Icon
              raised
              name="location-arrow"
              type="font-awesome"
              size={20}
              color={this.state.followLocation ? 'rgb(48,127,250)' : 'grey'}
            />
          </Pressable>
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
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
