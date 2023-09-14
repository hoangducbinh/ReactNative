import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const Project1 =()=>
{
    return(
        <View style = {styles.boxStyle}>
            <Text style = {styles.textStyle}>
                Hello world
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    
    boxStyle : {
        width : 100,
        height : 100,
        backgroundColor : "#00FFFF",
        marginTop : 40,
    },
    textStyle : {
        fontSize : 18,
        color : "violet",
        fontWeight : "bold"
    },

})



export default Project1;