import * as React from 'react';
import {View, Text, StyleSheet, PermissionsAndroid, Switch} from 'react-native';
import { Button } from 'react-native-elements';
import SegmentedControl from '@react-native-community/segmented-control';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const requestLocation = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message:
                "What the Mask heeft toegang tot je locatie nodig" +
                    "om je geinformeerd te houden.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location permissions granted");
            return true;
        } else {
            console.log("Location permissions denied");
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
              <Text style={styles.header}>Locatie gegevens</Text>
              <Text style={styles.text}>
              Om de mondmaskerplicht kaart te bekijken, dien je toegang tot je huidige locatie te verschaffen.
              </Text>
              <Text style={styles.text}>
              Je locatie wordt op geen enkel moment opgeslagen, doorverkocht, of gebruikt voor advertentie doeleinden.
              </Text>
              <View style={styles.bottomArea}>
              <Button
          buttonStyle={styles.refuse}
          onPress={() => {
              this.navigation.navigate('Background');
          }}
          title="Nee bedankt"
              />
              <Button
          buttonStyle={styles.accept}
          onPress={() => {
              requestLocation();
              this.navigation.navigate('Background');
          }}
          title="Inschakelen"
              />
              </View>
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
  bottomArea: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      bottom: 0,
      position: 'absolute',
  },
  refuse: {
      width: '80%',
      left: 0,
      backgroundColor: '#ff6347',
  },
  accept: {
      width: '80%',
      right: 0,
      backgroundColor: '#04B404',
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
