import * as React from 'react';
import {View, Text, StyleSheet, Button, LogoTitle} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapView from 'react-native-maps';
import HomeView from './src/components/HomeView';

const Stack = createStackNavigator();

function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Settings... again"
        onPress={() => navigation.push('Settings')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={({navigation, route}) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Settings')}
                title="Settings"
              />
            ),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
