import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SingleDeviceListView from '@/src/components/SingleDeviceListView';
import { Device } from '@/src/utils/common';
import { useNavigation } from '@react-navigation/native';

type Props = {
  navigation: any;
  route: any;
};
export default function HomeScreen({ navigation}:Props) {
    // const navigation = useNavigation<any>();
    // const devices: Device[] = [];
  // TODO:
  // Reemplazar por los dispositivos obtenidos desde Firebase
  const devices: Device[] = [
    {
      id  : '1',
      type: 'TV',
      name: 'Smart TV',
      description: 'Living',
      is_on: true,
      is_favorite: false,
    },
    {
      id  : '2',
      type: 'Light',
      name: 'Lámpara',
      description: 'Dormitorio',
      is_on: false,
      is_favorite: true,
    },
  ];

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

                onToggle={(value: boolean) => {
                console.log(`Este es el valor ${value}`)
                  // TODO:
                  // Cambiar estado del dispositivo
                  // Actualizar Firebase o asyncStorage

                }}

                onPress={() => {
                   navigation.navigate('ManageDevice');
                  // TODO:
                  // Navegar a ManageDeviceScreen

                }}

              />
            )}
          />

        )}

      </View>

      {/* Botón Agregar */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {

          // TODO:
          // Navegar a AddDeviceScreen

        }}
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