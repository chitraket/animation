import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AnimationStackCard} from './src';

const App = () => {
  return (
    <SafeAreaProvider>
      <AnimationStackCard />
    </SafeAreaProvider>
  );
};

export default App;
