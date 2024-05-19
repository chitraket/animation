import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
type TProps = {
  data: Array<TItemProps>;
};
type TItemProps = {
  name: string;
  id: number;
  image?: number;
};
const SectionList = ({data}: TProps) => {
  const renderItem = (item: TItemProps) => {
    return (
      <View style={styles.itemCardView}>
        {item?.image && <Image source={item.image} style={styles.image} />}
        <Text>{item?.name}</Text>
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={styles.itemSeparatorStyle} />}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => renderItem(item)}
    />
  );
};

export default SectionList;

const styles = StyleSheet.create({
  itemSeparatorStyle: {
    marginBottom: 10,
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
  itemCardView: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
});
