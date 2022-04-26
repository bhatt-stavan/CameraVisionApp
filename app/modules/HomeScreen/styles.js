import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  innerContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  innerView: {
    flex: 1,
    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 2,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  captureView: { flex: 1, opacity: 0.97 },
});

export default styles;
