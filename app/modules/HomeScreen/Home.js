import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import images from '../../assets/images/images';
import CustomButtons from '../../components/CustomButton';
import { useHandleHomeStates, useHandlePermission } from '../../hooks';
import styles from './styles';

const Home = () => {
  const isFocused = useIsFocused();
  const { isAuthentication, checkPermission } = useHandlePermission();
  const [startVideo, setStartVideo] = useState(false);
  const [isPress, setIsPress] = useState(true);
  const {
    image,
    isCaptured,
    hdrMode,
    activeCamera,
    devices,
    camera,
    RNFS,
    imagePathToBeStored,
    hdrPathHandler,
    flashPathHandler,
    setCaptured,
    setActiveCamera,
    takePhoto,
    flashHandler,
    hdrHandler,
    qrCodeHandle,
    faceDetectionHandle,
  } = useHandleHomeStates();

  const captureVideo = () => {
    camera.current.startRecording({
      flash: flashHandler,
      onRecordingFinished: video => {
        setStartVideo(false);
        console.log('>>>>>>>', video.path);
        RNFS.moveFile(
          video.path,
          `${imagePathToBeStored}/${video.path.split('/').pop()}`,
        );
      },
      onRecordingError: error => console.error(error),
    });
  };

  useEffect(() => {
    checkPermission();
    RNFS.mkdir(imagePathToBeStored).then(() => {});
  }, [RNFS, checkPermission, imagePathToBeStored]);

  if (devices.front == null) {
    return <ActivityIndicator style={styles.screen} />;
  }

  if (!isFocused) {
    return null;
  }

  return (
    <>
      {isAuthentication ? (
        <>
          <Camera
            ref={camera}
            style={styles.screen}
            device={activeCamera ? devices.back : devices.front}
            isActive={true}
            photo={true}
            video={startVideo}
            audio={true}
            VideoFileType={'mp4'}
            fps={240}
            videoStabilizationMode={'Standard'}
            hdr={hdrMode}
            lowLightBoost={true}
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
                <TouchableOpacity
                  style={isPress ? styles.circleRing : styles.redRing}
                  onPress={takePhoto}
                  delayLongPress={500}
                  onLongPress={() => {
                    captureVideo();
                  }}
                  onPressIn={() => {
                    setIsPress(false);
                    setStartVideo(true);
                  }}
                  onPressOut={() => {
                    camera.current
                      .stopRecording()
                      .then(res =>
                        console.log('StoppingVVideo: >>>>>>>>', res),
                      );
                    setIsPress(true);
                  }}
                />
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
      ) : (
        <>
          <Text>Grand all the permissions.</Text>
        </>
      )}
    </>
  );
};

export default Home;
