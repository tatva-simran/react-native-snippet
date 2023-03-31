import React, { FC, useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Keychain from 'react-native-keychain';
import { styles } from './login-screen-style';
import { Button, CustomInput, Header, Text } from '../../components';
import { GlobalContext } from '../../contexts/global-provider';
import { validation } from '../../utils/validation';
import { ScreenConstants } from '../../constants';
import { customAlert, isNetOn, formatPhoneNumber } from '../../utils';
import { postAPI } from '../../services/apiService';

interface IProps { }

const LoginScreen: FC<IProps> = ({ navigation }) => {
  const contextData: any = useContext(GlobalContext);
  const { setIsGlobalLoading } = contextData;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  useEffect(() => {
    onEndEditing();
  }, [phoneNumber]);

  const handleOnChangePhoneNumber = (val: string) => {
    setPhoneNumber(formatPhoneNumber(val));
    const isValidPhone = validation.isValidPhoneNumber(val);
    setIsValidPhoneNumber(isValidPhone);
  };

  const onEndEditing = () => {
    const isValidPhone = validation.isValidPhoneNumber(phoneNumber);
    setIsValidPhoneNumber(isValidPhone);
  };

  const onLoginBtnPressed = async () => {
    if (isNetOn(contextData)) {
      setIsGlobalLoading(true);
      NetInfo.fetch().then((networkInfo) => {
        if (networkInfo.isConnected) {
          const URL = `/login`;
          let bodyData = {
            telephone: phoneNumber,
            password
          };
          postAPI(
            URL,
            bodyData,
            false,
            (response) => {
              if (response.status === 200) {
                // Storing sensitive token using keychain library
                Keychain.setGenericPassword(response.phoneNumber, response.token);
                navigation.navigate(ScreenConstants.DASHBOARD_SCREEN, {
                userInfo: response.user,
                phoneNumber: phoneNumber,
                isNewUser: response.isNewUser,
              });
            }
            },
            (error) => console.log("Alert for displaying Error"),
            (centralisedError: any) => {
              contextData.setisGlobalLoading(false);
            }
          );
        } else {
          setIsGlobalLoading(false);
          customAlert({ message: res.message, type: 'ERROR' });
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header centerIcon="AppIcon" style={styles.headerStyle} />
      <View style={styles.centerView}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerStyle}>
          <Text
            tx={'LGS_LOGIN'}
            preset="paragraph"
            style={styles.loginTxtStyle}
          />
          <Text
            tx={'LGS_ACCOUNT'}
            preset="paragraph"
            style={styles.accountTxtStyle}
          />
          <View style={styles.txtInputStyle}>
            <CustomInput
              name="phoneNumber"
              testID="LS-phone-number-input"
              containerStyle={styles.inputContainer}
              tx={'LGS_PHONE_NUMBER'}
              onChangeText={handleOnChangePhoneNumber}
              value={phoneNumber}
              type={'phone-number'}
              errorTx="INVALID_PHONE_ERR"
              keyboardType={'number-pad'}
              isNotValid={!isValidPhoneNumber}
              onEndEditing={onEndEditing}
            />
          </View>
        </ScrollView>
      </View>
      <Button
        testID="LS-login-button"
        tx="LGS_LOGIN"
        style={styles.buttonContainer}
        disabled={
          !isValidPhoneNumber
        }
        onPress={onLoginBtnPressed}
      />
    </SafeAreaView>
  );
};

export { LoginScreen };
