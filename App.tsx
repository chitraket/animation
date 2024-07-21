import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {AnimationScratchCard} from './src';

const App = () => {
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimationScratchCard />
      </View>
    </SafeAreaProvider>
  );
};

export default App;
