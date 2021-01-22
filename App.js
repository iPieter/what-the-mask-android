import * as React from 'react';
import {View, Text, StyleSheet, Button, LogoTitle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapView from 'react-native-maps';
import HomeView from './src/components/HomeView';
import SettingsView from './src/components/SettingsView';
import LegalNoticeView from './src/components/LegalNoticeView';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={({navigation, route}) => ({
            headerRight: () => (
              <Icon
                onPress={() => navigation.navigate('Settings')}
                name="cog"
                type="font-awesome"
                size={25}
                style={{ marginRight: 10 }}
              />
            ),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsView} options={{ title: 'Instellingen' }}/>
        <Stack.Screen name="LegalNotice" component={LegalNoticeView} options={{ title: 'Servicevoorwaarden' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
