import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ListItem, Avatar, SearchBar } from 'react-native-elements';
//import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import Navigation from '../../Service/Navigation';
import uuid from 'react-native-uuid';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';


const AllUser = () => {
  const { userData } = useSelector(state => state.User);

  const [search, setsearch] = useState('');
  const [allUser, setallUser] = useState([]);
  const [allUserBackup, setallUserBackup] = useState([]);


  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    database()
      .ref('users/')
      .once('value')
      .then(snapshot => {
        console.log('all User data: ', Object.values(snapshot.val()));
        setallUser(
          Object.values(snapshot.val()).filter(it => it.id != userData.id),
        );
        setallUserBackup(
          Object.values(snapshot.val()).filter(it => it.id != userData.id),
        );
      });
  };

  const searchuser = val => {
    setsearch(val);
    setallUser(allUserBackup.filter(it => it.name && it.name.match(val)));
  };
  

  const createChatList = data => {
    database()
      .ref('/chatlist/' + userData.id + '/' + data.id)
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());

        if (snapshot.val() == null) {
          let roomId = uuid.v4();
          let myData = {
            roomId,
            id: userData.id,
            name: userData.name,
            img: userData.img,
            emailId: userData.emailId,
            about: userData.about,
            lastMsg: '',
          };
          database()
            .ref('/chatlist/' + data.id + '/' + userData.id)
            .update(myData)
            .then(() => console.log('Data updated.'));

          delete data['password'];
          data.lastMsg = '';
          data.roomId = roomId;
          database()
            .ref('/chatlist/' + userData.id + '/' + data.id)
            .update(data)
            .then(() => console.log('Data updated.'));

          Navigation.navigate('SingleChat', { receiverData: data });
        } else {
          Navigation.navigate('SingleChat', { receiverData: snapshot.val() });
        }
      });
  };

  



  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => createChatList(item)}
      bottomDivider
      containerStyle={styles.listStyle}>
      <Avatar
        source={{ uri: item.img }}
        rounded
        title={item.name}
        size="medium"
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontFamily: FONTS.Medium, fontSize: 16 }}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{ fontFamily: FONTS.Regular, fontSize: 12 }}
          numberOfLines={1}>
          {item.about}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.container}>
      <Icon
          name="arrow-back" // Replace with the appropriate icon name
          size={30}
          color={COLORS.blue}
          onPress={() => Navigation.back()}
        />
          <Text style={styles.header}> All User</Text>
      </View>
     
      <SearchBar
        placeholder="Type Here..."
        onChangeText={val => searchuser(val)}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    height: 70,
    backgroundColor: COLORS.white,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 22,
    paddingLeft: 115,
    fontWeight:"bold",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginHorizontal: 10,
    height: 40, // Adjust the height as needed
    paddingLeft: 10, // Add padding for a cleaner look
    fontSize: 15,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
    opacity: 0.7,
  },
  searchInput: {
    fontSize: 15,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
    opacity: 0.7,
  },
  listStyle: { paddingVertical: 7, marginVertical: 2 },

  searchBarContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInputContainer: {
    backgroundColor: COLORS.lightgray,
    borderRadius: 10,
  },
  searchBarInput: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
  },
});

export default AllUser;
