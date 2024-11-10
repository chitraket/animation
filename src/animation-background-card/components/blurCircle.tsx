import {Circle, CircleProps} from '@shopify/react-native-skia';
import React, {useEffect, useRef} from 'react';
import {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const BlurCircleColors = [
  '#2773C1',
  '#C45FB4',
  '#24BF30',
  '#A077FC',
  '#F4BA20',
  '#FC5F5C',
  '#F39247',
  '#D6D9FA',
  '#D6F9EE',
  '#FFF0DC',
];

type Props = CircleProps & {
  delay?: number;
};

const BlurCircle = ({delay = 0, ...props}: Props): JSX.Element => {
  const colors = useRef(
    [...BlurCircleColors].sort(() => Math.random() - 0.5),
  ).current;
  const colorAnimationDuration = useRef(colors.length * 1500).current;

  const color = useSharedValue(0);
  const radius = useSharedValue(props.r);
  const radiusAnimationSize = useRef(props.r).current;

  const animatedColor = useDerivedValue(() =>
    interpolateColor(
      color.value,
      colors.map((_, index) => index / (colors.length - 1)),
      colors,
    ),
  );

  useEffect(() => {
    radius.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(radiusAnimationSize, {duration: 2000}),
          withTiming(props.r, {duration: 2000}),
        ),
        -1,
        true,
      ),
    );

    color.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, {duration: colorAnimationDuration}),
          withTiming(0, {duration: colorAnimationDuration}),
        ),
        -1,
      ),
    );
  }, [
    delay,
    props.r,
    colorAnimationDuration,
    radiusAnimationSize,
    radius,
    color,
  ]);

  return <Circle {...props} r={radius} color={animatedColor} />;
};

export default BlurCircle;
