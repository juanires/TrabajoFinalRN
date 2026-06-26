import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SingleDeviceListView from '@/src/components/SingleDeviceListView';
import { Device, DeviceType } from '@/src/utils/common';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAllDevices, updateDevice } from '../database/local_storage';

type Props = {
  navigation: any;
  route: any;
};
export default function HomeScreen({ navigation}:Props) {
  // const navigation = useNavigation<any>();
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
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Device Handler App
        </Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>

        {devices.length === 0 ? (

          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay dispositivos
            </Text>
          </View>

        ) : (

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
                
                onPress={() => {console.log(`Navegando con id de dispositivo ${item.id}`); navigation.navigate('ManageDevice', {deviceId: item.id});}}
              />
            )}
          />

        )}

      </View>

      {/* Botón Agregar */}
      <TouchableOpacity
        style={styles.fab}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 32,
    color: '#666',
    textAlign: 'center',
  },

  fab: {
    position: 'absolute',

    right: 20,
    bottom: 20,

    width: 60,
    height: 60,

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#007AFF',
  },
});