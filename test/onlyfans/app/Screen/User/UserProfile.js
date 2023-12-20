import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, LogBox, FlatList, Modal, TextInput } from 'react-native';
import { Avatar, Icon, Header, ListItem } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../Component/Constant/Color';
import {  removeUser, setUser } from '../../Redux/reducer/user';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/app';
import Navigation from '../../Service/Navigation';
import Auth from '../../Service/Auth'; 
import SimpleToast from 'react-native-simple-toast';
import AuthStack from '../../Navigation/AuthStack';


const UserProfile = () => {
  const dispatch = useDispatch();
  const { userData, login } = useSelector((state) => state.User);
  const [isImageLoading, setImageLoading] = useState(false);
  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [isAboutModalVisible, setAboutModalVisible] = useState(false);
  const [newName, setNewName] = useState(userData?.name);
  const [newAbout, setNewAbout] = useState(userData?.about);

  const handleImageChange = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      // Check if the user cancelled the image selection
      if (!image || image.didCancel) {
        console.log('Image selection cancelled by the user.');
        return;
      }

      setImageLoading(true);

      const response = await fetch(image.path);
      const blob = await response.blob();
      const storageRef = firebase.storage().ref().child(`avatars/${userData.id}`);
      await storageRef.put(blob);

      const downloadURL = await storageRef.getDownloadURL();

      // Update the user's avatar URL in the Realtime Database
      await database()
        .ref(`users/${userData.id}/img`)
        .set(downloadURL);

      const updatedUserData = { ...userData, img: downloadURL };
      dispatch(setUser(updatedUserData));

      setImageLoading(false);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
      setImageLoading(false);
    }
  };

  const renderHeaderCenter = () => {
    return (
      <View style={styles.headerCenter}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.white}
          translucent={false}
        />
        <Avatar
          source={{ uri: userData?.img }}
          rounded
          size={120}
          onPress={handleImageChange}
          placeholderStyle={styles.avatarPlaceholder}
          isLoading={isImageLoading}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userData?.name}</Text>
          <Text style={styles.email}>{userData?.emailId}</Text>
          <Text style={styles.about}>{userData?.about}</Text>
        </View>
      </View>
    );
  };


  const handleChangeAbout = async () => {
    await database().ref(`users/${userData.id}/about`).set(newAbout);
  
    const updatedUserData = { ...userData, about: newAbout };
    dispatch(setUser(updatedUserData));
  
    // Close the modal
    setAboutModalVisible(false);
  };
  


  const navigateToChangePassword = () => {
    Navigation.navigate('ChangePassword');
  };
  const handleSaveName = async () => {
    // Update the user's name in the Realtime Database
    await database().ref(`users/${userData.id}/name`).set(newName);

    // Update the local user data
    const updatedUserData = { ...userData, name: newName };
    dispatch(setUser(updatedUserData));

    // Close the modal
    setNameModalVisible(false);
  };

  const openNameModalName = () => {
    setNameModalVisible(true);
  };

  const closeNameModalName = () => {
    setNameModalVisible(false);
  };

  const openNameModalAbout = () => {
    setAboutModalVisible(true);
  };

  const closeNameModalAbout = () => {
    setAboutModalVisible(false);
  };



  const handleLogout = async () => {
    try {
      // Call the logout function from the Storage utility
      await Auth.logout();

      // Reset user data in Redux store
      dispatch(setUser(null));
      dispatch(removeUser());
      
      // Show a toast message indicating successful logout
      SimpleToast.show('Logout Successful!');
    } catch (error) {
      // Handle any errors that might occur during the logout process
      console.error('Error during logout:', error);

      // Show a toast message indicating the logout error
      SimpleToast.show('Logout Failed');
    }
  };
  


  return (
    <View style={styles.container}>
      <Header
        centerComponent={renderHeaderCenter}
        containerStyle={styles.headerContainer}
      />
      <TouchableOpacity onPress={navigateToChangePassword}>
        <View style={styles.functionalityItem}>
          <Icon name="lock-closed" type="ionicon" size={24} color={COLORS.black} style={styles.functionalityIcon} />
          <Text style={styles.functionalityTitle}>Đổi mật khẩu</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={openNameModalName}>
        <View style={styles.functionalityItem}>
          <Icon name="pencil" type="ionicon" size={24} color={COLORS.black} style={styles.functionalityIcon} />
          <Text style={styles.functionalityTitle}>Đổi tên</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={openNameModalAbout} >
        <View style={styles.functionalityItem} >
          <Icon name="card" type="ionicon" size={24} color={COLORS.black} style={styles.functionalityIcon} />
          <Text style={styles.functionalityTitle}>Đổi thông tin giới thiệu</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} >
        <View style={styles.functionalityItem} >
          <Icon name="arrow-redo" type="ionicon" size={24} color={COLORS.black} style={styles.functionalityIcon} />
          <Text style={styles.functionalityTitle} >Đổi tài khoản</Text>
          
        </View>
      </TouchableOpacity>

      {/* Name change modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNameModalVisible}
        onRequestClose={closeNameModalName}

      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thay đổi tên</Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Nhập tên mới"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeNameModalName}>
                <Text style={styles.modalButton}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveName}>
                <Text style={styles.modalButton}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAboutModalVisible}
        onRequestClose={closeNameModalAbout}

      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thay đổi tên</Text>
            <TextInput
              style={styles.input}
              value={newAbout}
              onChangeText={setNewAbout}
              placeholder="Nhập giới thiệu về bạn"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeNameModalAbout}>
                <Text style={styles.modalButton}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChangeAbout}>
                <Text style={styles.modalButton}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 0,
    justifyContent: 'space-around',
    elevation: 2,

  },
  headerCenter: {
    alignItems: 'center',
    marginTop: 20,

  },
  avatarPlaceholder: {
    backgroundColor: COLORS.lightgray,
  },
  userInfo: {
    marginTop: 15,
    alignItems: 'center',
  },
  username: {
    fontFamily: 'FONTS.Bold',
    fontSize: 18,
    color: COLORS.black,
  },
  email: {
    fontFamily: 'FONTS.Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
  about: {
    fontFamily: 'FONTS.Regular',
    fontSize: 16,
    color: COLORS.gray,
  },

  functionalityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgray,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  functionalityIcon: {
    marginRight: 15,
  },
  functionalityTitle: {
    fontFamily: 'FONTS.Regular',
    fontSize: 16,
    color: COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'FONTS.Bold',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray,
    marginBottom: 15,
    fontFamily: 'FONTS.Regular',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    fontFamily: 'FONTS.Bold',
    fontSize: 16,
    color: COLORS.blue,
    marginLeft: 20,
  },

});

export default UserProfile;
