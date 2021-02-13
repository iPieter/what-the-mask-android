import * as React from 'react';
import {View, Text, StyleSheet, Button, Switch, Settings} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

Icon.loadFont();
export default class WelcomeViewC extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  async setData(data) {
      if (Platform.OS == 'android') {
          await AsyncStorage.mergeItem('settings',JSON.stringify(data));
      } else {
          Settings.set(data);
      };
  };

  // For some reason, extracting this onPress function causes it to activate on page load.
  render() {
      return (
              <View style={styles.container}>
              <Text style={styles.header}>Achtergrond locatie</Text>
              <Text style={styles.text}>
              Indien je ervoor kiest om notificaties te ontvangen wanneer je een mondmasker zone betreedt, dien je toegang tot je locatie te verschaffen, ook wanneer de app niet geopend is.
              </Text>
              <Button
          onPress={() => {
              this.setData({'sendWarnings': true});
              this.navigation.navigate('Home');
          }}
          title="Inschakelen"
              />
              <Button
          onPress={() => {
              this.setData({'sendWarnings': false});
              this.navigation.navigate('Home');
          }}
          title="Nee bedankt"
              />
              </View>
      );
  }
}

const styles = StyleSheet.create({
  text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
  },
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
