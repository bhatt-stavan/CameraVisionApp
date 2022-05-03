import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  Image,
  ImageBackground,
  NativeModules,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { Camera } from 'react-native-vision-camera';
import images from '../../assets/images/images';
import CustomButtons from '../../components/CustomButton';
import { useHandleHomeStates, useHandlePermission } from '../../hooks';
import styles from './styles';

const ZoomButton = ({
  onSelect = arg => {},
  setMinimumZoom = arg => {},
  dotStyle,
  minZoom,
  x,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onSelect();
        setMinimumZoom();
      }}
      style={styles.zoomButtonView}>
      <View style={dotStyle === x ? styles.selectedZoom : styles.inactiveZoom}>
        {dotStyle === x ? (
          <Text style={styles.zoomTextStyle}>{minZoom}x</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  const isFocused = useIsFocused();
  const { isAuthentication, checkPermission } = useHandlePermission();
  const [startVideo, setStartVideo] = useState(false);
  const [isPress, setIsPress] = useState(true);
  const [manualFocus, setManualFocus] = useState(false);
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);
  const [show, setShow] = useState(false);

  const useIsForeground = () => {
    const [isForeground, setIsForeground] = useState(true);

    useEffect(() => {
      const onChange = state => {
        setIsForeground(state === 'active');
      };
      const listener = AppState.addEventListener('change', onChange);
      return () => listener.remove();
    }, [setIsForeground]);
    return isForeground;
  };

  // check if camera page is active

  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;

  const CameraModule = NativeModules.CameraView;

  if (CameraModule == null) {
    console.error("Camera: Native Module 'CameraView' was null!");
  }

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

  //Zooming Code
  const device = devices.back;
  const fishEyeZoom = device?.minZoom ?? 1;
  const minZoom = device?.neutralZoom ?? 1;
  const maxZoom = device?.maxZoom ?? 1;
  const semiMaxZoom = (minZoom + maxZoom) / 2 ?? 1;
  const neutralZoom = device?.neutralZoom ?? 1;
  const [zoom, setZoom] = useState(minZoom);

  const [dotStyle, setDotStyle] = useState(1);

  const captureVideo = () => {
    camera.current.startRecording({
      flash: flashHandler,
      onRecordingFinished: video => {
        setStartVideo(false);
        RNFS.moveFile(
          video.path,
          `${imagePathToBeStored}/${video.path.split('/').pop()}`,
        );
      },
      onRecordingError: error => console.error(error),
    });
  };

  const onHide = () => {
    setTimeout(function () {
      setShow(false);
    }, 1000);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => false,
      onPanResponderGrant: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        setLocationX(evt.nativeEvent.locationX.toFixed(2));
        setLocationY(evt.nativeEvent.locationY.toFixed(2));
        setShow(true);
        onHide();
      },
    }),
  ).current;

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
          {!manualFocus ? (
            <GestureHandlerRootView style={styles.styleFlex}>
              <TapGestureHandler
                numberOfTaps={2}
                onActivated={() => {
                  setActiveCamera(!activeCamera);
                }}>
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
                  zoom={zoom}
                />
              </TapGestureHandler>
            </GestureHandlerRootView>
          ) : (
            <>
              <GestureHandlerRootView style={styles.styleFlex}>
                <TapGestureHandler
                  numberOfTaps={1}
                  onHandlerStateChange={({ nativeEvent }) => {
                    camera?.current?.focus({
                      x: nativeEvent.x,
                      y: nativeEvent.y,
                    });
                  }}>
                  <Camera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={activeCamera ? devices.back : devices.front}
                    isActive={isActive}
                    photo={true}
                  />
                </TapGestureHandler>
                <View style={styles.container}>
                  <View style={styles.innerView}>
                    {show ? (
                      <View
                        style={[
                          styles.dot,
                          {
                            top: parseFloat(locationY - 20),
                            left: parseFloat(locationX - 20),
                          },
                        ]}
                      />
                    ) : null}
                    <View
                      style={styles.captureView}
                      {...panResponder.panHandlers}
                    />
                  </View>
                </View>
              </GestureHandlerRootView>
            </>
          )}

          {!isCaptured ? (
            <>
              <View style={styles.viewModesStyle}>
                <>
                  <>
                    {manualFocus ? (
                      <>
                        <CustomButtons
                          path={images.focus}
                          onPressFun={() => {
                            setManualFocus(!manualFocus);
                          }}
                          style={styles.focusOff}
                        />
                        <CustomButtons
                          path={images.cancel}
                          imageStyle={styles.focusCancel}
                          onPressFun={() => {
                            setManualFocus(!manualFocus);
                          }}
                          style={styles.focusOn}
                        />
                      </>
                    ) : (
                      <CustomButtons
                        path={images.focus}
                        onPressFun={() => {
                          setManualFocus(!manualFocus);
                        }}
                        style={styles.focusOff}
                      />
                    )}
                  </>

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
                </>
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
              </View>

              <View style={styles.captureContainer}>
                {/* ------------------Zooming Code Start-----------*/}
                <View style={styles.zoomButtonsContainers}>
                  {fishEyeZoom < minZoom && (
                    <ZoomButton
                      onSelect={() => setDotStyle(0)}
                      setMinimumZoom={() => setZoom(fishEyeZoom)}
                      dotStyle={dotStyle}
                      minZoom={fishEyeZoom}
                      x={0}
                    />
                  )}
                  <ZoomButton
                    onSelect={() => setDotStyle(1)}
                    setMinimumZoom={() => setZoom(minZoom)}
                    dotStyle={dotStyle}
                    minZoom={minZoom}
                    x={1}
                  />
                  <ZoomButton
                    onSelect={() => setDotStyle(2)}
                    setMinimumZoom={() => setZoom(semiMaxZoom)}
                    dotStyle={dotStyle}
                    minZoom={semiMaxZoom}
                    x={2}
                  />
                  <ZoomButton
                    onSelect={() => setDotStyle(3)}
                    setMinimumZoom={() => setZoom(maxZoom)}
                    dotStyle={dotStyle}
                    minZoom={maxZoom}
                    x={3}
                  />
                </View>
                {/* --------------------Zooming Code End------------------ */}
                <TouchableOpacity
                  style={isPress ? styles.circleRing : styles.redRing}
                  onPress={takePhoto}
                  delayLongPress={750}
                  activeOpacity={0.5}
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
                      .then(res => console.log('StoppingVideo: >>>>>>>>', res));
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
