import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Favorites from '../3/screens/Favorites';
import Contacts from '../../screens/Contacts';
import Profile from '../../screens/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import colors from '../../utility/colors';
import User from './screens/User';




const getDrawerItemIcon = icon => ({ tintColor }) => (
    <MaterialIcons   name={icon} size={22} style={{ color: tintColor }} />
);

const Stack = createNativeStackNavigator(); 
const ContactsScreens = () => {
    return (
        <Stack.Navigator initialRouteName="Contacts" screenOptions={
            {
                headerShown: false
            }
        }
        >
            <Stack.Screen name='Contacts' component={Contacts}
                options={{ title: "Contacts" }} />
            <Stack.Screen
                name='Profile' component={Profile} options={({ route }) => {
                    const { contact } = route.params; const { name } = contact;
                    return {
                        title: name.split(' ')[0], headerTintColor: 'white', headerStyle: {
                            backgroundColor: colors.blue,
                        }
                    };
                }
                }
            />
        </Stack.Navigator>
    );
}

const FavoritesScreens = () => {
    return (

        <Stack.Navigator initialRouteName="Favorites" screenOptions={
            {
                headerShown: false
            }
        }
        >
            <Stack.Screen name='Favorites' component={Favorites}
                options={{ title: "Favorites" }} />
            <Stack.Screen name='Profile' component={Profile} options={{ title: "Profile" }} />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator(); const DrawerNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='ContactsScreens'
            >
                <Drawer.Screen name="ContactsScreens" component={ContactsScreens} options={{
                    drawerIcon: getDrawerItemIcon('list'),
                }}
                />
                <Drawer.Screen name="FavoritesScreens" component={FavoritesScreens} options={{
                    drawerIcon: getDrawerItemIcon('star'),
                }}
                />
                <Drawer.Screen name="UserScreens" component={User} options={{
                    drawerIcon: getDrawerItemIcon('person'),
                }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default DrawerNavigator;
