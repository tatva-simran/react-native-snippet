import Config from 'react-native-config';

export const STAGING_BASE_URL = Config.API_HOST;
export const PRODUCTION_BASE_URL= Config.BASE_URL_V2;

export enum ScreenConstants {
  LOGIN_SCREEN = 'LoginScreen',
  WELCOME_SCREEN = 'WelcomeScreen',
  CREATE_ACCOUNT_SCREEN = 'CreateAccountScreen',
  DASHBOARD_SCREEN = 'DashboardScreen',
  SETTING_SCREEN = 'SettingScreen',
}

export enum TabNames {
  SETTINGS = 'Settings',
  DASHBOARD = 'Dashboard',
  ALERTS = 'Alerts',
}

export enum CommonConstants {
  VERSION = 'Version',
}

// All Alerts Messages Types declare for alert details screen
export enum alertTypes {
  SYSTEM_DOWN = 'systemDown',
}

// Date And Time format for all the screens 
export const DATE_TIME_FORMAT = 'MMM-DD-YYYY hh:mm A';

// Date only format for all the screens 
export const DATE_FORMAT = 'MMM-DD-YYYY';

