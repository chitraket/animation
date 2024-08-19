import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AnimationRefresh} from './src';

const App = () => {
  return (
    <SafeAreaProvider>
      <AnimationRefresh />
    </SafeAreaProvider>
  );
};

export default App;
