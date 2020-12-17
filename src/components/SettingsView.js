import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';

export default class HomeView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      selectedIndex: 0,
    };
  }

  buildItem(title) {
    return (
      <View style={styles.box}>
        <Text>{title}</Text>
        <Text style>:oui:</Text>
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
        {this.buildItem('Detecteer activiteiten')}
        {this.buildItem('Statistieken')}
        <View style={styles.emptyBox} />

        <Text style={styles.header}>Algemene instellingen</Text>
        {this.buildItem('Stuur waarschuwingen in de achtergrond')}
        {this.buildItem('Ververs regelgevingsbestanden')}
        {this.buildItem('Juridische kennisgeving')}
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
    paddingVertical: 13,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderTopWidth: 0.5,
  },
  emptyBox: {
    borderColor: 'grey',
    borderTopWidth: 0.5,
  },
});
