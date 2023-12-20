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
