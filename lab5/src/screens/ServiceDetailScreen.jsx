import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ServiceDetail = ({ route, navigation }) => {
  const { serviceName, price, creator, time, final, serviceId } = route.params;

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
            style: 'destructive',
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
    <View style={styles.container}>
      {/* Header with Back Button and Settings Icon */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          color="#fff"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Service Detail</Text>
        <IconButton
          icon="cog"
          color="#fff"
          size={24}
          onPress={handleDelete}
        />
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Service Name: {serviceName}</Text>
        <Text style={styles.detailText}>Price: {price}</Text>
        <Text style={styles.detailText}>Creator: {creator}</Text>
        <Text style={styles.detailText}>Time: {time}</Text>
        <Text style={styles.detailText}>Final: {final}</Text>

        {/* Action Buttons
        <Button
          mode="contained"
          style={styles.updateButton}
          onPress={updateService}
        >
          Update Service
        </Button> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
  detailsContainer: {
    padding: 16,
  },
  detailText: {
    marginBottom: 8,
    fontSize: 16,
  },
  updateButton: {
    marginTop: 16,
    backgroundColor: 'violet',
  },
});

export default ServiceDetail;
