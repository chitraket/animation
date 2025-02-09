import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import EmptyDot from './emptyDot';
import {usePrevious} from '../hook';
import {getDotStyle} from '../utils';
type TProps = {
  idx: number;
  curPage: number;
  maxPage: number;
  activeColor: string;
  inactiveColor?: string;
  sizeRatio: number;
};
const Dot = (props: TProps) => {
  const [type, setType] = useState(() =>
    getDotStyle({
      idx: props.idx,
      curPage: props.curPage,
      maxPage: props.maxPage,
    }),
  );

  const [dotColor, setDotColor] = useState<string>(() => {
    if (props.curPage === props.idx) {
      return props.activeColor;
    }
    return props.inactiveColor ?? props.activeColor;
  });

  const prevType = usePrevious(type);
  const prevDotColor = usePrevious(dotColor);

  const animVal = useSharedValue(0);

  useEffect(() => {
    const nextType = getDotStyle({
      idx: props.idx,
      curPage: props.curPage,
      maxPage: props.maxPage,
    });

    const nextAnimate =
      nextType.size !== (prevType?.size || 3) ||
      nextType.opacity !== (prevType?.opacity || 0.2);

    if (props.curPage === props.idx) {
      setDotColor(props.activeColor);
    } else {
      setDotColor(props.inactiveColor ?? props.activeColor);
    }

    setType(nextType);

    if (nextAnimate) {
      animVal.value = 0;
      animVal.value = withTiming(1, {duration: 300});
    }
  }, [
    animVal,
    prevType?.opacity,
    prevType?.size,
    props.activeColor,
    props.curPage,
    props.idx,
    props.inactiveColor,
    props.maxPage,
  ]);

  const animStyle = useAnimatedStyle(() => {
    const size = interpolate(
      animVal.value,
      [0, 1],
      [(prevType?.size || 3) * props.sizeRatio, type.size * props.sizeRatio],
    );

    const backgroundColor = interpolateColor(
      animVal.value,
      [0, 1],
      [prevDotColor || props.activeColor, dotColor],
    );

    const borderRadius = size * 0.5;

    const opacity = interpolate(
      animVal.value,
      [0, 1],
      [prevType?.opacity || 0.2, type.opacity],
    );

    return {
      width: size,
      height: size,
      backgroundColor,
      borderRadius,
      opacity,
    };
  });

  if (props.curPage < 3) {
    if (props.idx >= 5) return <EmptyDot sizeRatio={props.sizeRatio} />;
  } else if (props.curPage < 4) {
    if (props.idx > 5) return <EmptyDot sizeRatio={props.sizeRatio} />;
  }

  return (
    <Animated.View
      style={[
        {
          margin: 3 * props.sizeRatio,
        },
        animStyle,
      ]}
    />
  );
};

export default Dot;
