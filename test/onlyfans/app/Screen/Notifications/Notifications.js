import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { COLORS } from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import Navigation from '../../Service/Navigation';
import database from '@react-native-firebase/database';

const Notifications = () => {
  const { userData } = useSelector((state) => state.User);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    // Fetch notifications from the database or any other source
    // Update the 'notifications' state with the retrieved data
    const notificationsData = await database()
      .ref('/notifications/' + userData?.id)
      .once('value')
      .then((snapshot) => snapshot.val());

    if (notificationsData) {
      setNotifications(Object.values(notificationsData));
    }
  };

  const renderItem = ({ item }) => (
    <ListItem containerStyle={styles.listItemContainer}>
      <Avatar source={{ uri: item.senderImg }} rounded size="medium" />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>
          {item.senderName} sent you a notification
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {item.message}
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
       <Text style={styles.header}>Notifications</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={notifications}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  header: {
    fontSize: 22,
    textAlign: 'center',      
    textAlignVertical: 'center',  
    paddingLeft:100,
    fontWeight:"bold"
  },
  

    container: {
      height: 70,
      backgroundColor: COLORS.white,
      elevation: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },

  listItemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgray,
  },
  title: {
    fontFamily: FONTS.Medium,
    fontSize: 16,
  },
  subtitle: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default Notifications;
