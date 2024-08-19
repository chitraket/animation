import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LottiesView from './components/lottiesView';
import {animation} from './public';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {data} from './data';

const AnimationRefresh = () => {
  const scrollPosition = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const isLoaderActive = useSharedValue(false);

  const onRefresh = (done: () => void) => {
    setRefreshing(true);
    isLoaderActive.value = true;
    setTimeout(() => {
      setRefreshing(false);
      isLoaderActive.value = false;
      done();
    }, 5500);
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.itemCardView}>
        <Image source={item.image} style={styles.itemCardImage} />
        <Text style={styles.itemCardViewText}>{item.name}</Text>
      </View>
    );
  };
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });
  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 120 : 0, {
      duration: 180,
    });
    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;
      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, {duration: 180});
      };
      onRefresh(onRefreshComplete);
    }
  };
  const panResponderRef = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        scrollPosition.value <= 0 && gestureState.dy >= 0,
      onPanResponderMove: (event, gestureState) => {
        const maxDistance = 150;
        pullDownPosition.value = Math.max(
          Math.min(maxDistance, gestureState.dy),
          0,
        );
        if (
          pullDownPosition.value >= maxDistance / 2 &&
          isReadyToRefresh.value === false
        ) {
          isReadyToRefresh.value = true;
        }

        if (
          pullDownPosition.value < maxDistance / 2 &&
          isReadyToRefresh.value === true
        ) {
          isReadyToRefresh.value = false;
        }
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    }),
  );
  const pullDownStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: pullDownPosition.value,
        },
      ],
    };
  });

  const refreshContainerStyles = useAnimatedStyle(() => {
    return {
      height: pullDownPosition.value,
      opacity: 1,
      top: pullDownPosition.value - 177,
    };
  }, [refreshing]);
  return (
    <View style={styles.mainView} pointerEvents={refreshing ? 'none' : 'auto'}>
      <Animated.View style={[refreshContainerStyles, styles.loaderContainer]}>
        <LottiesView
          source={animation.loading}
          resizeMode="cover"
          animationStyle={styles.animationStyle}
        />
      </Animated.View>
      <Animated.View
        style={[
          pullDownStyles,
          styles.pullDownStyles,
          {
            paddingTop: Math.max(Number(insets?.top), 15),
          },
        ]}
        {...panResponderRef.current.panHandlers}>
        <Animated.FlatList
          data={data}
          renderItem={renderItem}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorStyle} />
          )}
        />
      </Animated.View>
    </View>
  );
};

export default AnimationRefresh;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#eafcfc',
  },

  loaderContainer: {
    alignItems: 'center',
    width: Dimensions.get('window').width,
    position: 'absolute',
  },
  animationStyle: {
    width: Dimensions.get('window').width,
    height: 180,
  },
  pullDownStyles: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  itemCardView: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemSeparatorStyle: {
    marginBottom: 10,
  },
  itemCardViewText: {
    fontSize: 20,
    fontWeight: '500',
  },
  itemCardImage: {
    height: 30,
    width: 30,
    marginRight: 8,
  },
});
