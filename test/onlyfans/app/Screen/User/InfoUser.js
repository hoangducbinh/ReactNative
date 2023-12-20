import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import { COLORS } from '../../Component/Constant/Color';

const InfoUser = ({ route }) => {
  // Extract user data from navigation params
  const { userData } = route.params;
 // console.log(userData);

  
  return (
    <View style ={{backgroundColor :COLORS.white, flex :1}}>
        <View style={styles.container}>
      {/* Display user avatar */}
      <Avatar source={{ uri: userData.img }} rounded size="xlarge" />

      {/* Display user name */}
      <Text style={styles.name}>{userData.name}</Text>

      {/* Display user about information */} 
      <Text style={styles.about}>{userData.about}</Text>
      <Text style={styles.about}>{userData.emailId}</Text>
      </View>
      <View style={{justifyContent :"center", flex :1, textAlign :"center",alignItems:'center'}} >
      <Text>Chưa có hình ảnh hoặc nội dung tải lên</Text>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({

  container: {
    height: 270,
    backgroundColor: COLORS.white,
    elevation: 5,
    justifyContent:"center",
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  about: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default InfoUser;
