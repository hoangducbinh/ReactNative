import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'


const styles =StyleSheet.create({
  textinput :{

    backgroundColor: 'gray',
    color :'black',
    fontSize : 18,
  },
  button :{
    alignItems :'center',
    backgroundColor :'blue',
    padding : 10,
    margin : 10,
  }
})


const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoangding] = useState(false);
  
  


  return (
    <View>
      <Text>login</Text>

      <TextInput 
        placeholder='enter email'
        onChangeText={(e)=> setEmail(e)}
        style={[styles.textinput]}
      />

<TextInput 
        placeholder='enter password'
        onChangeText={(e)=> setPassword(e)}
        style={[styles.textinput]}
      />


      <TouchableOpacity>
        <View style={styles.button}>
          <Text>
            Login
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
 
export default Login;