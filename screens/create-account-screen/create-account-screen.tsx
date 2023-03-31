import React, { FC, useState, useContext } from 'react';
import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { styles } from './create-account-screen-style';
import { Button, CustomInput, Header, InputProps, Text } from '../../components';
import { ScreenConstants } from '../../constants';
import { useValidateError } from '../../hooks';
import { GlobalContext } from '../../contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import { postAPI } from '../../services/apiService';

interface IProps { }

export const CreateAccountScreen: FC<IProps> = ({
  route,
  navigation,
}) => {
  const params: any = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const { isValid, handleError } = useValidateError({
    firstName: true,
    lastName: true,
  });

  const arrTextFields: InputProps & { id: number }[] = [
    {
      id: 1,
      tx: 'FIRST_NAME',
      keyboardType: 'default',
      value: firstName,
      name: 'firstName',
      onChangeText: setFirstName,
      minLen: 2,
      maxLen: 30,
      testID: 'first-name-input',
    },
    {
      id: 2,
      tx: 'LAST_NAME',
      keyboardType: 'default',
      value: lastName,
      name: 'lastName',
      onChangeText: setLastName,
      minLen: 2,
      maxLen: 30,
      testID: 'last-name-input',
    },
    {
      id: 3,
      tx: 'EMAIL',
      keyboardType: 'email-address',
      value: email,
      type: 'email',
      required: false,
      name: 'email',
      onChangeText: setEmail,
      testID: 'email-input',
    },
  ];

  const onCreateAccountBtnPressed = async () => {
    if (isValid) {
      NetInfo.fetch().then((networkInfo) => {
        if (networkInfo.isConnected) {
          const URL = `/register`;
          let bodyData = {
            userInfo: params.userInfo,
            firstName,
            lastName,
            email,
            phoneNumber: params.phoneNumber,
          };
          postAPI(
            URL,
            bodyData,
            false,
            (response) => { if (response.status === 200) navigation.navigate(ScreenConstants.LOGIN_SCREEN},
            (error) => console.log("Alert for displaying Error"),
            (centralisedError: any) => {
              contextData.setisGlobalLoading(false);
            }
          );
        } else {
          console.log("Alert for No Internet");
        }
      });
    }
  };

  const fieldsView = _.map(arrTextFields, item => {
    return (
      <CustomInput
        containerStyle={styles.inputContainer}
        key={item.id}
        onError={handleError}
        {...item}
        errorTx={'REQUIRED_ERR_MSG'}
      />
    );
  });

  return (
    <SafeAreaView style={styles.root}>
      <TouchableWithoutFeedback
        style={styles.flexView}
        onPress={() => Keyboard.dismiss()}>
        <>
          <Header centerIcon="AppIcon" />
          <KeyboardAwareScrollView
            style={styles.flexView}
            contentContainerStyle={styles.contentConatinerStyle}>
            <View style={styles.centerView}>
              <Text
                tx={'LETS_START'}
                preset="paragraph"
                style={styles.loginTxtStyle}
              />
              <Text
                tx={'CREATE_ACC'}
                preset="paragraph"
                style={styles.accountTxtStyle}
              />
              {fieldsView}
              <Text
                tx={'OPTIONAL'}
                preset="paragraph"
                style={styles.optionalTxtStyle}
              />
            </View>
          </KeyboardAwareScrollView>
          <Button
            testID="create-account-button"
            tx="CREATE_ACCOUNT"
            style={styles.buttonContainer}
            disabled={!isValid}
            onPress={onCreateAccountBtnPressed}
          />
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};