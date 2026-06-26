import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function DeviceTypeCard({title, iconName, onPress}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Ionicons
          name={iconName}
          size={30}
        />

        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 100,

    borderWidth: 1,
    borderColor: '#DDD',

    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',

    marginVertical: 16,
  },

  content: {
    alignItems: 'center',
  },

  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
  },
});