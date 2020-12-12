import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import MapView from 'react-native-maps';

function HomeView() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.05,
          longitude: 3.71667,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default HomeView;
