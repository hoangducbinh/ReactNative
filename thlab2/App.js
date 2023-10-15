import React from 'react';
import Store from './utility/store';
import { Provider } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';

import User from './screens/User';
import Favorites from './contact-list/3/Favorites';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Contacts">
          <Drawer.Screen name="Contacts" component={Contacts} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Favorites" component={Favorites} />
          <Drawer.Screen name="User" component={User} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
