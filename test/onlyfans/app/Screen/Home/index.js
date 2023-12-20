import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert 
} from 'react-native';
import { ListItem, Avatar, Icon, SearchBar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import HomeHeader from '../../Component/Header/HomeHeader';
import Navigation from '../../Service/Navigation';
import database from '@react-native-firebase/database';

const Home = (props) => {
  const { userData } = useSelector((state) => state.User);

  const [chatList, setChatList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = async () => {
    database()
      .ref('/chatlist/' + userData?.id)
      .on('value', (snapshot) => {
        if (snapshot.val() !== null) {
          setChatList(Object.values(snapshot.val()));
        }
      });
  };



  const filteredChatList = chatList.filter((item) =>
  item && item.name && item.name.toLowerCase().includes(search.toLowerCase())
);



  const deleteChatList = (item) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete the chat with ${item.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Implement logic to delete the chat list item from the database
            database().ref(`/chatlist/${userData?.id}/${item.id}`).remove();
            setSearch(''); // Clear the search state
          },
        },
      ]
    );
  };
  
  


  const renderItem = ({ item }) => (
    <ListItem
      containerStyle={{ paddingVertical: 8, marginVertical: 0 }}
      onPress={() => Navigation.navigate('SingleChat', { receiverData: item })}
      onLongPress={() => deleteChatList(item)}
    >
      <Avatar source={{ uri: item?.img }} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={{ fontFamily: FONTS.Medium, fontSize: 14 }}>
          {item?.name}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{ fontFamily: FONTS.Regular, fontSize: 12 }}
          numberOfLines={1}
        >
          {item?.msgType === 'image' ? 'Image' : item?.lastMsg}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <HomeHeader />

      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={filteredChatList}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => Navigation.navigate('AllUser')}
      >
        <Icon name="users" type="font-awesome-5" color={COLORS.white} size={20} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
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

