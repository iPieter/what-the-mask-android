import * as React from 'react';
import {View, Text, StyleSheet, Button, Settings} from 'react-native';

export default class HomeView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Settings Screen</Text>
        <Button
          title="Go to Settings... again"
          onPress={() => this.navigation.push('Settings')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.navigation.navigate('Home')}
        />
        <Button title="Go back" onPress={() => this.navigation.goBack()} />
      </View>
    );
  }
}
