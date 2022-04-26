import { Dimensions, Platform } from 'react-native';

let { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device

if (width > height) {
  [width, height] = [height, width];
}

const guidelineBaseWidth = 375;

const guidelineBaseHeight = 812;

const horizontalScale = size => (width / guidelineBaseWidth) * size;

const verticalScale = size => (height / guidelineBaseHeight) * size;

const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const globalMetrics = {
  isAndroid: Platform.OS !== 'ios',
};

export default { horizontalScale, verticalScale, moderateScale, globalMetrics };
