import { useState } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { useFrameProcessor } from 'react-native-vision-camera';
import { scanFaces } from './scanFaces';

export function useFaceDetection() {
  const [faces, setFaces] = useState();
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    runOnJS(setFaces)(scannedFaces[0]?.bounds);
  }, []);
  return { frameProcessor, faces };
}
