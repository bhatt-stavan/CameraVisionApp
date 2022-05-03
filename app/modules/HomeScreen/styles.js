import { Platform, StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

const { verticalScale, horizontalScale, moderateScale } = Metrics;
const styles = StyleSheet.create({
  styleFlex: {
    flex: 1,
  },
  focusCancel: {
    height: 43,
    width: 43,
    marginTop: -6,
    marginRight: -6,
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
    height: moderateScale(45),
    width: moderateScale(45),
    borderRadius: 40,
  },
  captureView: {
    opacity: 0.9,
    flex: 1,
  },
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
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(80),
    borderColor: 'white',
  },
  displayImage: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flashImage: {
    top: Metrics.verticalScale(250),
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
  focusOff: {
    top: Metrics.verticalScale(200),
  },
  focusOn: {
    top: Metrics.verticalScale(200),
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
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(80),
    backgroundColor: Colors.red,
  },

  zoomAndRingSeparator: { height: verticalScale(20) },
  emptyFlexContainer: { flex: 1.6 },
  zoomButtonsContainers: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '45%',
    backgroundColor: Colors.grayTransparent,
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(20),
    paddingHorizontal: horizontalScale(5),
    marginBottom: verticalScale(20),
  },
  zoomContainer: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  zoomTextStyle: {
    fontSize: moderateScale(10),
    color: Colors.black,
    fontWeight: '600',
  },
  selectedZoom: {
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: Colors.white,
  },
  inactiveZoom: {
    height: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.white,
  },
  zoomButtonView: {
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(30),
    borderRadius: moderateScale(15),
  },
  viewModesStyle: {
    position: 'absolute',
    width: horizontalScale(60),
    borderRadius: moderateScale(40),
    height: verticalScale(310),
    right: horizontalScale(10),
    top: verticalScale(10),
    backgroundColor: Colors.grayTransparent,
  },
});

export default styles;
