import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Favorites from '../3/screens/Favorites';
import Profile from '../../screens/Profile';
import User from './screens/User';
import Options from './screens/Options'; // Include Options component
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../utility/colors';
import Contacts from '../2/screens/Contacts';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';




const Stack = createStackNavigator();
const ContactsScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Contacts" component={Contacts} options={{ title: "Contacts" }} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(' ')[0],
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: colors.blue,
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

const FavoritesScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: "Favorites" }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
    </Stack.Navigator>
  );
};

const UserScreens = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="User"
        component={User}
        options={{
          headerTitle: "Me",
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.blue,
          },
          headerRight: () => (
            <MaterialIcons
              name="settings"
              size={24}
              style={{ color: 'white', marginRight: 10 }}
              onPress={() => navigation.navigate('Options')}
            />
          ),
        }}
      />
      <Stack.Screen name="Options" component={Options} options={{ title: "Options" }} />
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='ContactsScreens'
        barStyle={{ backgroundColor: colors.blue }}
        labeled={false}
        activeTintColor={colors.greyLight}
        inactiveColor={colors.greyDark}
      >

        <Tab.Screen
          name="ContactsScreens"
          component={ContactsScreens}
          
        />
        <Tab.Screen
          name="FavoritesScreens"
          component={FavoritesScreens}
          
        />
        <Tab.Screen
          name="UserScreens"
          component={UserScreens}
         
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigator;
