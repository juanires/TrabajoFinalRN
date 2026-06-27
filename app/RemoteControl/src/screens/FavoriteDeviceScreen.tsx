import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Device,} from "../utils/common";
import { View , Text, FlatList} from "react-native";
import SingleDeviceListView from "../components/SingleDeviceListView";
import { getAllDevices, updateDevice } from "../database/local_storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { common_styles, main_styles } from "../styles/mainScreensStyles";

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
                  }
                }
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
