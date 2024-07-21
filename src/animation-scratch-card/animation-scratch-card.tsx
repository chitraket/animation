import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScratchCard} from './components/scratch-card';
import {useImage} from '@shopify/react-native-skia';

const AnimationScratchCard = () => {
  const image = useImage(require('./public/scratch_foreground.png'));

  if (!image) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <View>
      <ScratchCard style={styles.scratchCard} image={image}>
        <View style={styles.card}>
          <Image
            source={require('./public/gift-box.png')}
            style={styles.imageCard}
          />
          <Text style={styles.titleText}>Cashback</Text>
          <Text style={styles.subTitleText}>$10</Text>
        </View>
      </ScratchCard>
    </View>
  );
};

export default AnimationScratchCard;

const styles = StyleSheet.create({
  scratchCard: {
    borderRadius: 16,
  },
  loading: {
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imageCard: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 6,
  },
  subTitleText: {
    fontSize: 40,
    color: 'black',
    fontWeight: '700',
  },
});
