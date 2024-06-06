//Home.tsx se encuentra en app/screens/Home.tsx
/* eslint-disable prettier/prettier */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Product } from '../model/Products';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../App';
import LocalDB from '../persistance/localdb';
import { useFocusEffect } from "@react-navigation/native";

type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

function Home({ navigation }: HomeProps): React.JSX.Element {

  const [products, setProducts] = useState<Product[]>([]);
  const fetchData = async () => {
    try {
      LocalDB.init();
      const db = await LocalDB.connect();
      db.transaction(async tx => {
        tx.executeSql(
          'SELECT * FROM productos',
          [],
          (_,res) => {
            let prods: Product[] = [];
            for(let i = 0; i < res.rows.length; i++){
              prods.push(res.rows.item(i) as Product);
            }
            setProducts(prods);
          },
          error => console.error({error}),
        );
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const productItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.push('ProductDetails', { product: item })}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column', flexGrow: 9 }}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
        </View>
        <Text style={styles.itemDetails}>Precio: ${item.precio.toString(10)}</Text>
      </View>
      <Text
        style={[styles.itemBadge, item.currentStock < item.minStock ? styles.itemBadgeError : null
        ]}>
        {item.currentStock}
      </Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView>
      <FlatList data={products} renderItem={productItem} keyExtractor={(item) => item.id.toString()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemBadge: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'flex-end',
  },
  itemBadgeError: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  productItem: {
    padding: 12,
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  itemTitle: {
    fontSize: 24,
    color: '#000',
    textTransform: 'uppercase',
  },
  itemDetails: {
    fontSize: 14,
    opacity: 0.7,
    color: '#000',
  },
});

export default Home;
