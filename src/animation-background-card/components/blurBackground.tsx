import {BlurMask, Canvas} from '@shopify/react-native-skia';
import React, {useEffect, useState} from 'react';
import BlurCircle from './blurCircle';
import {StyleSheet} from 'react-native';

type TProps = {
  numCircles: number;
};

const getRandomValue = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const generateRandomCircles = (numCircles: number) =>
  Array.from({length: numCircles}).map(() => ({
    cx: getRandomValue(0, 350),
    cy: getRandomValue(0, 300),
    r: getRandomValue(20, 150),
  }));

const BlurBackground = ({numCircles}: TProps): JSX.Element => {
  const [circles, setCircles] = useState(generateRandomCircles(numCircles));

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles(generateRandomCircles(numCircles));
    }, 6000);

    return () => clearInterval(interval);
  }, [numCircles]);

  return (
    <Canvas style={styles.canvasStyle}>
      <BlurMask blur={40} style="normal" />
      {circles.map((circle, index) => (
        <BlurCircle
          key={index}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          delay={index * 200}
        />
      ))}
    </Canvas>
  );
};

export default BlurBackground;

const styles = StyleSheet.create({
  canvasStyle: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  },
});
