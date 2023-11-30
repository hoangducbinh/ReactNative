import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthenticatedUserContext } from '../providers';
import { HomeScreen } from '../screens/HomeScreen';
import TabNavigator from '../contact-list/3/routes';
import Contacts from '../contact-list/2/screens/Contacts';
import Favorites from '../contact-list/3/screens/Favorites';
import Options from '../contact-list/3/screens/Options';
import Profile from '../contact-list/2/screens/Profile';


const Stack = createStackNavigator();
export const AppStack = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name='Home' component={HomeScreen} /> */}
            <Stack.Screen name = "Contacts" component = {Favorites} />
            <Stack.Screen name='Option' component={Options} />
            <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
        
    );
};



