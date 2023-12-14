import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { IconButton, Text } from 'react-native-paper';

const AddNewService = ({ navigation }) => {
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
      Alert.alert('Thông báo', 'Dịch vụ đã được thêm thành công.', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error) {
      console.error('Error adding service: ', error);
      // Handle error, show an alert, or log the error
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Settings Icon */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          color="#fff"
          size={24}
          onPress={() => navigation.goBack()} // Go back to the previous screen
        />
        <Text style={styles.headerText}>New Service</Text>
        <IconButton
          icon="cog"
          color="#fff"
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
      <Button title="Add New Service" onPress={addNewService} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: 'violet',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  input: {
    borderColor: 'violet',
    borderWidth: 1,
    height: 50,
    padding: 15,
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'violet',
    color: '#fff',
  },
});

export default AddNewService;
