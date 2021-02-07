import * as React from 'react';
import {View, Text, StyleSheet, Button, Switch, Settings} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

Icon.loadFont();
export default class WelcomeView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;

    // Check whether the app has already had settings set
    if (Settings.get('sendWarnings') == null) {
        Settings.set({sendWarnings: false});
        this.state = {
            firstTime: true,
            sendWarnings: false,
        };
    } else {
        this.state = {
            firstTime: false,
            sendWarnings: Settings.get('sendWarnings'),
        };
    };
  }

  onPressLocation() {

  }

  onPressNotification(enable) {
      Settings.set({sendWarnings: enable});
      this.navigation.navigate('Home');
  }

  render() {
      return (
              <Swiper style={styles.wrapper} showsButtons={false}>
              <View style={styles.welcome}>
              <Text style={styles.header}>Welkom bij What the Mask!</Text>
              </View>

              <View style={styles.location}>
              <Text style={styles.text}>
              Om de mondmaskerplicht kaart te bekijken, dien je toegang tot je huidige locatie te verschaffen.
              </Text>
              <Text style={styles.text}>
              Je locatie wordt op geen enkel moment opgeslagen, doorverkocht, of gebruikt voor advertentie doeleinden.
              </Text>
              <Button
          onPress={this.onPressLocation()}
          title="Inschakelen"
              />
              </View>

              <View style={styles.notifications}>
              <Text style={styles.text}>
              Indien je ervoor kiest om notificaties te ontvangen wanneer je een mondmasker zone betreedt, dien je toegang tot je locatie te verschaffen, ook wanneer de app niet geopend is.
              </Text>
              <Button
          onPress={this.onPressNotification(true)}
          title="Inschakelen"
              />
              <Button
          onPress={this.onPressNotification(false)}
          title="Nee bedankt"
              />
              </View>
              </Swiper>
      );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  welcome: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
  },
  location: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
  },
  notifications: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
  },
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
