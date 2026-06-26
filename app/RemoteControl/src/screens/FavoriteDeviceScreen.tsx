import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Device, DeviceType } from "../utils/common";
import { View , Text, FlatList, StyleSheet} from "react-native";
import SingleDeviceListView from "../components/SingleDeviceListView";
import { getAllDevices, updateDevice } from "../database/local_storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type Props = {
  navigation: any;
  route: any;
};
export default function FavoriteDeviceScreen({ navigation}:Props) {
  
  const [devices, setDevices] = useState<Device[]>([])
    
  const loadInitialInfo = async () => {
  setDevices(await getAllDevices());
  console.log('Se carga valor inicial de devices:', JSON.stringify(devices));
};

useFocusEffect(
  useCallback(() => {
    loadInitialInfo();
  }, [])
);

  const favoriteDeviceList = devices.filter(device => device.is_favorite);
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
         
            data={favoriteDeviceList}
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
                }}

              />
            )}
          />

        )}

      </View>
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
