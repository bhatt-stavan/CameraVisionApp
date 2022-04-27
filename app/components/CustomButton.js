import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButtons = ({ style, onPressFun, path, imageStyle }) => {
  return (
    <View style={styles.buttonContainerStyle}>
      <TouchableOpacity
        style={{ ...styles.touchableStyle, ...style }}
        onPress={onPressFun}>
        <Image source={path} style={{ ...styles.imageStyle, ...imageStyle }} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomButtons;

const styles = StyleSheet.create({
  touchableStyle: {
    position: 'absolute',
  },
  imageStyle: {
    top: 15,
    right: 15,
    height: 30,
    width: 30,
    tintColor: 'white',
  },
  buttonContainerStyle: {
    width: '100%',
    position: 'absolute',
    alignItems: 'flex-end',
  },
});
