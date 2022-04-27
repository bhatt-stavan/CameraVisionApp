import { Platform, StyleSheet } from 'react-native';
import { moderateScale } from '../../theme/Metrics';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? moderateScale(20) : 0,
  },
  innerContainer: {
    paddingTop: Platform.OS === 'ios' ? moderateScale(20) : 0,
  },
  innerView: {
    flex: 1,
    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: moderateScale(2),
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: 40,
  },
  captureView: { flex: 1, opacity: 0.97 },
});

export default styles;
