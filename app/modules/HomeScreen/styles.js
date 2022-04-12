import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

const { verticalScale, horizontalScale, moderateScale } = Metrics;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  captureContainer: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
  },
  circleRing: {
    borderWidth: 5,
    padding: moderateScale(30),
    marginBottom: verticalScale(40),
    borderRadius: moderateScale(80),
    borderColor: 'white',
  },
  displayImage: {
    height: '100%',
  },
  cancelButton: {
    height: horizontalScale(40),
    width: verticalScale(40),
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(15),
  },
});

export default styles;
