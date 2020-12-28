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
      this.storeData({shareData: false});
    }

    // LOAD STATE
    this.state = {
      selectedIndex: Settings.get('selectedIndex'),
      automaticDetection: Settings.get('automaticDetection'),
      sendWarnings: Settings.get('sendWarnings'),
      shareData: Settings.get('shareData'),
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

  buildTogableItem(title, stateProperty) {
    return (
      <View style={styles.box}>
        <Text style={styles.boxText}>{title}</Text>
        {stateProperty()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Specifieke regelgeving</Text>
        <Text style={styles.text}>
          Sommige steden en gemeentes laten het toe om een mondmasker af te
          zetten tijdens het sporten of fietsen, andere niet. Je kunt dus
          instellen voor welke regelgeving je meldingen wilt krijgen.
        </Text>
        <SegmentedControl
          style={styles.item}
          values={['Wandelen', 'Sporten', 'Fietsen', 'AI (premium)']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            this.storeData({
              selectedIndex: event.nativeEvent.selectedSegmentIndex,
            });
          }}
        />
        <Text style={styles.header}>Premium</Text>
        {this.buildTogableItem('Detecteer activiteiten automatisch', () => {
          return (
            <Switch
              style={styles.boxToggle}
              onValueChange={() =>
                this.storeData({
                  automaticDetection: !this.state.automaticDetection,
                })
              }
              value={this.state.automaticDetection}
            />
          );
        })}
        {this.buildRoutableItem('Statistieken')}
        <View style={styles.emptyBox} />

        <Text style={styles.header}>Algemene instellingen</Text>
        {this.buildTogableItem('Stuur waarschuwingen in de achtergrond', () => {
          return (
            <Switch
              style={styles.boxToggle}
              onValueChange={() =>
                this.storeData({
                  sendWarnings: !this.state.sendWarnings,
                })
              }
              value={this.state.sendWarnings}
            />
          );
        })}
        {this.buildTogableItem('Deel anonieme gebruikersdata', () => {
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
        {this.buildRoutableItem('Versie regelgevingsbestanden')}
        {this.buildRoutableItem('Juridische kennisgeving', 'LegalNotice')}
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
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  text: {
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
  boxToggle: {
    marginVertical: 6,
  },
});
