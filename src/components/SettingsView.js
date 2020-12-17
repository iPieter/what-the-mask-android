import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Settings,
  SafeAreaView,
  SectionList,
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';

export default class HomeView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      selectedIndex: 0,
    };
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
          values={['Wandelen', 'Sporten', 'Fietsen', 'AI (premium)']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex,
            });
          }}
        />
        <Text style={styles.header}>Notificaties</Text>
        <SegmentedControl
          values={['Aan', 'Uit']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex,
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  item: {
    marginHorizontal: 15,
    backgroundColor: '#f9c2ff',
    padding: 0,
    marginVertical: 0,
  },
  'item:last-child': {
    backgroundColor: '#444',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,

    marginHorizontal: 2,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  text: {
    marginBottom: 7,
    marginHorizontal: 2,
  },
});
