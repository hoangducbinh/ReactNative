import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon, Image } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { COLORS } from '../Constant/Color';
import { FONTS } from '../Constant/Font';
import Navigation from '../../Service/Navigation';

const HomeHeader = () => {
  const { userData } = useSelector((state) => state.User);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoContainer}
        >
          <Image source={require('../../Assets/OnlyFans.png')} style={{ width: 45, height: 45 }} />
          <Text style={styles.logo}>Onlyfans</Text>
        
      </TouchableOpacity>
      
     
      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={() => Navigation.navigate('Notifications')}
          style={styles.iconContainer}>
          <Icon
            name="notifications"
            type="ionicon"
            color={COLORS.blue}
            size={28}
          />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Navigation.navigate('UserProfile')}>
          <Avatar source={{ uri: userData?.img  }} rounded size="small" />
         
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    elevation: 2,
    paddingVertical: 15,
    
  },
  logoContainer: {
    borderRadius: 10,
    backgroundColor: COLORS.themeLight,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  logo: {
    fontFamily: FONTS.Bold,
    color: COLORS.blue,
    fontSize: 22,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.red,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default HomeHeader;
