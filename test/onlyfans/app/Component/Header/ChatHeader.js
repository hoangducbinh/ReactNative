import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import moment from 'moment'; // Import thư viện moment
import Navigation from '../../Service/Navigation';
import { COLORS } from '../Constant/Color';
import { FONTS } from '../Constant/Font';

const ChatHeader = (props) => {
  const { data } = props;
  const [lastSeen, setLastSeen] = useState('');

  useEffect(() => {
    // Tính thời gian last seen ở đây
    const calculateLastSeen = () => {
      if (data.isOnline) {
        // Nếu người dùng đang online, hiển thị "Present"
        setLastSeen('Present');
      } else {
        // Nếu không, thực hiện xử lý thời gian last seen
        const userLastSeen = data.lastSeen || Date.now();
        const formattedLastSeen = moment(userLastSeen).fromNow();
        setLastSeen(`Last seen ${formattedLastSeen}`);
      }
    };

    calculateLastSeen();
  }, [data.isOnline, data.lastSeen]);

  const handleAlertCirclePress = () => {
    Navigation.navigate('InfoUser', { userData: data });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
        translucent={false}
      />

      <Icon
        containerStyle={{
          marginHorizontal: 10,
        }}
        name="arrow-back"
        type="ionicon"
        size={25}
        color={COLORS.blue}
        onPress={() => Navigation.back()}
      />
      <Avatar source={{ uri: data.img }} rounded size="small" />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.black,
            fontSize: 16,
            fontFamily: FONTS.SemiBold,
            textTransform: 'capitalize',
          }}>
          {data.name}
        </Text>

        <Text
          style={{
            color: COLORS.blue,
            fontSize: 10,
            fontFamily: FONTS.Regular,
          }}>
          {lastSeen}
        </Text>
      </View>

      <Icon
        style={{
          marginHorizontal: 10,
        }}
        color={COLORS.blue}
        name="call"
        type="ionicon"
      />
      <Icon
        style={{
          marginHorizontal: 10,
        }}
        color={COLORS.blue}
        name="videocam"
        type="ionicon"
      />
      <TouchableOpacity onPress={handleAlertCirclePress}>
        <Icon
          style={{
            marginHorizontal: 10,
          }}
          color={COLORS.blue}
          name="alert-circle"
          type="ionicon"
        />
      </TouchableOpacity>
    </View>
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
});

export default ChatHeader;
