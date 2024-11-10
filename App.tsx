import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AnimationBackgroundCard} from './src';
import {View} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <AnimationBackgroundCard />
      </View>
    </SafeAreaProvider>
  );
};

export default App;
