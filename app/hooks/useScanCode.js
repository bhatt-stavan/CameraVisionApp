import { useState } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { useFrameProcessor } from 'react-native-vision-camera';
import { scanBarCodes } from './scanCode';

export function useScanBarCodes(types, options) {
  const [barCodes, setBarCodes] = useState([]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';

    const detectedBarCodes = scanBarCodes(frame, types, options);
    detectedBarCodes?.length > 0 && runOnJS(setBarCodes)(detectedBarCodes);
  }, []);

  return [frameProcessor, barCodes, setBarCodes];
}
