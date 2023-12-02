import React from "react"
import {  Alert, Image, StyleSheet, Text, TextInput, View } from "react-native"
import Button from "../components/Button";



const LoginScreen =() =>
{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');

    const handlePress = () =>
    {
        Alert.alert('lol')
    }

    return (
        <View style ={styles.container}>
            <Text style = {styles.logintitle}>
                Login
            </Text>

            <View style ={ styles.inputStyle}>
            <TextInput style ={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Vui lòng nhập Email của bạn"
            />
            <TextInput style ={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Hãy nhập mật khẩu của bạn"
            />
            </View>

            <Button onPress={handlePress} title="Đăng nhập"/>

            <Image 
                style={styles.imageStyle}
                source={require('../images/heart.png')} />


        </View>
    )
}
const styles = StyleSheet.create({

    container : {
        flex : 1,
        marginTop : 40,
        padding : 12
    },
    logintitle : {
        fontSize : 40,
        fontWeight : 'bold',
        color : 'violet',
        justifyContent : 'center',
        textAlign : 'center',
        
    },
    input : {
        borderColor : 'violet',
        borderWidth : 1,
        height : 50,
        padding : 15,
        borderRadius: 10,
        margin : 10
    },
    inputStyle : {
        marginTop : 40,
    },
    
    imageStyle :{
       height :200,
       width : 300,
       padding : 40,
       marginTop : 80,
       marginLeft : 50
    }
})



export default LoginScreen;