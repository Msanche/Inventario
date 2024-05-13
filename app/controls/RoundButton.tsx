import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import React from "react";

type Prop = {
    title: string; 
}


const RoundButton = (): React.JSX.Element => (
    <TouchableOpacity>
        <Text>{}</Text>
    </TouchableOpacity>
);

const style = StyleSheet.create({
    button: {
        
    }
})

export default RoundButton;