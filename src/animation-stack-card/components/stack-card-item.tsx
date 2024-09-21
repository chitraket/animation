import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {data} from '../data';

type Props = {
  item: (typeof data)[0];
  index: number;
  actualIndex: number;
  setActualIndex: React.Dispatch<React.SetStateAction<number>>;
};

const StackCardItem = ({item, index, actualIndex, setActualIndex}: Props) => {
  const position = useSharedValue({x: 0, y: 0});
  const lastOffset = useSharedValue({x: 0, y: 0});
  const value = useSharedValue(9);
  const panGestureHandler = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(({translationX, translationY}) => {
      if (actualIndex !== index || actualIndex === 0) return;
      position.value = {
        x: translationX + lastOffset.value.x,
        y: translationY + lastOffset.value.y,
      };
    })
    .onEnd(() => {
      if (
        Math.abs(position.value.x) < 100 &&
        Math.abs(position.value.y) < 100
      ) {
        lastOffset.value = {x: 0, y: 0};
        position.value = withSpring({x: 0, y: 0});
      } else {
        lastOffset.value = {x: 0, y: 0};
        position.value = withTiming({
          x: position.value.x * 10,
          y: position.value.y * 10,
        });
        setActualIndex(actualIndex - 1);
        data.pop();
      }
    });

  const rotate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 8, -8, 0],
      Extrapolate.CLAMP,
    );
  });

  const additionalTranslate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 30, -30, 0],
      Extrapolate.CLAMP,
    );
  });

  const scale = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0.2, 0.9, 0.9, 1],
      Extrapolate.CLAMP,
    );
  });

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotate.value}deg`,
        },
        {
          translateX: position.value.x + additionalTranslate.value,
        },
        {
          translateY: position.value.y,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  useEffect(() => {
    value.value = withSpring(actualIndex, {
      damping: 10,
      stiffness: 100,
    });
  }, [actualIndex]);
  return (
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View
        style={[
          {
            zIndex: actualIndex + 1,
          },
          styles.animatedView,
          rnStyle,
        ]}>
        <ImageBackground source={item.poster} style={styles.imageStyle}>
          <View style={styles.imageView}>
            <View style={styles.imageTextView}>
              <Text numberOfLines={1} style={styles.imageText}>
                {item.title}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
};
const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    width: 250,
    height: 350,
  },
  imageView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageTextView: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  imageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 12,
    objectFit: 'contain',
  },
});
export default StackCardItem;
