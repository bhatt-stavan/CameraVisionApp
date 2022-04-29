import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

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

  zoomAndRingSeparator: { height: 20 },
  emptyFlexContainer: { flex: 1.6 },
  zoomButtonsContainers: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '45%',
    backgroundColor: Colors.grayTransparent,
    paddingVertical: 5,
    borderRadius: 20,
    paddingHorizontal: 5,
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
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: Colors.white,
  },
  inactiveZoom: {
    height: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.white,
  },
});

export default styles;
