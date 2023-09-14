import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const  Button =(props)=>
(
    <TouchableOpacity onPress={props.onPress}
    style ={{
        backgroundColor : "#ff637c",
        alignSelf : "center",
        padding : 10,
        margin : 10,
        marginTop : 50,
        ...props.buttonStyle,
    }}
    >
        <Text style = {{color :"#fff"}}>{props.text}</Text>
    </TouchableOpacity>
);
 



const Project3 =()=>
{
    return(
        <View>
            <Button text= "Say hello" onPress ={()=>alert("Hello")} />
            <Button text ="Say goobyte" onPress ={()=>alert("Goodbyte")}
            buttonStyle ={{backgroundColor : "blue"}}
             />

        </View>
    )
}


const style = StyleSheet.create({
    
    container : {
        flex : 1,
        justifyContent : "center",
    }

})


export default Project3;