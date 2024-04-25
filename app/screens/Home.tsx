import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { SafeAreaView, Text ,Button, StyleSheet,Touchable, View} from "react-native";
import { isNewWebImplementationEnabled } from "react-native-gesture-handler/lib/typescript/EnableNewWebImplementation";
import { Product } from "./model/Products";
import { TouchableOpacity,FlatList } from "react-native-gesture-handler";

type RootStackParamList = {
    Home: undefined
};
type HomeScreenProps = StackNavigationProp<RootStackParamList,'Home'>;
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
    navigation: HomeScreenProps;
    route: HomeScreenRoute;
};

function Home({navigation}:HomeProps): React.JSX.Element{
    const[products, setProducts] = useState<Product[]>([]);
    const productItem = ({item} : {item:Product}) => (
        <TouchableOpacity style={style.productItem}>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={style.itemTitle}>{item.nombre}</Text>
                    <Text style={style.itemDetails}> precio: $ {item.precio.toFixed(2)}</Text>
                </View>
                <Text 
                style={[
                    style.itemBadge, 
                    item.currentStock < item.minStock ? style.itemBadgeError : null,
                    ]}>
                    {item.currentStock}
                    </Text>
            </View>
        </TouchableOpacity>
    );
    
    useEffect(() => {
        setProducts([
            {id:1, nombre: 'Martillo',precio:80,minStock: 5,currentStock:2,maxStock: 20},
        {id:2,nombre:'Manguera (metro)',precio:15,minStock:50,currentStock:200,maxStock:1000},
        ]);
    }, []);

  return (
    <SafeAreaView>
      <FlatList data={products} renderItem={productItem} keyExtractor={(item) => item.id.toString()} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
    productItem:{
        padding:12, 
       },
       
        itemTitle:{
            fontSize:20,
        },
        itemDetails:{
            fontSize:14,
            opacity:0.7,
        },
        itemBadge:{
            fontSize:24,
            color:'green',
            alignSelf:'center'
        },
        itemBadgeError:{
            fontSize:24,
            color:'red'
        }
});

export default Home;