import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import MapView, { MapEvent, Marker } from "react-native-maps";

import mapMarker from "../../images/map-marker.png";

const SelectMapPosition = () => {
  const navigation = useNavigation();

  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleSelectMapPosition = (event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }

  const goToOrphanageData = () => {
    navigation.navigate('OrphanageData', { position });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: -6.5205485,
          longitude: -38.4155765,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarker}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            calloutAnchor={{ x: 2.7, y: .8 }}
          />
        )}
      </MapView>
      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={goToOrphanageData}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },
  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#fff',
  },
})

export default SelectMapPosition;
