import {
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

type TProps = {
  onPress: () => void;
  image: ImageURISource;
  name: string;
  selected: boolean;
};

const Tag = ({onPress, image, name, selected}: TProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        borderColor: selected ? 'red' : 'grey',
        backgroundColor: selected ? 'red' : 'transparent',
      }}
      onPress={onPress}>
      {image && <Image source={image} style={styles.image} />}
      <Text
        style={{
          color: selected ? 'white' : 'black',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
});
