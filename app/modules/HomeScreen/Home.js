import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import images from '../../assets/images/images';
import CustomButtons from '../../components/CustomButton';
import NavigationString from '../../constants/Navigations';
import styles from './styles';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  var RNFS = require('react-native-fs');

  const [image, setImage] = useState('');
  const [isCaptured, setCaptured] = useState(false);
  const [activeCamera, setActiveCamera] = useState(true);
  const [camFlash, setCamFlash] = useState('off');
  const [hdrMode, setHdrMode] = useState(false);
  const devices = useCameraDevices();
  const camera = useRef(null);
  const imagePathToBeStored =
    `${RNFS.ExternalStorageDirectoryPath}` + '/DCIM/RNVC';

  useEffect(() => {
    RNFS.mkdir(imagePathToBeStored).then(() => {});
  }, [RNFS, imagePathToBeStored]);

  const takePhoto = () => {
    camera.current
      .takeSnapshot({
        flash: `${camFlash}`,
        quality: 100,
        skipMetadata: true,
      })
      .then(res => {
        setImage(res.path);
        setCaptured(true);
      });
  };

  const flashHandler = () => {
    camFlash === 'off' ? setCamFlash('on') : setCamFlash('off');
  };

  const hdrHandler = () => {
    hdrMode === false ? setHdrMode(true) : setHdrMode(false);
  };

  const hdrPathHandler = hdrMode === true ? images.hdrOn : images.hdrOff;

  const flashPathHandler = camFlash === 'on' ? images.flashOn : images.flashOff;

  if (devices.front == null) {
    return <ActivityIndicator style={styles.screen} />;
  }

  const qrCodeHandle = () => {
    navigation.navigate(NavigationString.DETAILS);
  };

  const faceDetectionHandle = () => {
    navigation.navigate(NavigationString.FACE);
  };

  if (!isFocused) {
    return null;
  }

  return (
    <>
      <Camera
        ref={camera}
        style={styles.screen}
        device={activeCamera ? devices.back : devices.front}
        isActive={true}
        photo={true}
        hdr={hdrMode}
      />

      {!isCaptured ? (
        <>
          <CustomButtons
            path={images.flip}
            onPressFun={() => setActiveCamera(!activeCamera)}
          />
          <CustomButtons
            path={hdrPathHandler}
            onPressFun={hdrHandler}
            style={styles.hdrImage}
          />
          <CustomButtons
            path={images.qr_code}
            onPressFun={qrCodeHandle}
            style={styles.qrImage}
          />
          <CustomButtons
            path={images.face}
            onPressFun={faceDetectionHandle}
            style={styles.faceImage}
          />
          {!activeCamera ? (
            devices.front?.hasFlash ? (
              <CustomButtons
                onPressFun={flashHandler}
                path={flashPathHandler}
                style={styles.flashImage}
              />
            ) : (
              <></>
            )
          ) : (
            <CustomButtons
              path={flashPathHandler}
              onPressFun={flashHandler}
              style={styles.flashImage}
            />
          )}
          <View style={styles.captureContainer}>
            <TouchableOpacity style={styles.circleRing} onPress={takePhoto} />
          </View>
        </>
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
          <TouchableOpacity
            onPress={() => {
              RNFS.moveFile(
                image,
                `${imagePathToBeStored}/${image.split('/').pop()}`,
              ).then(res => setCaptured(false));
            }}>
            <Image source={images.download} style={styles.downloadButton} />
          </TouchableOpacity>
        </ImageBackground>
      )}
    </>
  );
};

export default Home;
