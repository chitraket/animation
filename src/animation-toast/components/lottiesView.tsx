import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import LottieView from 'lottie-react-native';

type TProps = {
  animationStyle?: ViewStyle;
  source: string | {uri: string};
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  animationViewStyle?: ViewStyle;
};
const LottiesView = ({
  animationStyle,
  source,
  autoPlay = true,
  loop = true,
  speed,
  animationViewStyle,
}: TProps) => {
  return (
    <View style={{...animationViewStyle}}>
      <LottieView
        style={{...styles.animationStyle, ...animationStyle}}
        source={source}
        autoPlay={autoPlay}
        speed={speed}
        loop={loop}
      />
    </View>
  );
};

export default LottiesView;

const styles = StyleSheet.create({
  animationStyle: {
    width: 3,
    height: 3,
  },
});
