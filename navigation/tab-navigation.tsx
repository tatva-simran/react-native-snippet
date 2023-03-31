import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {color, ColorType, font_11, typography, verticalScale} from '../theme';
import {ScreenConstants, TabNames} from '../constants';
import {Icon} from '../components';
import {IconTypes} from '../assets/icons';
import {RootTabParamList} from '../types';
import { DashboardStack, SettingsStack} from './primary-navigation';
import {hasNotch} from '../utils';

export const tabBarStyle = {
  height: hasNotch ? verticalScale(85) : verticalScale(75),
  paddingTop: verticalScale(12),
  backgroundColor: color.black,
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabIcon = ({
  icon,
  iconColor,
}: {
  icon: IconTypes;
  iconColor: ColorType;
}) => {
  return <Icon iconColor={iconColor} icon={icon} />;
};


export function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.white,
        tabBarInactiveTintColor: color.graySeprator,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: font_11,
          fontWeight: '500',
          lineHeight: verticalScale(14),
          fontFamily: typography.primary,
        },
        tabBarStyle,
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: TabNames.DASHBOARD,
          tabBarIcon: ({color: iconColor}: any) => (
            <TabIcon iconColor={iconColor} icon="DashboardIcon" />
          ),
          unmountOnBlur: true,
        }}
        name={ScreenConstants.DASHBOARD_TAB}
        component={DashboardStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: TabNames.SETTINGS,
          tabBarIcon: ({color: iconColor}: any) => (
            <TabIcon iconColor={iconColor} icon="SettingIcon" />
          ),
          unmountOnBlur: true,
        }}
        name={ScreenConstants.SETTINGS_TAB}
        component={SettingsStack}
        listeners={({navigation}) => ({
          tabPress: () => {
            navigation.popToTop?.();
            navigation.navigate(ScreenConstants.SETTINGS_TAB, {
              screen: ScreenConstants.SETTING_SCREEN,
            });
          },
        })}
      />
    </Tab.Navigator>
  );
}
