import { useState } from 'react';
import { Platform } from 'react-native';
import { openSettings, PERMISSIONS } from 'react-native-permissions';
import { checkMultiplePermission, multipleRequest } from '../services/Utils';

const useHandlePermission = () => {
  const [isAuthentication, setAuthorized] = useState(false);
  const checkPermission = () => {
    checkMultiplePermission([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MEDIA_LIBRARY,
      PERMISSIONS.IOS.MICROPHONE,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ]).then(res => {
      if (Platform.OS === 'android') {
        if (
          res[PERMISSIONS.ANDROID.CAMERA] === 'denied' &&
          res[PERMISSIONS.ANDROID.RECORD_AUDIO] === 'denied' &&
          res[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'denied'
        ) {
          multipleRequest([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.RECORD_AUDIO,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ]).then(status => {
            if (
              status[PERMISSIONS.ANDROID.CAMERA] === 'granted' &&
              status[PERMISSIONS.ANDROID.RECORD_AUDIO] === 'granted' &&
              status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted'
            ) {
              setAuthorized(true);
            }
          });
        }
        if (
          res[PERMISSIONS.ANDROID.CAMERA] === 'blocked' &&
          res[PERMISSIONS.ANDROID.RECORD_AUDIO] === 'blocked' &&
          res[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'blocked'
        ) {
          openSettings();
        }
        if (
          res[PERMISSIONS.ANDROID.CAMERA] === 'granted' &&
          res[PERMISSIONS.ANDROID.RECORD_AUDIO] === 'granted' &&
          res[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted'
        ) {
          setAuthorized(true);
        }
      } else {
        if (
          res[PERMISSIONS.IOS.CAMERA] === 'denied' &&
          res[PERMISSIONS.IOS.MEDIA_LIBRARY] === 'denied' &&
          res[PERMISSIONS.IOS.MICROPHONE] === 'denied' &&
          res[PERMISSIONS.IOS.PHOTO_LIBRARY] === 'denied'
        ) {
          multipleRequest([
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.MEDIA_LIBRARY,
            PERMISSIONS.IOS.MICROPHONE,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
          ]);
        }
        if (
          res[PERMISSIONS.IOS.CAMERA] === 'blocked' &&
          res[PERMISSIONS.IOS.MEDIA_LIBRARY] === 'blocked' &&
          res[PERMISSIONS.IOS.MICROPHONE] === 'blocked' &&
          res[PERMISSIONS.IOS.PHOTO_LIBRARY] === 'blocked'
        ) {
          openSettings();
        }
        if (
          res[PERMISSIONS.IOS.CAMERA] === 'granted' &&
          res[PERMISSIONS.IOS.MEDIA_LIBRARY] === 'granted' &&
          res[PERMISSIONS.IOS.MICROPHONE] === 'granted' &&
          res[PERMISSIONS.IOS.PHOTO_LIBRARY] === 'granted'
        ) {
          setAuthorized(true);
        }
      }
    });
  };

  return { isAuthentication, setAuthorized, checkPermission };
};

export default useHandlePermission;
