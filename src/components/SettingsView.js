import * as React from 'react';
import {View, Text, StyleSheet, Switch, Settings} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
export default class SettingsView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;

    // DEFAULTS
    if (Settings.get('selectedIndex') == null) {
      this.storeData({selectedIndex: 0});
    }

    if (Settings.get('automaticDetection') == null) {
      this.storeData({automaticDetection: false});
    }

    if (Settings.get('sendWarnings') == null) {
      this.storeData({sendWarnings: true});
    }

    if (Settings.get('shareData') == null) {
      this.storeData({shareData: true});
    }

    // LOAD STATE
    this.state = {
      latestUpdate: null,
      selectedIndex: Settings.get('selectedIndex'),
      automaticDetection: Settings.get('automaticDetection'),
      sendWarnings: Settings.get('sendWarnings'),
      shareData: Settings.get('shareData'),
      deviceId: Settings.get('deviceId'),
    };
  }

  storeData(data) {
    Settings.set(data);
    this.setState(data);
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

  buildToggableItem(title, stateProperty) {
    return (
      <View style={styles.box}>
        <Text style={styles.boxText}>{title}</Text>
        {stateProperty()}
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
        {this.buildToggableItem(
          'Stuur waarschuwingen in de achtergrond',
          () => {
            return (
              <Switch
                style={styles.boxToggle}
                onValueChange={(switchValue) =>
                  this.storeData({
                    sendWarnings: {switchValue},
                  })
                }
                value={this.state.sendWarnings}
              />
            );
          },
        )}
        {this.buildToggableItem('Deel anonieme gebruikersdata', () => {
          return (
            <Switch
              style={styles.boxToggle}
              onValueChange={() =>
                this.storeData({
                  shareData: !this.state.shareData,
                })
              }
              value={this.state.shareData}
            />
          );
        })}
        {this.buildButtonItem('Versie regelgevingsbestanden')}
        {this.buildRoutableItem('Servicevoorwaarden & Juridische Informatie', 'LegalNotice')}
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
    marginBottom:15,
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
