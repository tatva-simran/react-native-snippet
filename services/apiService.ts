import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import _ from 'lodash';
import { BASE_URL } from '../constants';

const getHeaders = async (endPoint: string, authHeader: any) => {
  let authToken = '';
  if (authHeader) {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      authToken = credentials.password;
    } else {
      console.log('No credentials stored');
    }
    return {
      headers: {
        Authorization: authToken,
      },
    };
  } 
};

export const getAPI = async (
  endPoint: string,
  authHeader: any,
  successCallBack: any,
  errorCallBack: any,
  centralisedErrorCallBack: any
) => {
  const headers = await getHeaders(endPoint, authHeader);
  return axios
    .get(BASE_URL + endPoint, headers)
    .then((response) => {
      successCallBack(response);
    })
    .catch((error) => {
      if (centralisedErrorCallBack) {
        switch (error.response?.status) {
          case 404:
            switch (error.response?.data?.key) {
              case 'user_not_found':
                errorCallBack(error);
                break;
              default:
                centralisedErrorCallBack(error);
                break;
            }
            break;
          case 403:
            errorCallBack(error);
            break;
          case 401:
            errorCallBack(error);
            break;
          default:
            centralisedErrorCallBack(error);
            break;
        }
      } else {
        errorCallBack(error);
      }
    });
};

export const postAPI = async (
  endPoint: string,
  bodyData: any,
  authHeader: any,
  successCallBack: any,
  errorCallBack: any,
  centralisedErrorCallBack: any
) => {
  const headers = await getHeaders(endPoint, authHeader);
  axios
    .post(BASE_URL + endPoint, bodyData, headers)
    .then(function (response) {
      successCallBack(response);
    })
    .catch((error) => {
      if (centralisedErrorCallBack) {
        switch (error.response?.status) {
          case 404:
              switch (error.response?.data?.key) {
                case 'user_not_found':
                  errorCallBack(error);
                  break;
                default:
                  centralisedErrorCallBack(error);
                  break;
              }
            break;
          case 403:
            errorCallBack(error);
            break;
          case 401:
            errorCallBack(error);
            break;
          default:
            centralisedErrorCallBack(error);
            break;
        }
      } else {
        errorCallBack(error);
      }
    });
};

export const deleteAPI = async (
  endPoint: string,
  authHeader: any,
  successCallBack: any,
  errorCallBack: any,
  centralisedErrorCallBack: any
) => {
  const headers = await getHeaders(endPoint, authHeader);
  axios
    .delete(BASE_URL + endPoint, headers)
    .then((response) => {
      successCallBack(response);
    })
    .catch((error) => {
      if (centralisedErrorCallBack) {
        switch (error.response?.status) {
          case 404:
            switch (error.response?.data?.key) {
              case 'user_not_found':
                errorCallBack(error);
                break;
              default:
                centralisedErrorCallBack(error);
                break;
            }
            break;
          case 403:
            errorCallBack(error);
            break;
          case 401:
            errorCallBack(error);
            break;
          default:
            centralisedErrorCallBack(error);
            break;
        }
      } else {
        errorCallBack(error);
      }
    });
};

export const putAPI = async (
  endPoint: string,
  bodyData: any,
  authHeader: any,
  successCallBack: any,
  errorCallBack: any,
  centralisedErrorCallBack: any
) => {
  const headers = await getHeaders(endPoint, authHeader);
  axios
    .put(BASE_URL + endPoint, bodyData, headers)
    .then((response) => {
      successCallBack(response);
    })
    .catch((error) => {
      if (centralisedErrorCallBack) {
        switch (error.response?.status) {
          case 404:
            switch (error.response?.data?.key) {
              case 'user_not_found':
                errorCallBack(error);
                break;
              default:
                centralisedErrorCallBack(error);
                break;
            }
            break;
          case 403:
            errorCallBack(error);
            break;
          case 401:
            errorCallBack(error);
            break;
          default:
            centralisedErrorCallBack(error);
            break;
        }
      } else {
        errorCallBack(error);
      }
    });
};
