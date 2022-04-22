import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import images from '../../assets/images/images';
import { BarCodes } from '../../hooks/scanCode';
import { useScanBarCodes } from '../../hooks/useScanCode';
import styles from './styles';

const Detail = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barCodes] = useScanBarCodes([BarCodes.ALL_FORMATS], {
    checkInverted: true,
  });

  const isFocused = useIsFocused();

  if (devices.front == null) {
    return <ActivityIndicator style={styles.screen} />;
  }
  if (!isFocused) {
    return null;
  }

  return (
    <>
      <Camera
        style={styles.screen}
        device={device}
        isActive={true}
        video={true}
        frameProcessor={
          device.supportsParallelVideoProcessing ? frameProcessor : undefined
        }
        frameProcessorFps={5}
      />
      <Image
        style={styles.imageStyle}
        source={images.qr_scanner}
        resizeMode="contain"
      />
      <View style={styles.resultStyle}>
        <Text style={styles.textStyle}>
          Scan Result:
          <Text style={styles.textStyle}>{barCodes[0]?.displayValue}</Text>
        </Text>
      </View>
    </>
  );
};

export default Detail;
