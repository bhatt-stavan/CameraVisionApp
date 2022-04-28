import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useFaceDetection } from '../../hooks/useFaceDetection';
import styles from './styles';

const FaceDetectionScreen = () => {
  const devices = useCameraDevices();
  const device = devices.front;

  const isFocused = useIsFocused();
  const { faces, frameProcessor } = useFaceDetection();

  if (devices.front == null) {
    return <ActivityIndicator style={styles.screen} />;
  }
  if (!isFocused) {
    return null;
  }
  const { width, height } = Dimensions.get('window');
  // console.log(width, height);
  const x = faces?.x ?? 0;
  const y = faces?.y ?? 0;
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
      {/* <View
        style={{
          position: 'absolute',
          height: 100,
          width: 100,
          borderColor: 'white',
          borderWidth: 2,
          bottom: faces?.y ?? 0,
          right: faces?.x ?? 0,
        }}></View> */}
      <Svg style={styles.svgStyle} height="100%" width="100%">
        <Rect
          x={(width / 392) * x}
          y={(height / 1300) * y}
          width={200}
          height={200}
          stroke="red"
          strokeWidth="2"
        />
      </Svg>
      <View style={styles.resultStyle}>
        <Text style={styles.textStyle}>
          <Text style={styles.textStyle}>
            {faces === undefined ? 'Not Detected' : 'Face Detected'}
          </Text>
        </Text>
      </View>
    </>
  );
};

export default FaceDetectionScreen;
