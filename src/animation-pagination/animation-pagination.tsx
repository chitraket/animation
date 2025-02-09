import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ScrollView, View, ViewStyle, StyleProp, StyleSheet} from 'react-native';
import {usePrevious} from './hook';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Dot, EmptyDot} from './components';

type TProps = {
  curPage: number;
  maxPage: number;
  sizeRatio?: number;
  activeDotColor?: string;
  inactiveDotColor?: string;
  vertical?: boolean;
  setCurPage: (page: any) => void;
};

const AnimationPagination = (props: TProps) => {
  const {
    curPage,
    maxPage,
    activeDotColor = '#0097FB',
    inactiveDotColor = 'grey',
    vertical,
    setCurPage,
  } = props;
  const refScrollView = useRef<ScrollView>(null);
  const prevPage = usePrevious(curPage);
  const isGestureActive = useSharedValue(0);
  const startX = useSharedValue(0);
  const currentXDistance = useSharedValue(0);
  const startingPosition = useSharedValue(0);
  const defaultEmptyDotSize = 3;
  const oneEmptyDotSize = defaultEmptyDotSize * defaultEmptyDotSize;

  const handleManualScroll = (scrollOffset: number) => {
    scrollTo(scrollOffset, false);
  };

  const indexState = useSharedValue(0);

  const getSizeRatio = useCallback<() => number>(() => {
    if (!props.sizeRatio) return 1.0;

    return Math.max(1.0, props.sizeRatio);
  }, [props.sizeRatio]);

  const scrollTo = useCallback<(index: number, animated?: boolean) => void>(
    (index, animated = true) => {
      if (!refScrollView.current) return;

      const sizeRatio = getSizeRatio();
      const firstEmptyDotSpace = oneEmptyDotSize * 2;
      const moveDistance = oneEmptyDotSize * sizeRatio;

      const moveTo = Math.max(
        0,
        firstEmptyDotSpace + (index - 4) * moveDistance,
      );

      if (vertical) {
        refScrollView.current.scrollTo({
          x: 0,
          y: moveTo,
          animated,
        });
        return;
      }

      refScrollView.current.scrollTo({
        x: moveTo,
        y: 0,
        animated,
      });
    },
    [getSizeRatio, oneEmptyDotSize, vertical],
  );

  const getContainerStyle = useCallback<() => StyleProp<ViewStyle>>(() => {
    const sizeRatio = getSizeRatio();
    const containerSize = 84 * sizeRatio;

    return {
      alignItems: 'center',
      flexDirection: vertical ? 'column' : 'row',
      maxHeight: vertical ? containerSize : undefined,
      maxWidth: vertical ? undefined : containerSize,
    };
  }, [getSizeRatio, vertical]);

  useEffect(() => {
    if (maxPage > 4 && prevPage !== curPage) scrollTo(curPage);
  }, [prevPage, curPage, maxPage, scrollTo]);

  const list = useMemo(() => [...Array(maxPage).keys()], [maxPage]);

  let normalizedPage = curPage;
  if (curPage < 0) {
    normalizedPage = 0;
  }

  if (curPage > maxPage - 1) {
    normalizedPage = maxPage - 1;
  }
  const sizeRatio = getSizeRatio();

  const container = getContainerStyle();

  const minX = -50;
  const maxX = 150;
  const panGesture = Gesture.Pan()
    .activateAfterLongPress(350)
    .onStart(evt => {
      isGestureActive.value = withSpring(1);
      startX.value = evt.x;
    })
    .onChange(evt => {
      const {x} = evt;
      if (x >= minX && x <= maxX) {
        currentXDistance.value = x;
        const interpolatedValue = interpolate(
          currentXDistance.value,
          [minX, startX.value, maxX],
          [0, startingPosition.value, maxPage - 1],
        );
        const computedValue = Math.round(interpolatedValue);
        indexState.value = computedValue;
        runOnJS(setCurPage)(computedValue);
        runOnJS(handleManualScroll)(computedValue);
      }
    })
    .onEnd(() => {
      startingPosition.value = indexState.value;
    })
    .onFinalize(() => {
      isGestureActive.value = withSpring(0);
    });

  const gestureActiveStyle = useAnimatedStyle(() => {
    return {
      padding: 4,
      borderRadius: 16,
      backgroundColor: interpolateColor(
        isGestureActive.value,
        [0, 1],
        ['transparent', '#f1f1f1'],
      ),
    };
  });

  if (maxPage < 5) {
    return (
      <View style={container}>
        {list.map(i => {
          return (
            <Dot
              key={i}
              idx={i}
              sizeRatio={sizeRatio}
              curPage={normalizedPage}
              maxPage={maxPage}
              activeColor={activeDotColor}
              inactiveColor={inactiveDotColor}
            />
          );
        })}
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[gestureActiveStyle]}>
          <View
            style={container}
            onLayout={() => {
              scrollTo(props.curPage, false);
            }}>
            <ScrollView
              ref={refScrollView}
              contentContainerStyle={styles.scrollViewContainer}
              bounces={false}
              horizontal={!props.vertical}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <EmptyDot
                sizeRatio={sizeRatio}
                defaultEmptyDotSize={defaultEmptyDotSize}
              />
              <EmptyDot
                sizeRatio={sizeRatio}
                defaultEmptyDotSize={defaultEmptyDotSize}
              />

              {list?.map(i => {
                return (
                  <Dot
                    sizeRatio={sizeRatio}
                    key={i}
                    idx={i}
                    curPage={normalizedPage}
                    maxPage={maxPage}
                    activeColor={activeDotColor}
                    inactiveColor={inactiveDotColor}
                  />
                );
              })}

              <EmptyDot
                sizeRatio={sizeRatio}
                defaultEmptyDotSize={defaultEmptyDotSize}
              />
              <EmptyDot
                sizeRatio={sizeRatio}
                defaultEmptyDotSize={defaultEmptyDotSize}
              />
            </ScrollView>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default AnimationPagination;

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
  },
  gestureHandlerRootView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
