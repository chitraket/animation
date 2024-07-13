import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
type TPops = {
  onPress: () => void;
  text: string;
  textStyle: object;
};
const CounterButton = ({onPress, text, textStyle}: TPops) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Animated.Text style={[styles.buttonText, textStyle]}>
        {text}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default CounterButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'grey',
  },
});
