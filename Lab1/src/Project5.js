import React from "react";
import { StyleSheet, Text, View } from "react-native";


const styles = StyleSheet.create({

    container :{
        flex :1,
        alignItems : "center",
        flexDirection : "row",
        justifyContent : "space-around",
    },
    box :{
        width: 100,
        height : 100,
        justifyContent : "center",
        alignItems : "center",

    }
});

const Square = ({text,bgClor = "#7ce0f9"})=>
(
    <View style ={[styles.box,{backgroundColor :bgClor}]} >
        <Text>{text}</Text>
    </View>
    
);



const Project5 =()=>
{
    return(
        <View style ={styles.container}>
        <Square text = "Square 1" />
        <Square text = "Square 2" bgClor="violet"/>
        <Square text = "Square 3" bgClor="red" />
       
        </View>
    )
}

export default Project5; 