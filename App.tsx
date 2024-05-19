import React from 'react';
import {AnimationTopTab} from './src';
import {
  horizontalScrollData,
  verticalScrollData,
} from './src/animation-top-tab/data';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <AnimationTopTab
        horizontalScrollData={horizontalScrollData}
        verticalScrollData={verticalScrollData}
      />
    </SafeAreaProvider>
  );
};

export default App;
