import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
const OFFSET = 45;
const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 2;

const PaginationDot = ({
  index,
  scrollX,
}: {
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      scrollX.value,
      [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
      [10, 20, 10],
      Extrapolation.CLAMP,
    );

    const opacityAnimation = interpolate(
      scrollX.value,
      [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollX.value,
      [0, ITEM_WIDTH, 2 * ITEM_WIDTH],
      ['#9095A7', '#9095A7', '#9095A7'],
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.dots, animatedDotStyle, animatedColor]} />
  );
};

type TProps = {
  data: any;
  scrollX: SharedValue<number>;
};
const ParallaxCarouselPagination = ({data, scrollX}: TProps) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_: any, index: number) => {
        return <PaginationDot index={index} scrollX={scrollX} key={index} />;
      })}
    </View>
  );
};

export default ParallaxCarouselPagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dots: {
    height: 10,
    marginHorizontal: 8,
    borderRadius: 5,
  },
});
