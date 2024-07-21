import React, {useRef, useState} from 'react';
import {
  AnimatedProp,
  Canvas,
  Group,
  Image,
  Mask,
  Path,
  Rect,
  SkImage,
  Skia,
} from '@shopify/react-native-skia';
import {StyleProp, View, ViewStyle, StyleSheet} from 'react-native';

type Props = {
  style: StyleProp<ViewStyle>;
  image: AnimatedProp<SkImage | null>;
  children?: React.ReactNode;
};

export const ScratchCard: React.FC<Props> = ({style, children, image}) => {
  const [[width, height], setSize] = useState([0, 0]);
  const [isScratched, setScratched] = useState(false);
  const [isMove, setMove] = useState(false);
  const path = useRef(Skia.Path.Make());

  const handleTouchEnd = () => {
    if (isMove) {
      setScratched(true);
    }
  };
  return (
    <View
      onLayout={e => {
        setSize([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
      }}
      style={[styles.container, style]}>
      {Boolean(image && width && height) && (
        <>
          {isMove && <View style={styles.content}>{children}</View>}
          <Canvas
            style={styles.canvas}
            onTouchStart={({nativeEvent}) => {
              path.current.moveTo(nativeEvent.locationX, nativeEvent.locationY);
            }}
            onTouchMove={({nativeEvent}) => {
              setMove(true);
              path.current.lineTo(nativeEvent.locationX, nativeEvent.locationY);
            }}
            onTouchEnd={handleTouchEnd}>
            <Mask
              mode="luminance"
              mask={
                <Group>
                  <Rect x={0} y={0} width={1000} height={1000} color="white" />
                  <Path
                    path={path.current}
                    color="black"
                    style="stroke"
                    strokeJoin="round"
                    strokeCap="round"
                    strokeWidth={50}
                  />
                </Group>
              }>
              {!isScratched && (
                <Image
                  image={image}
                  fit="cover"
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                />
              )}
            </Mask>
          </Canvas>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 300,
    height: 300,
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
