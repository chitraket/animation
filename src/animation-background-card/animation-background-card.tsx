import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BlurCard from './components/blurCard';
import images from './images';

const AnimationBackgroundCard = () => {
  return (
    <BlurCard style={styles.blurBoxStyle}>
      <View style={styles.cardStyle}>
        <View style={styles.cardViewStyle}>
          <Text style={styles.cardBankStyle}>Bank of Designers</Text>
          <Image source={images.group} style={styles.cardImage} />
        </View>
        <View>
          <Image source={images.chip} style={styles.clipImage} />
        </View>
        <View style={styles.cardImageCard}>
          <Text style={styles.cardNumber}>{'1234 5678 9101 1111'}</Text>
          <Text style={styles.cardName}>{"Fly Coder's"}</Text>
        </View>
      </View>
    </BlurCard>
  );
};

export default AnimationBackgroundCard;

const styles = StyleSheet.create({
  blurBoxStyle: {
    height: 230,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#9095A7',
    overflow: 'hidden',
  },
  cardBankStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  cardStyle: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },
  cardName: {
    fontSize: 16,
    color: 'white',
  },
  cardImage: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  clipImage: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  cardImageCard: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: 4,
  },
});
