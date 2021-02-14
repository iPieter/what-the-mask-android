import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import SegmentedControl from '@react-native-community/segmented-control';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const icon = require('../../res/welcome_screen_illustration_a.png');

export default class WelcomeViewA extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welkom bij 'What the Mask'!</Text>

        <Image style={styles.icon} source={icon} />
        <Text style={styles.text}>
          Waar moet je een mondmasker dragen en waar niet? Welke regels gelden
          waar? 'What the mask' geeft een handig overzicht voor de huidige
          regels in Vlaanderen. Kom je in een mondmaskerzone, dan krijg je een
          melding van de app. Be safe, wear your mask!
        </Text>
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.navigation.navigate('Location')}>
            <Text style={styles.buttonText}> Begin nu </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#426CF4',
    height: 40,
    borderRadius: 7,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    height: '100%',
    margin: 10,
    fontSize: 17,
    fontWeight: '500',
  },
  icon: {
    justifyContent: 'center',
    resizeMode: 'contain',
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
  bottomArea: {
    width: '100%',
    bottom: 0,
    margin: '10%',
    position: 'absolute',
  },
  item: {
    marginHorizontal: 20,
  },
  'item:last-child': {
    backgroundColor: '#444',
  },
  header: {
    marginTop: '5%',
    color: '#2c3e50',
    fontSize: 25,
    fontWeight: '700',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  text: {
    marginTop: 5,
    marginBottom: 7,
    marginHorizontal: 22,
    color: '#7f8c8d',
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
