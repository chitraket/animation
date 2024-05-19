import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Tag} from './components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
type TProps = {
  horizontalScrollData: Array<any>;
  verticalScrollData: Array<any>;
};
const AnimationTopTab = ({
  horizontalScrollData,
  verticalScrollData,
}: TProps) => {
  const [selectedItemIndex, setSelectedItem] = React.useState(0);
  const {width} = Dimensions.get('window');
  const horizontalScrollRef = React.useRef<FlatList>(null);
  const verticalScrollRef = React.useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const onItemPress = (id: number) => {
    if (verticalScrollRef?.current) {
      verticalScrollRef.current?.scrollToIndex({
        animated: true,
        index: id,
        viewPosition: 0,
      });
    }
    if (horizontalScrollRef?.current) {
      horizontalScrollRef.current.scrollToIndex({
        animated: true,
        index: id,
        viewPosition: 0.5,
      });
    }
    setSelectedItem(id);
  };
  return (
    <View style={{marginTop: Math.max(Number(insets?.top), 15), flex: 1}}>
      <FlatList
        ref={horizontalScrollRef}
        style={styles.flatListStyle}
        bounces={false}
        initialNumToRender={20}
        initialScrollIndex={selectedItemIndex}
        data={horizontalScrollData}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparatorStyle} />
        )}
        horizontal
        renderItem={({item, index}) => {
          return (
            <Tag
              onPress={() => onItemPress(index)}
              selected={index === selectedItemIndex}
              {...item}
            />
          );
        }}
      />
      <FlatList
        ref={verticalScrollRef}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        initialScrollIndex={selectedItemIndex}
        data={verticalScrollData}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginBottom: Math.max(Number(insets?.bottom), 15),
        }}
        onScrollToIndexFailed={() => {
          if (horizontalScrollRef?.current) {
            horizontalScrollRef.current.scrollToIndex({
              animated: true,
              index: 0,
              viewPosition: 0,
            });
          }

          if (verticalScrollRef?.current) {
            verticalScrollRef.current.scrollToIndex({
              animated: true,
              index: 0,
              viewPosition: 0,
            });
          }
        }}
        onMomentumScrollEnd={item => {
          const newIndex = Math.floor(item.nativeEvent.contentOffset.x / width);
          const currentIndex = newIndex > 0 ? newIndex : 0;
          if (horizontalScrollRef?.current) {
            horizontalScrollRef.current.scrollToIndex({
              animated: true,
              index: currentIndex,
              viewPosition: 0.5,
            });
          }
          setSelectedItem(currentIndex);
        }}
        renderItem={({item}) => <View style={{width}}>{item?.component}</View>}
      />
    </View>
  );
};

export default AnimationTopTab;

const styles = StyleSheet.create({
  flatListStyle: {flexGrow: 0},
  contentContainerStyle: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  itemSeparatorStyle: {
    marginRight: 10,
  },
});
