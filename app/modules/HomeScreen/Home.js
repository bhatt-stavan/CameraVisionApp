import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  NativeModules,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {
  Camera,
  CameraCaptureError,
  CameraRuntimeError,
  useCameraDevices,
} from 'react-native-vision-camera';
import styles from './styles';

const Home = () => {
  const [cameraAccess, setCameraAccess] = useState(false);
  const camera = useRef(null);
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);
  const [show, setShow] = useState(false);

  const focus = async () => {
    try {
      const onFocus = await camera.current.focus({
        x: 0.5,
        y: 0.5,
      });
      console.log('focus', onFocus);
    } catch (e) {
      console.log(e);
      throw tryParseNativeCameraError(e);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => setShow(false),
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => false,
      onPanResponderGrant: (evt, gestureState) => false,
      onPanResponderEnd: () => {
        setShow(false);
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log('Release');
        setLocationX(evt.nativeEvent.locationX.toFixed(2));
        setLocationY(evt.nativeEvent.locationY.toFixed(2));
        focus();
        setShow(true);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log('Terminate');
      },
    }),
  ).current;

  console.log('measureX', locationX);
  console.log('measureY', locationY);

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
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;

  const askPermission = async () => {
    try {
      const getPermission = await Camera.getCameraPermissionStatus();
      if (getPermission === 'denied') {
        const reqPermission = await Camera.requestCameraPermission();
        if (reqPermission === 'authorized') {
          setCameraAccess(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    askPermission();
  }, []);

  if (!cameraAccess) {
    <View style={styles.container}>
      <Text>No Permission</Text>
    </View>;
  }

  if (device == null) {
    console.log('devices', device);
    return <ActivityIndicator />;
  }

  // check if camera has any errors
  const isCameraErrorJson = error =>
    typeof error === 'object' &&
    error != null &&
    typeof error.code === 'string' &&
    typeof error.message === 'string' &&
    (typeof error.cause === 'object' || error.cause == null);

  const tryParseNativeCameraError = nativeError => {
    if (isCameraErrorJson(nativeError)) {
      if (nativeError.code.startsWith('capture')) {
        return new CameraCaptureError(
          nativeError.code,
          nativeError.message,
          nativeError.cause,
        );
      } else {
        return new CameraRuntimeError(
          nativeError.code,
          nativeError.message,
          nativeError.cause,
        );
      }
    } else {
      return nativeError;
    }
  };

  const CameraModule = NativeModules.CameraView;
  if (CameraModule == null) {
    console.error("Camera: Native Module 'CameraView' was null!");
  }

  return (
    <GestureHandlerRootView style={styles.screen}>
      <TapGestureHandler numberOfTaps={1} onActivated={focus}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
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
                  top: parseFloat(locationY),
                  left: parseFloat(locationX),
                },
              ]}
            />
          ) : null}
          <View style={styles.captureView} {...panResponder.panHandlers} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Home;
