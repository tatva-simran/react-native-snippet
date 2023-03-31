import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  WelcomeScreen,
  LoginScreen,
  CreateAccountScreen,
} from '../screens';
import {RootStackParamList} from '../types';
import {ScreenConstants} from '../constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName={ScreenConstants.WELCOME_SCREEN}>
      <Stack.Screen
        name={ScreenConstants.WELCOME_SCREEN}
        options={{headerShown: false}}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name={ScreenConstants.LOGIN_SCREEN}
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name={ScreenConstants.CREATE_ACCOUNT_SCREEN}
        options={{headerShown: false}}
        component={CreateAccountScreen}
      />
    </Stack.Navigator>
  );
}

export {AuthNavigation};
