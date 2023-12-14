import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const EditServiceScreen = ({ route, navigation }) => {
  const { serviceId, serviceName: initialServiceName, price: initialPrice } = route.params;
  const [serviceName, setServiceName] = useState(initialServiceName);
  const [price, setPrice] = useState(initialPrice);

  const updateService = async () => {
    try {
      await firestore().collection('services').doc(serviceId).update({
        serviceName: serviceName,
        price: price,
      });

      // Navigate back to the Home screen or any other screen you prefer
      navigation.goBack();
    } catch (error) {
      console.error('Error updating service: ', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        backgroundColor: 'violet',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
      }}>
        <Text style={{fontWeight : "bold",color:"white",fontSize: 16}}>Edit Service</Text>
      </View>
     
      <TextInput style={styles.input}
        placeholder="Service Name"
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <Button title="Update Service" onPress={updateService} />
    </View>
  );
};

export default EditServiceScreen;



const styles=StyleSheet.create({
  input: {
    borderColor: "violet",
    borderWidth: 1,
    height: 50,
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  inputStyle: {
    marginTop: 40,
  },
  imageStyle: {
    height: 200,
    width: 300,
    padding: 40,
    marginTop: 80,
    marginLeft: 50,
  },
})