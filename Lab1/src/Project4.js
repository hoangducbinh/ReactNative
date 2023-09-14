import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";




const Project4 =()=>
{
    const [pressCount, setPressCount] = useState(0);

    return(
        <View style ={styles.container}>
            <Text>You have pressed the button : {pressCount} time(s)  </Text>
            <Button title={`Pressed ${pressCount} time(s)` }
            onPress={()=> setPressCount(pressCount + 1)} />
        </View>
    )
}


const styles = StyleSheet.create({

    container : {
        alignItems :"center",
        marginTop : 200,
    }
})

export default Project4;