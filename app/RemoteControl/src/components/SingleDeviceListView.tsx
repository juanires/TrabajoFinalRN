// import { Device } from "@/src/utils/common";

// type single_device_view_Prop = {
//   device: Device;
//   onDelete: () => void;
// };

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';

import { Device } from '@/src/utils/common';

type Props = {
  device: Device;
  onToggle: (value: boolean) => void;
  onPress?: () => void;
};

export default function SingleDeviceListView({device, onToggle, onPress,}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.deviceName}>
          {device.name}
        </Text>

        <Text style={styles.deviceDescription}>
          {device.description}
        </Text>

        <Text style={styles.deviceType}>
          {device.type}
        </Text>
      </View>

      <Switch
        value={device.is_on}
        onValueChange={onToggle}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 16,
    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  infoContainer: {
    flex: 1,
    marginRight: 16,
  },

  deviceName: {
    fontSize: 18,
    fontWeight: '600',
  },

  deviceDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },

  deviceType: {
    marginTop: 2,
    fontSize: 12,
    color: '#999',
  },
});