import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// Define the Product type
type Product = {
  nombre: string;
  currentStock: number;
  minStock: number;
  precio: number;
};

type RootStackParamList = {
  detail: { product: Product };
  entry: undefined;
  exits: undefined;
};


export type Props = {
  route: RouteProp<RootStackParamList, 'detail'>;
  navigation: StackNavigationProp<RootStackParamList, 'detail'>;
};

const ProductDetails: React.FC<Props> = ({ route, navigation }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProduct(route.params.product);
  }, [route]);

  const btnIngresarOnPress = () => {
    navigation.navigate('EntradasScreen',{ product });
  };

  const btnSalidas = () => {
    navigation.navigate('SalidasScreen',{ product });
  };

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <View style={styles.productContainer}>
          <Text style={styles.title}>{product.nombre}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Stock:</Text>
            <Text
              style={[
                styles.infoText,
                product.currentStock < product.minStock ? styles.lower : styles.higher,
              ]}
            >
              {product.currentStock}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Stock minimo:</Text>
            <Text style={styles.infoText}>{product.minStock}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Precio:</Text>
            <Text style={styles.infoText}>{product.precio}</Text>
          </View>

          <TouchableOpacity onPress={btnIngresarOnPress} style={styles.button}>
            <Text style={styles.buttonText}>Entrada de producto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={btnSalidas} style={styles.button}>
            <Text style={styles.buttonText}>Salida de producto</Text>
          </TouchableOpacity>
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
  higher: {
    color: 'green',
  },
  lower: {
    color: 'red',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductDetails;
