import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { useCameraDevices } from 'react-native-vision-camera';
import images from '../assets/images/images';
import NavigationString from '../constants/Navigations';

const useHandleHomeStates = () => {
  const navigation = useNavigation();
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

  const qrCodeHandle = () => {
    navigation.navigate(NavigationString.DETAILS);
  };

  const faceDetectionHandle = () => {
    navigation.navigate(NavigationString.FACE);
  };

  return {
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
  };
};

export default useHandleHomeStates;
