import * as React from 'react';
import {View, Text, StyleSheet, Switch, Settings} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

Icon.loadFont();
export default class SettingsView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;

    this.state = {};
  }

  async componentDidMount() {
      const initSelectedIndex = await this.getData('selectedIndex');
      if (initSelectedIndex == null || initSelectedIndex == undefined) {
        await this.setData({selectedIndex: 0});
        await this.setData({automaticDetection: false});
      }

      // LOAD STATE
      this.state = await this.getStorageState();
      await this.setState(this.state);
      // const selectedIndex = await this.getData('selectedIndex');
      // const automaticDetection = await this.getData('automaticDetection');
      // const sendWarnings = await this.getData('sendWarnings');
      // const shareData = await this.getData('shareData');
      // const deviceId = await this.getData('deviceId');
      // this.state = {
      //   latestUpdate: null,
      //   selectedIndex: selectedIndex,
      //   automaticDetection: automaticDetection,
      //   sendWarnings: sendWarnings,
      //   shareData: shareData,
      //   deviceId: deviceId,
      // };
  }

  async getStorageState() {
      if (Platform.OS == 'android') {
          try {
              const settings = await AsyncStorage.getItem('settings');
              if (settings == null || settings == undefined) {
                  AsyncStorage.setItem('settings', JSON.stringify({}));
                  return {};
              } else {
                  return JSON.parse(settings);
              }
          } catch (e) {
              console.warn(e);
              return {};
          }
      } else {
          return {};
      }
  }

  async getData(key) {
    if (Platform.OS == 'android') {
        const settings = await this.getStorageState();
        const value = settings[key];
        if (value == undefined) {
            return null;
        } else {
            return value;
        }
    } else {
      return Settings.get(key);
    }
  }

  async setData(data) {
    if (Platform.OS == 'android') {
      await AsyncStorage.mergeItem('settings', JSON.stringify(data));
    } else {
      Settings.set(data);
    }
  }

  async storeData(data) {
    var newState = Object.assign(this.state, data);
    console.warn(newState);
    this.setState(newState);
    this.setData(data);
    console.log(data);
  }

  handleWarningsSwitch = value => {
      if (value == true || value == false) {
        this.setState({sendWarnings: value});
        this.setData({sendWarnings: value});
        console.warn(this.state);
      }
  }
  handleShareSwitch = value => {
      if (value == true || value == false) {
        this.setState({shareData: value});
        this.setData({shareData: value});
        console.warn(this.state);
      }
  }

  buildRoutableItem(title, route) {
    return (
      <View
        style={styles.box}
        onStartShouldSetResponder={() => {
          if (route != null) {
            this.navigation.push(route);
          }
        }}>
        <Text style={styles.boxText}>{title}</Text>
        <Icon
          style={styles.boxToggle}
          name="angle-right"
          type="font-awesome"
          color="#998"
          size={28}
        />
      </View>
    );
  }

  buildButtonItem(title) {
    const fetch = () => {
      this.fetchGeojson();
    };
    return (
      <View style={styles.box}>
        <Text style={styles.boxText}>{title}</Text>
        <Text style={styles.boxTextLight}>{this.state.latestUpdate}</Text>
        <Text style={styles.boxTextClickable} onPress={fetch}>
          Update
        </Text>
      </View>
    );
  }

  currentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year; //format: dd-mm-yyyy;
  }

  async fetchGeojson() {
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

      // Set the latest update to the current date
      var date = this.currentDate();
      this.setState(date);
    } else {
      alert('HTTP-Error: ' + response.status);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Algemene instellingen</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>{'Stuur waarschuwingen in de achtergrond'}</Text>
          <Switch
            value={this.state.sendWarnings}
            style={styles.boxToggle}
            onValueChange={this.handleWarningsSwitch}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>{'Deel anonieme gebruikersdata'}</Text>
          <Switch
            value={this.state.shareData}
            style={styles.boxToggle}
            onValueChange={this.handleShareSwitch}
          />
        </View>
        {this.buildButtonItem('Versie regelgevingsbestanden')}
        {this.buildRoutableItem(
          'Servicevoorwaarden & Juridische Informatie',
          'LegalNotice',
        )}
        <View style={styles.emptyBox} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginHorizontal: 20,
  },
  'item:last-child': {
    backgroundColor: '#444',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,
    marginHorizontal: 22,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  text: {
    marginTop: 5,
    marginBottom: 7,
    marginHorizontal: 22,
    color: 'grey',
  },
  box: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderTopWidth: 0.5,
  },
  emptyBox: {
    borderColor: '#ccc',
    borderTopWidth: 0.5,
  },
  boxText: {
    paddingVertical: 13,
  },
  boxTextLight: {
    paddingVertical: 13,
    color: 'grey',
  },
  boxTextClickable: {
    paddingVertical: 13,
    color: 'rgb(48,127,250)',
  },
  boxToggle: {
    marginVertical: 6,
  },
});
