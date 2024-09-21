import {StyleSheet, View} from 'react-native';
import React from 'react';
import {data} from './data';
import StackCardItem from './components/stack-card-item';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const AnimationStackCard = () => {
  const [actualIndex, setActualIndex] = React.useState(data.length - 1);
  return (
    <GestureHandlerRootView style={styles.gestureHandlerView}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <StackCardItem
            actualIndex={actualIndex}
            item={item}
            key={index}
            index={index}
            setActualIndex={setActualIndex}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default AnimationStackCard;

const styles = StyleSheet.create({
  gestureHandlerView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
