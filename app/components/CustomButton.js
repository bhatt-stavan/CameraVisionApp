import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButtons = ({ style, onPressFun, path, imageStyle }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.touchableStyle, ...style }}
      onPress={onPressFun}>
      <Image source={path} style={{ ...styles.imageStyle, ...imageStyle }} />
    </TouchableOpacity>
  );
};

export default CustomButtons;

const styles = StyleSheet.create({
  touchableStyle: {
    width: '100%',
    position: 'absolute',
    alignItems: 'flex-end',
  },
  imageStyle: {
    top: 15,
    right: 15,
    height: 30,
    width: 30,
    tintColor: 'white',
  },
});
