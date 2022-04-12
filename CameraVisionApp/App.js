import React from 'react';
import { SafeAreaView } from 'react-native';
import Routes from './app/navigation/Routes';
import { applicationStyles } from './app/theme';

const App = () => {
  return (
    <SafeAreaView style={applicationStyles.container}>
      <Routes />
    </SafeAreaView>
  );
};

export default App;
