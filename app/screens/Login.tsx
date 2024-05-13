import React, { useState } from "react";
import { StyleSheet, Text, View,Button, TextInput, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";



const styles = StyleSheet.create({
    screen:{
    height:'100%',
    backgroundColor:'#323844',
    justifyContent:'center',
    alignItems:'center',
    },
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#323436',
        width:'100%'
    },
    TextInput:{
        borderWidth:1,
        borderRadius:8,
        backgroundColor:'white',
        padding:8,
        paddingHorizontal :12,
        width:'80%',
        margin:8,
    }
});


type RootStackParamList = {
    Login: undefined
    Home:undefined
};

type LoginProps = {
    navigation:  StackNavigationProp<RootStackParamList,'Home'>;
};

function Login({navigation}:LoginProps): React.JSX.Element{
    const [usuario,setUsuario] = useState('');
    const [contrasena,setContrasena] = useState('');

    const btnIngresarOnPress = function(){
    if(usuario && contrasena){
        Alert.alert('Entraste', 'Iniciando Sesión...');
        navigation.navigate('Home');
        return
    }

    Alert.alert('Falló', 'Datos incorrectos');


    };
    return(
        <SafeAreaView style={styles.screen}> 
        <View style={styles.container}>
        <Text> Iniciar Sesión </Text>
        <TextInput style={styles.TextInput} 
        placeholder="Usuario" 
        placeholderTextColor="#12D2FA"
        onChangeText={u => setUsuario(u)}
        />

        <TextInput style={styles.TextInput} 
        placeholder="Contraseña" 
        secureTextEntry={true}
        placeholderTextColor="#1952E6"
        onChangeText={p=> setContrasena(p)}
        />

        <Button title="Ingresar" onPress={btnIngresarOnPress}></Button>

        </View>
        </SafeAreaView>
    );
}
export default Login;