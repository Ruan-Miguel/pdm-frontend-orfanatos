import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import mapMarker from "../images/map-marker.png";

const Orphanagesmap = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.chart}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -6.5205485,
          longitude: -38.4155765,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -6.5205485,
            longitude: -38.4155765,
          }}
        ></Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default Orphanagesmap;
