import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Switch, Image, StyleSheet } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

import api from "../../services/api";

interface ParamsPosition {
  position: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageData = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const paramsPosition = route.params as ParamsPosition;

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [imagesUri, setImagesUri] = useState<string[]>([]);

  const selectImages = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('precisamos de acesso a suas fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;

    setImagesUri([...imagesUri, uri]);
  }

  const createOrphanage = async () => {
    const { latitude, longitude } = paramsPosition.position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('openingHours', openingHours);
    data.append('openingHours', openingHours);
    data.append('openOnWeekends', String(openOnWeekends));

    imagesUri.forEach((imageUri, index) => {
      data.append('image', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: imageUri,
      } as any)
    })

    await api.post('/orphanage', data);

    navigation.navigate('OrphanagesMap')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        multiline
        style={[styles.input, { height: 110 }]}
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>WhatsApp</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImageContainer}>
        {imagesUri.map((imageUri) => (
          <Image
            key={imageUri}
            source={{ uri: imageUri }}
            style={styles.uploadedImage}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={selectImages}>
        <Feather name='plus' size={24} color='#15b6d6' />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        multiline
        style={[styles.input, { height: 110 }]}
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horário de visitas</Text>
      <TextInput
        style={styles.input}
        value={openingHours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende aos finais de semana?</Text>
        <Switch
          thumbColor='#fff'
          trackColor={{ false: '#ccc', true: '#39cc83' }}
          value={openOnWeekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={createOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: .8,
    borderBottomColor: '#d3e2e6',
  },
  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, .5)',
    borderStyle: 'dashed',
    borderColor: '#96d2f0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  uploadedImageContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 32,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
    marginBottom: 12,
  },
  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#fff',
  }
})

export default OrphanageData;
