import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AnimationParallaxCarousel} from './src';

const App = () => {
  return (
    <SafeAreaProvider>
      <AnimationParallaxCarousel />
    </SafeAreaProvider>
  );
};

export default App;
