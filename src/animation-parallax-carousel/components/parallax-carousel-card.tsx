import {
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  View,
  Image,
} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const OFFSET = 45;
const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 2;
const ITEM_HEIGHT = 420;
type TProps = {
  scrollX: SharedValue<number>;
  id: number;
  total: number;
  item: any;
};
const ParallaxCarouselCard = ({item, scrollX, id, total}: TProps) => {
  const inputRange = [
    (id - 1) * ITEM_WIDTH,
    id * ITEM_WIDTH,
    (id + 1) * ITEM_WIDTH,
  ];
  const translateStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      scrollX.value,
      inputRange,
      [0.97, 0.97, 0.97],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.CLAMP,
    );
    return {transform: [{scale: translate}], opacity};
  });
  const translateImageStyle = useAnimatedStyle(() => {
    const translate = interpolate(scrollX.value, inputRange, [
      -ITEM_WIDTH * 0.2,
      0,
      ITEM_WIDTH * 0.4,
    ]);
    return {transform: [{translateX: translate}]};
  });
  const translateTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    return {opacity};
  });
  return (
    <Animated.View
      style={[
        {
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          marginLeft: id === 0 ? OFFSET : undefined,
          marginRight: id === total - 1 ? OFFSET : undefined,
          overflow: 'hidden',
          borderRadius: 14,
        },
        translateStyle,
      ]}>
      <Animated.View style={[translateImageStyle]}>
        <ImageBackground
          source={item.poster}
          style={style.imageBackgroundStyle}>
          <Animated.View
            style={[style.imageBackgroundView, translateTextStyle]}>
            <View style={style.userImageView}>
              <Image source={item.icon} style={style.userImage} />
              <View style={style.titleCardView}>
                <Text style={style.titleStyle}>{item?.title}</Text>
                <Text style={style.descriptionStyle}>{item?.description}</Text>
              </View>
            </View>
          </Animated.View>
        </ImageBackground>
      </Animated.View>
    </Animated.View>
  );
};

export default ParallaxCarouselCard;
const style = StyleSheet.create({
  imageBackgroundStyle: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 14,
    overflow: 'hidden',
  },
  imageBackgroundView: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    flex: 1,
    justifyContent: 'flex-end',
    gap: 4,
  },
  userImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userImage: {
    height: 30,
    width: 30,
  },
  titleCardView: {
    gap: 2,
  },
  titleStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  descriptionStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
});
