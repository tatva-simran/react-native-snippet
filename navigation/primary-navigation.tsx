import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DashboardScreen,
  SettingScreen,
} from '../screens';
import {PrimaryStackParamList} from '../types';
import {ScreenConstants} from '../constants';

const Stack = createNativeStackNavigator<PrimaryStackParamList>();

function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ScreenConstants.DASHBOARD_SCREEN}>
      <Stack.Screen
        name={ScreenConstants.DASHBOARD_SCREEN}
        component={DashboardScreen}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenConstants.SETTING_SCREEN}
        component={SettingScreen}
      />
    </Stack.Navigator>
  );
}

export {DashboardStack, SettingsStack};
