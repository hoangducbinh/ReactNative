import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AppStack from './app/Navigation/AppStack';
import AuthStack from './app/Navigation/AuthStack';
import {COLORS} from './app/Component/Constant/Color';
import Navigation from './app/Service/Navigation';
import Auth from './app/Service/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from './app/Redux/reducer/user';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App_clone() {
  const dispatch = useDispatch();

  const {userData, login} = useSelector(state => state.User);

  const [loginChk, setloginChk] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let data = await Auth.getAccount();
    if (data != null) {
      dispatch(setUser(data));
      setloginChk(false);
    } else {
      setloginChk(false);
    }
  };

  if (loginChk) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
        <Stack.Navigator  
          detachInactiveScreens={false}
          initialRouteName="Auth"
          screenOptions={{
            cardStyle: {backgroundColor: COLORS.white},
            gestureEnabled: true,
            backgroundColor: COLORS.button,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}>
          {!login ? (
            <Stack.Screen name="Auth" component={AuthStack} />
          ) : (
            <Stack.Screen name="AppStack" component={AppStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

 