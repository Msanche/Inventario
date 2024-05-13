import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LocalDB from "../persistance/localdb";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

export default function ProductAdd(): React.JSX.Element{

        
        const navigation = useNavigation<NavigationProp<RootStackParamList>>();
        const [nombre, setNombre] = useState<string>('');
        const [precio, setPrecio] = useState<string>('0');
        const [minStock, setMinStock] = useState<string>('0');

        const btnGuardarOnPress = async () => {
                const db = await LocalDB.connect();
                db.transaction(tx => {
                        tx.executeSql(
                        'INSERT INTO productos (nombre, precio, minStock) VALUES (?,?,?)',
                        [nombre, precio, minStock],
                );
                navigation.goBack();
                })
        };

        return (
                <SafeAreaView>
                        <Text style={styles.texto}> Nombre </Text>
                        <TextInput onChangeText={t=> setNombre(t)} style={styles.texto}/>
                        <Text style={styles.texto}>Precios</Text>
                        <TextInput onChangeText={t=> setPrecio(t)} style={styles.texto}/>
                        <Text style={styles.texto}>Min. Stock</Text>
                        <TextInput onChangeText={t=> setMinStock(t)} style={styles.texto}/>
                        <Button title="Guardar" onPress={btnGuardarOnPress}/>

                </SafeAreaView>
        )
     
}

const styles = StyleSheet.create({

        texto:{
                color:'black'
        },
})   