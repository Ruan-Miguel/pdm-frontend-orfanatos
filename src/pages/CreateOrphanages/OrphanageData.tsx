import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Switch, StyleSheet } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { RectButton } from 'react-native-gesture-handler';

const OrphanageData = () => {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Sobre</Text>
      <TextInput multiline style={[styles.input, { height: 110 }]} />

      <Text style={styles.label}>WhatsApp</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Fotos</Text>
      <TouchableOpacity style={styles.imagesInput} onPress={() => {}} >
        <Feather name='plus' size={24} color='#15b6d6' />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput multiline style={[styles.input, { height: 110 }]} />

      <Text style={styles.label}>Horário de visitas</Text>
      <TextInput style={styles.input} />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende aos finais de semana?</Text>
        <Switch
          thumbColor='#fff'
          trackColor={{ false: '#ccc', true: '#39cc83' }}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={() => {}}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#fff',
  }
})

export default OrphanageData;
