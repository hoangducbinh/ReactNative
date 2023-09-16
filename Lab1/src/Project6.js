import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";


const styles = StyleSheet.create({

    container :{
        backgroundColor :"#fff"
        
    },
    box : {
        justifyContent :"center",
        alignItems : "center",
        margin : 20,
        width : 100,
        height : 100,
    },
});


const Square = ({
    text ,bgColor ="#7ce0f9"
}) => (
        <View style ={[styles.box ,{backgroundColor:bgColor}]}>
            <Text>
                {text}
            </Text>
        </View>
);


const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

const Project6=()=>
{
    return(
        <ScrollView style ={styles.container}>
            {data.map((item,index) => (
                <Square key={item} text={`Square ${index +1}`} />
            ))}
        </ScrollView>
    )
}

export default Project6;