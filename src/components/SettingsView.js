import * as React from 'react';
import {View, Text, StyleSheet, Switch, Settings} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';

export default class SettingsView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      selectedIndex: 0,
      automaticDetection: true,
      sendWarnings: false,
      shareData: false,
    };
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
        <Text style>:oui:</Text>
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
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex,
            });
          }}
        />
        <Text style={styles.header}>Premium</Text>
        {this.buildTogableItem('Detecteer activiteiten automatisch', () => {
          return (
            <Switch
              style={styles.boxToggle}
              ios_backgroundColor={
                this.state.automaticDetection ? 'green' : 'grey'
              }
              onValueChange={() =>
                this.setState({
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
              ios_backgroundColor={this.state.sendWarnings ? 'green' : 'grey'}
              onValueChange={() =>
                this.setState({
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
              ios_backgroundColor={this.state.shareData ? 'green' : 'grey'}
              onValueChange={() =>
                this.setState({
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
