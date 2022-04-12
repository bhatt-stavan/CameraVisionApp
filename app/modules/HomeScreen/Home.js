import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import images from '../../assets/images/images';
import styles from './styles';

const Home = () => {
  const [image, setImage] = useState(null);
  const [isCaptured, setCaptured] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const takePhoto = () => {
    camera.current
      .takeSnapshot({
        quality: 85,
        skipMetadata: true,
      })
      .then(res => {
        setImage(res.path);
        setCaptured(true);
      });
  };

  if (device == null) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <Camera
        ref={camera}
        style={styles.screen}
        device={device}
        isActive={true}
        photo={true}
      />
      {!isCaptured ? (
        <View style={styles.captureContainer}>
          <TouchableOpacity style={styles.circleRing} onPress={takePhoto} />
        </View>
      ) : (
        <ImageBackground
          style={styles.displayImage}
          source={{ uri: `file://${image}` }}>
          <TouchableOpacity
            onPress={() => {
              setCaptured(false);
            }}>
            <Image source={images.cancel} style={styles.cancelButton} />
          </TouchableOpacity>
        </ImageBackground>
      )}
    </>
  );
};

export default Home;
