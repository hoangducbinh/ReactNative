import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ForgotPasswordScreen, LoginScreen, SignupScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
export const AuthStack = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
            
            
        </Stack.Navigator>
        </NavigationContainer>
    );
};
