import React from 'react';
import {AnimationCounter} from './src';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 25,
        }}>
        <AnimationCounter size="lg" />
        <AnimationCounter size="md" />
        <AnimationCounter size="sm" />
      </View>
    </SafeAreaProvider>
  );
};

export default App;
