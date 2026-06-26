import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Device, DeviceType } from '@/src/utils/common';
import { deleteDevice, getDeviceById, updateDevice } from '../database/local_storage';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  navigation: any;
  route: any;
};

export default function ManageDeviceScreen({
  navigation,
  route,
}: Props) {
  const [device, setDevice] = useState<Device>();
  // const { device }: { device: Device } = route.params;
  const [isOn, setIsOn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [name, setName] = useState('');
  // const [icon, setIcon] = useState('');

 const fetchDevice = async () => {
    const new_device = await getDeviceById(route.params.deviceId);
    if (new_device) {
      console.log('Hay dispositivo');
      setDevice(new_device);
      setIsOn(new_device.is_on);
      setIsFavorite(new_device.is_favorite);
      setName(new_device.name);
      // setIcon(getDeviceIcon());
    }
    // console.log('No Hay dispositivo');
};

useFocusEffect(
  useCallback(() => {    
    fetchDevice();
  }, [])
);
 

 const handleToggleSwitch = async (value: boolean) => {
  if (!device) return;  // ← Guard clause: exit if device is undefined
  // setIsOn(value);
  const updatedDevice = { ...device, is_on: value};
  const success = await updateDevice(updatedDevice);
    if (success) {
      fetchDevice();  // Refresh the device state after updating
    } else {
      console.log('Error actualizando el estado de favorito');
    }
};

  const handleToggleFavorite = async () => {
    if (!device) return;
    const newFavorite = !device.is_favorite;
    const updatedDevice = { ...device, is_favorite: newFavorite };
    const success = await updateDevice(updatedDevice);
    if (success) {
      fetchDevice();  // Refresh the device state after updating
    } else {
      console.log('Error actualizando el estado de favorito');
    }
    
  };

  const handleDelete = async () => {
  if (!device) return;
  const success = await deleteDevice(device.id);
  if (success) {
      fetchDevice();  // Refresh the device state after updating
      navigation.popToTop();
      Alert.alert("Dispositivo eliminado");
      console.log('Eliminar dispositivo');
  } 
  else {
      console.log('Error eliminando el dispositivo');
  }    
  };

  const getDeviceIcon = ()=> {
     if (!device) return 'help';
    return device.device_type === DeviceType.LIGHT
      ? 'lightbulb-outline'
      : 'power-plug-outline';
  };

  const update_Device = (device : Device, isOn: boolean, isFavorite: boolean) => {
    const updatedDevice = {
        ...device,
        is_on: isOn,
        is_favorite: isFavorite
    };
    updateDevice(updatedDevice);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.deviceName}>
          {name}
        </Text>
        <MaterialCommunityIcons
          name={getDeviceIcon()}
          size={28}
          color="#007AFF"
        />
      </View>
      
      {/* Switch principal */}
      <View style={styles.deviceControlContainer}>
        <View style={styles.switchContainer}>
          <Switch
            value={isOn}
            onValueChange={(value) => {

              // TODO:
              // Actualizar AsyncStorage

              handleToggleSwitch(value);

            }}
            trackColor={{
              false: '#D1D1D6',
              true: '#007AFF',
            }}
          />
        </View>

        <Text style={styles.statusText}>
          {isOn ? 'ON' : 'OFF'}
        </Text>

      </View>

      {/* Acciones */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={42}
            color="#007AFF"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggleFavorite}>
          <MaterialCommunityIcons
            name={ isFavorite ? 'star' : 'star-outline'}
            size={42}
            color="#007AFF"
          />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 20,
    paddingVertical: 15,

    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },

  deviceName: {
    fontSize: 22,
    fontWeight: '600',
  },

  deviceControlContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  switchContainer: {
    transform: [
      { scaleX: 2 },
      { scaleY: 2 },
    ],
  },

  statusText: {
    marginTop: 35,

    fontSize: 20,
    fontWeight: '600',

    color: '#007AFF',
  },

  actionsContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    paddingHorizontal: 40,
    paddingBottom: 40,
  },

});