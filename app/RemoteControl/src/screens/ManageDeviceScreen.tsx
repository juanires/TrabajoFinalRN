import React, { useCallback, useState } from 'react';
import {View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Device, DeviceType } from '@/src/utils/common';
import { deleteDevice, getDeviceById, updateDevice } from '../database/local_storage';
import { useFocusEffect } from '@react-navigation/native';
import { common_styles } from '../styles/mainScreensStyles';

type Props = {
  navigation: any;
  route: any;
};

export default function ManageDeviceScreen({navigation, route}: Props) {

  const [device, setDevice] = useState<Device>();
  const [isOn, setIsOn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [name, setName] = useState('');

  const fetchDevice = async () => {
    const new_device = await getDeviceById(route.params.deviceId);
    if (new_device) {
      console.log('Hay dispositivo');
      setDevice(new_device);
      setIsOn(new_device.is_on);
      setIsFavorite(new_device.is_favorite);
      setName(new_device.name);
    }
  };

  useFocusEffect(
    useCallback(() => {    
      fetchDevice();
    }, [])
  );
 

  const handleToggleSwitch = async (value: boolean) => {
    if (!device) return;  // ← Guard clause: exit if device is undefined
    
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
    Alert.alert('Eliminar dispositivo', '¿Está seguro que desea eliminar este dispositivo?',
      [
        {// Primera opcion: Cancelar
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {}, // No hace nada
        },
        { //Segunda opcion: Ok . Se confirma la eliminacion del dispositivo
          text: 'OK',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteDevice(device.id);
            if (success) {
              navigation.popToTop();
              console.log('Eliminar dispositivo');
            } else {
              Alert.alert('Error eliminando el dispositivo');
              console.log('Error eliminando el dispositivo');
            }
          },
        },
      ],
    );
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
    <SafeAreaView style={common_styles.container}>
      
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