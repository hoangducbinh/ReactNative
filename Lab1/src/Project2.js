import React from "react";
import {Button, StyleSheet, TouchableOpacity, View } from "react-native";
import {  Text } from "react-native-paper";

const Project2 =()=>
{
    return(
        <View style = {styles.container}>
            <Button style ={styles.text} title="Button1" onPress={() => alert("Hello")} />

            <TouchableOpacity style ={styles.button} onPress={()=> alert("Hello2")} >
                 <Text style = {styles.text}>
                    Button2
                 </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
    },
    button : {
        backgroundColor : "#800080",
        marginTop : 10,
        alignItems : "center",
        padding : 10,

    },
    text : {
        color :"white",
        fontSize : 18,

    }
})

export default Project2;