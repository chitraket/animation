import {StyleSheet} from 'react-native';
import {useCallback, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import React from 'react';
import {CounterButton} from './components';
import {getStyles} from './utils';
type TProps = {
  minCount?: number;
  maxCount?: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
};
const AnimationCounter = ({
  minCount = 0,
  maxCount = 4,
  count = 0,
  size = 'lg',
}: TProps) => {
  const [countValue, setCountValue] = useState(count);
  const shakeTranslateX = useSharedValue(0);
  const style = getStyles(size);

  const shake = useCallback(() => {
    const TranslationAmount = 10;
    const timingConfig = {
      easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
      duration: 80,
    };
    shakeTranslateX.value = withSequence(
      withTiming(TranslationAmount, timingConfig),
      withRepeat(withTiming(-TranslationAmount, timingConfig), 3, true),
      withSpring(0, {
        mass: 0.5,
      }),
    );
  }, [shakeTranslateX]);

  const isShaking = useDerivedValue(() => {
    return shakeTranslateX.value !== 0;
  }, [shakeTranslateX]);

  const onIncrement = useCallback(() => {
    setCountValue(number => {
      const countNumber = number + 1;
      if (countNumber > maxCount) {
        shake();
        return number;
      }
      return countNumber;
    });
  }, [maxCount, shake]);

  const onDecrement = useCallback(() => {
    setCountValue(number => {
      const countNumber = number - 1;
      if (countNumber < minCount) {
        shake();
        return number;
      }
      return countNumber;
    });
  }, [minCount, shake]);

  const counterTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: shakeTranslateX.value}],
      color: withTiming(isShaking.value ? 'red' : 'black', {
        duration: 50,
      }),
      ...style,
    };
  }, [shakeTranslateX]);

  const errorButtonTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(isShaking.value ? 'red' : 'grey', {
        duration: 50,
      }),
      ...style,
    };
  }, []);

  const errorViewStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(isShaking.value ? 'red' : 'grey', {
        duration: 50,
      }),
    };
  }, []);

  return (
    <Animated.View style={[styles.buttonsContainer, errorViewStyle]}>
      <CounterButton
        text="-"
        onPress={onDecrement}
        textStyle={errorButtonTextStyle}
      />
      <Animated.Text style={[counterTextStyle]}>{countValue}</Animated.Text>
      <CounterButton
        text="+"
        onPress={onIncrement}
        textStyle={errorButtonTextStyle}
      />
    </Animated.View>
  );
};

export default AnimationCounter;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 12,
  },
});
