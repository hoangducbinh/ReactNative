import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Alert, Modal, TouchableOpacity, Image } from 'react-native';
import { IconButton, List, Text, Searchbar, TextInput, Button } from 'react-native-paper';
import { useMyContextController } from '../context';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'; // Import storage module
import *as ImagePicker from 'react-native-image-picker';

const HomeScreen = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const [serviceList, setServiceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  const fetchData = async () => {
    try {
      const servicesSnapshot = await firestore().collection('services').get();
      const servicesData = servicesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServiceList(servicesData);
    } catch (error) {
      console.error('Error fetching services: ', error);
    }
  };

  useEffect(() => {
    if (userLogin == null) {
      fetchData();
      navigation.navigate('Login');
    } else {
      fetchData();
    }
  }, [userLogin, navigation]);

  const navigateToEditService = (service) => {
    navigation.navigate('EditService', {
      serviceId: service.id,
      serviceName: service.serviceName,
      price: service.price,
    });
  };

  const navigateToServiceDetail = (service) => {
    navigation.navigate('ServiceDetail', {
      serviceName: service.serviceName,
      price: service.price,
      creator: service.creator,
      time: service.time,
      final: service.final,
    });
  };

  const handleDeleteService = (service) => {
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc muốn xoá dịch vụ "${service.serviceName}" không?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xoá',
          onPress: async () => {
            try {
              await firestore().collection('services').doc(service.id).delete();
              fetchData();
            } catch (error) {
              console.error('Error deleting service: ', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const [selectedImage, setSelectedImage] = useState(null);



  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({ title: 'Chọn ảnh', storageOptions: { skipBackup: true, path: 'images' } }, (response) => {
      if (!response.didCancel) {
        if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          // Set the selected image URI
          console.log('Selected Image URI:', response.assets[0].uri);
          setSelectedImage(response.assets[0].uri);
        }
      } else {
        console.log('User cancelled image picker');
      }
    });
  };
  
  


  const handleAddService = async () => {
    try {
      // Perform input validation here if needed
      if (!newServiceName.trim() || !newServicePrice.trim()) {
        Alert.alert('Thông báo', 'Vui lòng nhập tên và giá dịch vụ.');
        return;
      }

      let imageUrl = '';

      // Upload the image to Firebase Storage (if an image is selected)
      if (selectedImage) {
        const imageName = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
        const imageRef = storage().ref(`/serviceImages/${imageName}`);
        await imageRef.putFile(selectedImage);
        imageUrl = await imageRef.getDownloadURL();
      }

      // Add the new service to Firestore
      await firestore().collection('services').add({
        serviceName: newServiceName.trim(),
        price: newServicePrice.trim(),
        imageUrl: imageUrl,
        // Add more fields as needed
      });

      // Close the modal, clear the input fields, and reset the selected image
      setModalVisible(false);
      setNewServiceName('');
      setNewServicePrice('');
      setSelectedImage(null);

      // Refresh the data
      fetchData();
    } catch (error) {
      console.error('Error adding service: ', error);
    }
  };


  const filteredServiceList = serviceList.filter((item) =>
    item.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {userLogin != null && `Xin chào ${userLogin.name.toUpperCase()}`}
        </Text>
        <IconButton icon="account-circle" size={40} iconColor="white" onPress={() => navigation.navigate('Logout')} />
      </View>

      <Searchbar
        placeholder="Tìm kiếm..."
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.contentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Danh Sách Dịch Vụ</Text>
          <IconButton
            icon="plus-circle"
            size={40}
            iconColor="white"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <FlatList
          data={filteredServiceList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.serviceName}
              description={`Giá: ${item.price} VNĐ`}
              onPress={() => navigateToServiceDetail(item)}
              style={styles.listItem}
              titleStyle={styles.listItemTitle}
              descriptionStyle={styles.listItemDescription}
              left={(props) => <List.Icon {...props} icon="clipboard-text" color="purple" />}
              right={() => (
                <View style={styles.iconContainer}>
                  <IconButton
                    icon="pencil"
                    color="blue"
                    size={24}
                    onPress={() => navigateToEditService(item)}
                  />
                  <IconButton
                    icon="delete"
                    color="red"
                    size={24}
                    onPress={() => handleDeleteService(item)}
                  />
                </View>
              )}
            />
          )}
        />
      </View>

      {/* Add Service Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm Dịch Vụ</Text>

            {/* Image Picker */}
            <TouchableOpacity onPress={handleImagePicker}>
              <View style={styles.imageContainer}>
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                ) : (
                  <Text style={styles.imagePlaceholder}>Chọn ảnh</Text>
                )}
              </View>
            </TouchableOpacity>


            <TextInput
              label="Tên Dịch Vụ"
              value={newServiceName}
              onChangeText={(text) => setNewServiceName(text)}
              style={styles.input}
            />
            <TextInput
              label="Giá"
              value={newServicePrice}
              onChangeText={(text) => setNewServicePrice(text)}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button mode="contained" onPress={handleAddService} style={styles.addButton}>
              Thêm Dịch Vụ
            </Button>
            <Button mode="outlined" onPress={() => { setModalVisible(false); setNewServiceName(''); setNewServicePrice(''); setSelectedImage(null); }}>
              Hủy
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'purple',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  sectionHeader: {
    height: 50,
    backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  listItem: {
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
  },
  listItemDescription: {
    fontSize: 14,
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    width: 350,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  addButton: {
    marginBottom: 8,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    marginBottom: 16,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: 'gray',
  },
});

export default HomeScreen;
