import React, {useContext} from 'react';
import {GlobalContext} from '../contexts';
import {AuthNavigation} from './auth-navigation';
import {TabNavigation} from './tab-navigation';

// export navigations
export * from './auth-navigation';
export * from './tab-navigation';

const AppNavigationContainer = () => {
  const contextData: any = useContext(GlobalContext);
  const {isLoggedIn} = contextData;

  let result = <AuthNavigation />;
  if (isLoggedIn) {
    result = <TabNavigation />;
  }
  return result;
};

export {AppNavigationContainer};
