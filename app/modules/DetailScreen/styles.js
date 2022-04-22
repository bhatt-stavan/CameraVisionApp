import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

const { horizontalScale, verticalScale, moderateScale } = Metrics;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageStyle: {
    height: verticalScale(320),
    width: horizontalScale(320),
    top: verticalScale(180),
    left: horizontalScale(30),
    position: 'absolute',
  },
  textStyle: {
    width: '100%',
    fontSize: moderateScale(20),
    padding: moderateScale(20),
    alignSelf: 'flex-start',
    color: Colors.white,
    fontWeight: '900',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  resultStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    opacity: 0.8,
    position: 'absolute',
  },
});

export default styles;
