import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useMyContextController, logout } from '../context';
//import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

const Setting = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    if (userLogin == null) navigation.navigate('Login');
  }, [userLogin]);

  const onSubmit = () => {
    logout(dispatch);
    navigation.navigate('Login')
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      
      <Button mode="contained" onPress={onSubmit} style={{backgroundColor : 'purple'}}>
        Đăng xuất
      </Button>
    </View>
  );
};

export default Setting;
