import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar,LogBox  } from 'react-native';
import { Avatar, Icon, Header } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import { removeUser, setUser } from '../../Redux/reducer/user';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/app';
import Navigation from '../../Service/Navigation';



const UserProfile = () => {
  const dispatch = useDispatch();
  const { userData, login } = useSelector((state) => state.User);
  const [isImageLoading, setImageLoading] = useState(false);
  // Ignore the specific warning related to "Image source 'null' doesn't exist"
  LogBox.ignoreLogs(['Image source "null" doesn\'t exist']);

  const handleLogout = () => {
    dispatch(removeUser());
  };

  const handleImageChange = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
  
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

  const renderHeaderLeft = () => {
    return (
      <TouchableOpacity  style={styles.headerButton}>
        <Icon name="arrow-back-outline" type="ionicon" color={COLORS.blue} size={28}
        onPress={() => Navigation.back()}
        />
      </TouchableOpacity>
    );
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
          size="medium"
          onPress={handleImageChange}
          placeholderStyle={styles.avatarPlaceholder}
          isLoading={isImageLoading}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userData?.name}</Text>
          <Text style={styles.email}>{userData?.emailId}</Text>
        </View>
      </View>
    );
  };

  const renderHeaderRight = () => {
    return (
      <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
        <Icon name="settings" type="ionicon" color={COLORS.blue} size={28} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={renderHeaderLeft}
        centerComponent={renderHeaderCenter}
        rightComponent={renderHeaderRight}
        containerStyle={styles.headerContainer}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    backgroundColor: COLORS.lightgray,
  },
  userInfo: {
    marginLeft: 15,
  },
  username: {
    fontFamily: FONTS.Bold,
    fontSize: 18,
    color: COLORS.black,
  },
  email: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: COLORS.gray,
  },
  headerButton: {
    padding: 10,
  },
});

export default UserProfile;