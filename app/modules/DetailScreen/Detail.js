import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import styles from './styles';

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
