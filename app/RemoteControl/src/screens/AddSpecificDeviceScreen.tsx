import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DeviceType } from '../utils/common';
import { addDevice } from '../database/local_storage';

type Props = {
  navigation: any;
  route: any;
};
export default function AddSpecificDeviceScreen({navigation, route}: Props) {

  const { device_type } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleDone = async () => {
    const newDevice = {
      id: Date.now().toString(),
      device_type: device_type,
      name,
      description,
      is_on: false,
      is_favorite: false,
    };
    
    console.log(newDevice);
    const success = await addDevice(newDevice);
    success? Alert.alert('Hecho!', 'Dispositivo creado con exito') : Alert.alert('Error!', 'No se pudo crear el dispositivo');
    
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons
                name="arrow-back"
                size={24}
            />
        </TouchableOpacity> */}

        <Text style={styles.headerTitle}>
          Agregar {device_type}
        </Text>

        <Ionicons
          name={
            device_type === DeviceType.LIGHT
              ? 'bulb-outline'
              : 'toggle-outline'
          }
          size={26}
        />

      </View>

      <View style={styles.content}>

        <Text style={styles.label}>
          Nombre
        </Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ingrese un nombre"
        />

        <Text style={styles.label}>
          Descripción
        </Text>

        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Ingrese una descripción"
        />

        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
        >
          <Text style={styles.doneButtonText}>
            DONE
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },

  content: {
    flex: 1,
    padding: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 20,
  },

  input: {
    height: 52,

    backgroundColor: '#F5F5F5',

    borderRadius: 12,

    paddingHorizontal: 16,

    fontSize: 16,
  },

  doneButton: {
    marginTop: 50,

    height: 55,

    borderRadius: 14,

    backgroundColor: '#007AFF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  doneButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});