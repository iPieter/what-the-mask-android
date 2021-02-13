import * as React from 'react';
import {View, Text, StyleSheet, Button, Switch} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
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
              <Button
          onPress={() => {
              this.navigation.navigate('Background');
          }}
          title="Inschakelen"
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
