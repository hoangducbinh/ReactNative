import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { COLORS } from '../Component/Constant/Color';
import Home from '../Screen/Home';
import AllUser from '../Screen/User/AllUser';
import SingleChat from '../Screen/Home/SingleChat';
import UserProfile from '../Screen/User/UserProfile';
import SpeechToText from '../Component/Chat/SpeechToText';
import Notifications from '../Screen/Notifications/Notifications';

import InfoUser from '../Screen/User/InfoUser';
import Login from '../Screen/Auth/Login';
import Register from '../Screen/Auth/Register';
import ChangePassword from '../Screen/Auth/ChangePassword';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        cardStyle: { backgroundColor: COLORS.button },
        gestureEnabled: true,
        backgroundColor: COLORS.button,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false, // Use this instead of headerMode="none"
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllUser" component={AllUser} />
      <Stack.Screen name="SingleChat" component={SingleChat} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="SpeechToText" component={SpeechToText} />
      <Stack.Screen name="Notifications" component={Notifications }/>
      <Stack.Screen name="ChangePassword" component={ChangePassword}/>
      <Stack.Screen name="InfoUser" component={InfoUser}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/> 
      
      
    </Stack.Navigator>
  );
}

