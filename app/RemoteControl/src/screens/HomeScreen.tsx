import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SingleDeviceListView from '@/src/components/SingleDeviceListView';
import { Device } from '@/src/utils/common';
import { useFocusEffect, } from '@react-navigation/native';
import { getAllDevices, updateDevice } from '../database/local_storage';
import { common_styles, main_styles } from '../styles/mainScreensStyles';

type Props = {
  navigation: any;
  route: any;
};
export default function HomeScreen({ navigation}:Props) {
  const [devices, setDevices] = useState<Device[]>([])
     
  const loadInitialInfo = async () =>{
    setDevices(await getAllDevices());
    console.log('Se carga valor inicial de devices HOME:', JSON.stringify(devices));
  }

  useFocusEffect(
    useCallback(() => {
      loadInitialInfo();
    }, [])
  );

  return (
    <SafeAreaView style={common_styles.container}>
      
      {/* Titulo */}
      <View style={main_styles.header}>
        <Text style={main_styles.headerTitle}>
          Device Handler App
        </Text>
      </View>

      {/* Contenido */}
      <View style={main_styles.content}>
        {devices.length === 0 ? ( //Si NO hay dispositivos en la base de datos
          <View style={main_styles.emptyContainer}>
            <Text style={main_styles.emptyText}>
              No hay dispositivos
            </Text>
          </View>
        ) : 
        (//Si HAY dispositivos en la base de datos
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SingleDeviceListView
                device={item}
                onToggle={async (value: boolean) => {
                  console.log(`Este es el valor ${value}`)
                  await updateDevice({...item, is_on: value});
                  await loadInitialInfo();  
                  }
                }
                
                onPress={() => {
                  console.log(`Navegando con id de dispositivo ${item.id}`); 
                  navigation.navigate('ManageDevice', {deviceId: item.id});
                  }
                }
              />
            )}
          />
        )}
      </View>

      {/* Botón Agregar */}
      <TouchableOpacity
        style={main_styles.fab}
        onPress={() => {navigation.navigate('AddDevice');}}
      >
        <Ionicons
          name="add"
          size={32}
          color="white"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
