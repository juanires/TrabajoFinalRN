// import { Device } from "@/src/utils/common";

// type single_device_view_Prop = {
//   device: Device;
//   onDelete: () => void;
// };

import React, { useState, useEffect } from 'react';
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
  const [isOn, setIsOn] = useState(device.is_on);

  useEffect(() => {
    setIsOn(device.is_on);
  }, [device.is_on]);

  const handleToggle = (value: boolean) => {
    setIsOn(value);
    onToggle(value);
  };

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
          {device.device_type}
        </Text>
      </View>

      <Switch
        value={isOn}
        onValueChange={handleToggle}
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