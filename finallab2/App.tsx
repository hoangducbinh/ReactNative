import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import StackNavigator from './contact-list/2/routes';
import TabNavigator from './contact-list/3/routes';
import DrawerNavigator from './contact-list/4/routes';


import { Provider } from 'react-redux';
import store from './contact-list/4/Store';


const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    // You can uncomment one of the navigation options below to activate it.
    
    // Example 1: Using StackNavigator
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Contact'>
    //     <Stack.Screen name="Contact" component={Contacts} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    // Example 2: Using TabNavigator
     <TabNavigator />

    // Example 3: Using DrawerNavigator wrapped with Redux Provider
    // <Provider store={store}>
      
    //     <DrawerNavigator />
     
    // </Provider>

  );
};

export default App;
