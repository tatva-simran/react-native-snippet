import React, {useState, createContext} from 'react';

const GlobalContext = createContext({});

const GlobalProvider = (props: any) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  
  const resetState = () => {
    setIsGlobalLoading(false);
    setIsLoggedIn(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        isGlobalLoading,
        setIsGlobalLoading,
        setIsLoggedIn,
        isLoggedIn,
        resetState,
        isInternetConnected,
        setIsInternetConnected,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};
