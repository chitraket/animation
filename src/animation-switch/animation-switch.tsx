import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, ViewStyle} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {getStyles} from './utils';

interface RNSwitchProps {
  handleOnPress: (newValue: boolean) => void;
  value: boolean;
  activeTrackColor?: string;
  inActiveTrackColor?: string;
  thumbColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  status?: 'default' | 'wrapper';
  containerStyle?: ViewStyle;
  circleStyle?: ViewStyle;
}

const AnimationSwitch: React.FC<RNSwitchProps> = ({
  handleOnPress,
  activeTrackColor = '#007AFF',
  inActiveTrackColor = '#F2F5F7',
  thumbColor = '#FFF',
  value,
  disabled = false,
  status = 'default',
  containerStyle,
  circleStyle,
}) => {
  const mainStyle = getStyles(status);
  const interpolateBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      value ? 22 : 0,
      [0, 22],
      [inActiveTrackColor, activeTrackColor],
    );

    return {
      opacity: disabled ? 0.5 : 1,
      backgroundColor,
    };
  });

  const memoizedOnSwitchPressCallback = () => {
    if (!disabled) {
      handleOnPress(!value);
    }
  };

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: thumbColor,
      transform: [
        {
          translateX: withSpring(value ? 22 : 0, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });
  return (
    <TouchableWithoutFeedback
      onPress={memoizedOnSwitchPressCallback}
      disabled={disabled}>
      <Animated.View
        needsOffscreenAlphaCompositing
        style={[
          styles.containerStyle,
          interpolateBackgroundColor,
          mainStyle,
          containerStyle,
        ]}>
        <Animated.View
          style={[styles.circleStyle, customSpringStyles, circleStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 5,
  },
  containerStyle: {
    borderRadius: 30,
    backgroundColor: '#F2F5F7',
    justifyContent: 'center',
  },
});

export default AnimationSwitch;
