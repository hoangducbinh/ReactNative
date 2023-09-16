import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";


const styles = StyleSheet.create({

    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },
})




const DetailsScreen =()=>
{
    return(
        <View style = {styles.container}>
            <Text>
                Details Screen
            </Text>

        </View>
    );
}


export default DetailsScreen;