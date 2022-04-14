import { View, StyleSheet } from 'react-native';
import React from 'react';
import styles from './styles';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const Detail = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  console.log(device);
  return (
    <View style={styles.screen}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </View>
  );
};

export default Detail;
