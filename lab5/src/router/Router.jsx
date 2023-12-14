import 'react-native-gesture-handler';
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useMyContextController } from "../context";
import HomeScreen from '../screens/HomeScreen';
import AdminScreen from '../screens/AdminScreen';
import CustomerScreen from '../screens/CustomerScreen';
import LoginScreen from '../screens/LoginScreen';
import AddNewService from '../screens/AddNewServiceScreen';
import ServiceDetail from '../screens/ServiceDetailScreen';
import EditServiceScreen from '../screens/EditServicesScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Setting from '../screens/Setting';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='EditService' component={EditServiceScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name='ServiceDetail' component={ServiceDetail} />
      <Stack.Screen name="AddNewService" component={AddNewService} />
      <Stack.Screen name='Logout' component={Setting}/>
      <Stack.Screen name='Login' component={LoginScreen}/>
    </Stack.Navigator>
  );
};

const AuthenticatedNavigator = () => (
  <Tab.Navigator
    initialRouteName='Home'
    screenOptions={{
      headerShown: false,
    }}
    tabBarOptions={{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="folder-home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Admin"
      component={AdminScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-group" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Customer"
      component={CustomerScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-group" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Logout"
      component={Setting}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Router = () => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  return userLogin ? <AuthenticatedNavigator /> : <LoginScreen />;
};

export default Router;
