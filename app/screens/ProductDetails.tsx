import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";


export type Props = {
  route: RouteProp<RootStackParamList, 'ProductDetails'>;
  navigation: StackNavigationProp<RootStackParamList, 'ProductDetails'>;
};

const ProductDetails: React.FC<Props> = ({ route }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProduct(route.params.product);
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <View style={styles.productContainer}>
            
          <Text style={styles.title}>{product.nombre}</Text>

          <View style={styles.infoContainer}>

            <Text style={styles.infoLabel}>Stock:</Text>
            <Text style={[styles.higher,
                product.currentStock < product.minStock ? styles.Lower : null,]}>{product.currentStock}</Text>

          </View>

          <View style={styles.infoContainer}>

            <Text style={styles.infoLabel}>Stock minimo:</Text>
            <Text style={styles.infoText}>{product.minStock}</Text>
            
          </View>

          <View style={styles.infoContainer}>

            <Text style={styles.infoLabel}>Precio:</Text>
            <Text style={styles.infoText}>{product.precio}</Text>

          </View>

        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  infoText: {
    flex: 1,
  },
  higher:{
    color:'green',
  },
  Lower:{
    color:'red'
  }

});

export default ProductDetails;
