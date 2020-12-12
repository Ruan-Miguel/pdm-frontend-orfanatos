import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import api from "../services/api";

import mapMarker from "../images/map-marker.png";
import { AppLoading } from 'expo';

interface ParamsId {
  id: number;
}

interface ImageUrl {
  id: number;
  url: string;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  openingHours: string;
  openOnWeekends: boolean;
  images: ImageUrl[];
}

const OrphanageDetails = () => {
  const route = useRoute();
  const paramsId = route.params as ParamsId;

  const [orphanage, setOrphanage] = useState<Orphanage>();

  const goToGoogleMapsRoute = () => {
    Linking.openURL(`https://google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`);
  }

  useEffect(() => {
    api.get(`/orphanage/${paramsId.id}`).then((res) => {
      setOrphanage(res.data);
      console.log(res.data)
    })
  }, [paramsId.id])

  if (!orphanage) {
    return <AppLoading />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map((image) => (
            <Image
              key={image.id}
              source={{ uri: image.url }}
              style={styles.image}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.detailOrphanageContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
          >
            <Marker
              icon={mapMarker}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            ></Marker>
          </MapView>

          <TouchableOpacity onPress={goToGoogleMapsRoute} style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no goole maps</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.separator} />

      <Text style={styles.title}>Instruções para visitar</Text>
      <Text style={styles.description}>{orphanage.instructions}</Text>

      <View style={styles.scheduleContainer}>
        <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
          <Feather name='clock' size={40} color='#2ab5d1' />
          <Text style={[styles.scheduleItemText, styles.scheduleItemTextBlue]}>Segunda à sexta {orphanage.openingHours}</Text>
        </View>
        {orphanage.openOnWeekends ?
        (
          <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
            <Feather name='clock' size={40} color='#2ab5d1' />
            <Text style={[styles.scheduleItemText, styles.scheduleItemTextGreen]}>Atendemos no final de semana</Text>
          </View>
        )
        : (
          <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
            <Feather name='clock' size={40} color='#ff669d' />
            <Text style={[styles.scheduleItemText, styles.scheduleItemTextRed]}>Atendemos no final de semana</Text>
          </View>
        )}
      </View>

      <RectButton style={styles.contactButton} onPress={() => {}}>
        <FontAwesome name='whatsapp' size={24} color='#fff' />
        <Text style={styles.contactButtonText}>Entrar em contanto</Text>
      </RectButton>
    </ScrollView>
  );
};

export default OrphanageDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  imagesContainer: {
    height: 240,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },
  detailOrphanageContainer: {
    padding: 24,
  },
  title: {
    color: '#4d6f80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },
  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },
  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#b3dae2',
    marginTop: 40,
    backgroundColor: '#e6f2fb'
  },
  mapStyle: {
    width: '100%',
    height: 150,
  },
  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b3dae2',
  },
  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
  },
  separator: {
    height: .8,
    width: '100%',
    backgroundColor: '#d3e2e6',
    marginVertical: 30,
  },
  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleItem: {
    width: '48%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  scheduleItemBlue: {
    backgroundColor: '#e6f7fb',
    borderColor: '#b3dae2',
  },
  scheduleItemGreen: {
    backgroundColor: '#edfff6',
    borderColor: '#a1e9c5',
  },
  scheduleItemRed: {
    backgroundColor: '#f3f6f9',
    borderColor: '#ffbcd4',
  },
  scheduleItemText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },
  scheduleItemTextBlue: {
    color: '#5c8599',
  },
  scheduleItemTextGreen: {
    color: '#37c77f',
  },
  scheduleItemTextRed: {
    color: '#ff669d',
  },
  contactButton: {
    backgroundColor: '#3cdc8c',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
    marginBottom: 40,
  },
  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
})