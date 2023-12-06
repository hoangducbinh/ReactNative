import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'; // Import Firestore from @react-native-firebase

const ServiceDetail = ({ route, navigation }) => {
  const { serviceName, price, creator, time, final, serviceId } = route.params;

  const handleUpdate = () => {
    // Navigate to the screen where you handle the service update
    // You can replace 'EditService' with the actual screen name for updating
    navigation.navigate('EditService', {
      // Pass the necessary parameters if needed
    });
  };

  const handleDelete = async () => {
    try {
      // Confirm deletion with the user
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this service?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              // Perform deletion in Firestore
              await firestore().collection('services').doc(serviceId).delete();

              // Navigate back or to another screen after deletion
              navigation.goBack();
            },
            style: 'destructive', // Red color to indicate a destructive action
          },
        ],
      );
    } catch (error) {
      console.error('Error deleting service: ', error);
      // Handle error, show an alert, or log the error
    }
  };




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
      {/* Header with Back Button and Settings Icon */}
      <View style={{ backgroundColor: 'violet', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton
          icon="arrow-left"
          color="#000"
          size={24}
          onPress={() => navigation.goBack()} // Go back to the previous screen
        />
        <Text>Service Detail</Text>
        <IconButton
          icon="cog"
          color="#000"
          size={24}
          onPress={handleDelete} // Directly invoke handleDelete when settings icon is pressed
        />
      </View>

      {/* Details */}
      <View style={{ padding: 16 ,}}>
        <Text>Service Name: {serviceName}</Text>
        <Text>Price: {price}</Text>
        <Text>Creator: {creator}</Text>
        <Text>Time: {time}</Text>
        <Text>Final: {final}</Text>

        
        <Button title="Update Service" onPress={updateService} />
        {/* Action Buttons */}
        {/* <TouchableOpacity onPress={handleUpdate}>
          <Button>Update Service</Button>
        </TouchableOpacity> */}
        {/* Add more details or buttons as needed */}
      </View>
    </View>
  );
};


export default ServiceDetail;
