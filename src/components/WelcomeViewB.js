import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import SegmentedControl from '@react-native-community/segmented-control';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const icon = require('../../res/welcome_screen_illustration_b.png');

const requestLocation = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'What the Mask heeft toegang tot je locatie nodig' +
          'om je geinformeerd te houden.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permissions granted');
      return true;
    } else {
      console.log('Location permissions denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default class WelcomeViewB extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Locatiegegevens</Text>

        <Image style={styles.icon} source={icon} />
        <Text style={styles.text}>
          Op de kaart tonen we je locatie en waar je een mondmasker moet dragen.
          'What the mask' kan echter alleen maar je huidige locatie tonen als je
          daar expliciet toestemming voor geeft. Als je dat niet wilt, is de app
          nog perfect bruikbaar, alleen zie je jouw huidige locatie niet.
        </Text>
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={[styles.refuse, styles.button]}
            onPress={() => {
              this.navigation.navigate('Background');
            }}>
            <Text style={styles.buttonText}>Nee bedankt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.accept, styles.button]}
            onPress={() => {
              requestLocation();
              this.navigation.navigate('Background');
            }}>
            <Text style={styles.buttonText}>Inschakelen</Text>
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
    width: '70%',
    height: undefined,
    aspectRatio: 1,
  },
  bottomArea: {
    width: '100%',
    bottom: 0,
    margin: '10%',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  refuse: {
    width: '45%',
    backgroundColor: '#ff6347',
  },
  accept: {
    width: '45%',
    backgroundColor: '#04B404',
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
    marginBottom: '5%',
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
