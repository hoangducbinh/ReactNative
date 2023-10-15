import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites'; // Assuming this is the correct import path
import User from './screens/User';
import { MaterialIcons } from '@expo/vector-icons';
import colors from './utility/colors'; // Assuming this import is correct
import Options from './screens/Options';

const getDrawerItemIcon = (icon) => ({ color }) => (
  <MaterialIcons name={icon} size={22} color={color} />
);

const Stack = createNativeStackNavigator();

const ContactsScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Contacts" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contacts" component={Contacts} options={{ title: 'Contacts' }} />
      <Stack.Screen name="Profile" component={Profile} options={({ route }) => {
        const { contact } = route.params;
        const { name } = contact;
        return {
          title: name.split(' ')[0], // Corrected the title assignment
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'blue', // You need to define 'colors.blue' if it's not imported
          },
        };
      }} />
    </Stack.Navigator>
  );
}

const FavoritesScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: "Favorites" }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
    </Stack.Navigator>
  );
}


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='ContactsScreens'>
        <Drawer.Screen name="ContactsScreens" component={ContactsScreens} options={{
          drawerIcon: getDrawerItemIcon('list'),
        }} />
        <Drawer.Screen name="FavoritesScreens" component={FavoritesScreens} options={{
          drawerIcon: getDrawerItemIcon('star'),
        }} />
        <Drawer.Screen name="User" component={User} options={{
          drawerIcon: getDrawerItemIcon('person'),
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
