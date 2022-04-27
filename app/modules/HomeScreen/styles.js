import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../theme';

const { verticalScale, horizontalScale, moderateScale } = Metrics;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flashImage: {
    top: Metrics.verticalScale(200),
  },
  hdrImage: {
    top: Metrics.verticalScale(50),
  },
  qrImage: {
    top: Metrics.verticalScale(100),
  },
  faceImage: {
    top: Metrics.verticalScale(150),
  },
  cancelButton: {
    height: horizontalScale(40),
    width: verticalScale(40),
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(15),
  },
  downloadButton: {
    tintColor: 'white',
    height: horizontalScale(35),
    width: verticalScale(35),
    alignSelf: 'flex-end',
    margin: moderateScale(20),
  },
  redRing: {
    borderWidth: 5,
    height: verticalScale(8),
    padding: moderateScale(30),
    marginBottom: verticalScale(40),
    borderRadius: moderateScale(80),
    backgroundColor: Colors.red,
  },
});

export default styles;
