import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {View, Text, StyleSheet} from 'react-native';
import DeviceTypeCard from '@/src/components/DeviceTypeCard';
import { DeviceType } from '../utils/common';

type Props = {
  navigation: any;
  route: any;
};

export default function AddDeviceScreen({navigation}: Props) {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Agregar dispositivo
        </Text>
      </View>

      <View style={styles.content}>
        <DeviceTypeCard
            title= {DeviceType.LIGHT}
            iconName="bulb-outline"
            onPress={() => { 
                navigation.navigate('AddSpecificDevice', {device_type: DeviceType.LIGHT} ); 
                }
            }
        />

        <DeviceTypeCard
            title={DeviceType.SWITCH}
            iconName="toggle-outline"
            onPress={() => {
                navigation.navigate('AddSpecificDevice', {device_type: DeviceType.SWITCH});
                }
            }
        />

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
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});