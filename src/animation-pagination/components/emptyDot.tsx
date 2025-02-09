import React from 'react';
import {StyleSheet, View} from 'react-native';

type TProps = {
  sizeRatio: number;
  defaultEmptyDotSize?: number;
};
const EmptyDot = ({sizeRatio, defaultEmptyDotSize = 3}: TProps) => {
  return (
    <View
      style={[
        styles.base,
        {
          width: defaultEmptyDotSize * sizeRatio,
          height: defaultEmptyDotSize * sizeRatio,
          margin: defaultEmptyDotSize * sizeRatio,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'white',
    opacity: 0.0,
  },
});

export default EmptyDot;
