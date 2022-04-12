import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';

const Home = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.textStyle}>
        Welcome To React Native Vision Camera Library Demo
      </Text>
      <Text style={styles.textStyle}>You can begin you work here.</Text>
    </View>
  );
};

export default Home;
