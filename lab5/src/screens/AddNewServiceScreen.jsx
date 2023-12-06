import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { IconButton, Text } from 'react-native-paper';

const AddNewService = ({navigation}) => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');

  const addNewService = async () => {
    try {
      // Check if both fields are filled
      if (!serviceName || !price) {
        Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin dịch vụ và giá.');
        return;
      }

      // Add data to Firestore
      await firestore().collection('services').add({
        serviceName: serviceName,
        price: price,
      });

      // Display success message
      //Alert.alert('Thông báo', 'Dịch vụ đã được thêm thành công.');
      Alert.alert('Thông báo', 'Dịch vụ đã được thêm thành công.', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);



      // Navigate to another screen if needed
    } catch (error) {
      console.error('Error adding service: ', error);
      // Handle error, show an alert, or log the error
    }
  };

  return (
    

    <View style={{ flex: 1 }}>
    {/* Header with Back Button and Settings Icon */}
    <View style={{ backgroundColor: 'violet', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <IconButton
        icon="arrow-left"
        color="#000"
        size={24}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      />
        
        <Text style={{fontWeight : "bold",color:"white",fontSize: 16}}>
        NewService
        </Text>
        <IconButton
          icon="cog"
          color="#000"
          size={24}
          // Directly invoke handleDelete when settings icon is pressed
        />
      </View>
      <TextInput
      style={styles.input}
        placeholder="Tên dịch vụ"
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <TextInput
      style={styles.input}
        placeholder="Giá"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <Button title="add NewService" onPress={addNewService} />
    </View>
  );
};

export default AddNewService;


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