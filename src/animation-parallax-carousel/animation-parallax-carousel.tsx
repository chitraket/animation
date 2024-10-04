import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import ParallaxCarouselCard from './components/parallax-carousel-card';
import {data} from './data';
import ParallaxCarouselPagination from './components/parallax-carousel-pagination';

const OFFSET = 45;
const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 2;

const AnimationParallaxCarousel = () => {
  const scrollX = useSharedValue(0);

  return (
    <View style={styles.parallaxCarouselView}>
      <Animated.ScrollView
        horizontal={true}
        decelerationRate={'fast'}
        snapToInterval={ITEM_WIDTH}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        disableIntervalMomentum
        onScroll={event => {
          scrollX.value = event.nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={12}>
        {data.map((item, id) => (
          <ParallaxCarouselCard
            key={id}
            item={item}
            id={id}
            scrollX={scrollX}
            total={data.length}
          />
        ))}
      </Animated.ScrollView>
      <ParallaxCarouselPagination data={data} scrollX={scrollX} />
    </View>
  );
};
export default AnimationParallaxCarousel;
const styles = StyleSheet.create({
  parallaxCarouselView: {
    paddingVertical: 50,
  },
});
