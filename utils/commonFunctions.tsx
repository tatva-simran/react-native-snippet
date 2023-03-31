import React from 'react';
import {
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  ViewStyle,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Icon, Text} from '../components';
import Toast, {ToastPosition} from 'react-native-toast-message';
import {commonStyles as styles} from './commonStyles';
import _ from 'lodash';
import {
  ContractReleasesLineType,
  ContractType,
  MetricsType,
  ReleasesLineType,
  ScreenBlockCardProps,
  SearchResultType,
} from '../types';
import {
  APIErrorCodes,
  ContractKeys,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  ModeOfTransport,
  NotificationTypes,
  ReleasesLineKeys,
  ScreenConstants,
} from '../constants';
import {customAlert} from './alert';
import moment from 'moment';
import {color} from '../theme';

const hasNotch: boolean = DeviceInfo.hasNotch();

export enum ToastType {
  custom = 'custom',
  customNotification = 'customNotificationView',
}

export const toastConfig: any = {
  custom: ({text1, text2}: any) => customToastView(text1, text2),
  customNotificationView: ({text1, text2, props}: any) =>
    customNotificationView(text1, text2, props),
};

export const renderToastView = (
  title: string,
  des: string,
  toastType: ToastType,
  props?: any,
  position?: ToastPosition,
) => {
  return Toast.show({
    text1: title,
    text2: des,
    type: toastType,
    props: props,
    position: position,
  });
};

const notificationLeftIconView = (notification: any) => {
  switch (_.get(notification, 'additionalData.notificationType', '')) {
    case NotificationTypes.SCHEDULE_OUTAGE:
      return (
        <Icon
          icon="LightningIcon"
          iconColor="white"
          preset="large"
          style={styles.iconStyle}
        />
      );
    case NotificationTypes.SCHEDULE_MAINTENANCE:
      return (
        <Icon
          icon="ScrewdriverIcon"
          iconColor="white"
          preset="large"
          style={styles.iconStyle}
        />
      );
  }
};

const notificationRightIconView = (notification: any) => {
  switch (_.get(notification, 'additionalData.notificationType', '')) {
    case NotificationTypes.SCHEDULE_MAINTENANCE:
    case NotificationTypes.SCHEDULE_OUTAGE:
      return <Icon icon="ChevronRightIcon" iconColor="white" preset="full" />;
    default:
      return <Icon icon="CrossIcon" iconColor="white" />;
  }
};

const onNotificatinonPressed = (props: any) => {
  Toast.hide();
  let navigation = _.get(props, 'navigation', {});
  let notificationType: any = _.get(
    props,
    'notification.additionalData.notification_type',
    '',
  );
  switch (notificationType) {
    case NotificationTypes.SHARE_RELEASE:
      navigation.navigate(ScreenConstants.OPEN_CONTRACTS_SCREEN);
      break;
    case NotificationTypes.SCHEDULE_MAINTENANCE:
      navigation.navigate(ScreenConstants.ALERTS_TAB);
      break;
    case NotificationTypes.SCHEDULE_OUTAGE:
      navigation.navigate(ScreenConstants.ALERTS_TAB);
      break;
    case NotificationTypes.RELEASE_ARRIVED:
      navigation.navigate(ScreenConstants.ALERTS_TAB);
      break;
    default:
      break;
  }
};

// Custom Toast View For One Signal Notification
export const customNotificationView = (
  text1: string,
  text2: string,
  props?: any,
) => {
  return (
    <TouchableOpacity
      style={[styles.dynamicColorContainer, _.get(props, 'customStyle', {})]}
      onPress={() => onNotificatinonPressed(props)}>
      <View style={styles.row}>
        {notificationLeftIconView(_.get(props, 'notification', {}))}
        <View style={styles.flexStyle}>
          <Text style={styles.txtNofiticationTitle} text={text1} />
          <Text style={styles.txtNotificationDes} text={text2} />
        </View>
        <TouchableOpacity
          style={styles.btnCloseStyle}
          onPress={() => Toast.hide()}>
          {notificationRightIconView(_.get(props, 'notification', {}))}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// Custom Toast View
export const customToastView = (text1: string, text2: string) => {
  return (
    <View style={styles.mainContainerStyle}>
      <View style={styles.subContainerStyle}>
        <View style={styles.crossIconViewStyle}>
          <Icon
            icon="CloseIcon"
            style={styles.crossIconStyle}
            iconColor="black"
          />
        </View>
      </View>
      <View style={styles.subContainerStyle2}>
        <View style={styles.rowContainerViewStyle}>
          <Text style={styles.txtTitleStyle} tx={text1} />
          <TouchableOpacity
            style={styles.btnCrossStyle}
            onPress={() => Toast.hide()}>
            <Icon
              icon="CloseIcon"
              style={styles.miniCrossIconStyle}
              iconColor="black"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.desTextStyle} tx={text2} />
      </View>
    </View>
  );
};

export function getTimeInAgo(dateTime: string): string {
  let diffTime = '';
  const regex = /\d+/g; // To get numbers from string
  try {
    const date = moment(dateTime, 'MM-DD-YYYY HH:mm:ss a');
    if (date.isValid()) {
      diffTime = date.fromNow(true);
    } else {
      diffTime = moment(dateTime).fromNow(true);
    }
    let num: any = diffTime.match(regex);
    if (_.isEmpty(num)) {
      num = '1';
    }
    let timeReturn: string = '';
    switch (true) {
      case diffTime.includes('seconds'):
        timeReturn = '1mi';
        break;
      case diffTime.includes('minutes') || diffTime.includes('minute'):
        timeReturn = num + 'mi';
        break;
      case diffTime.includes('hours') || diffTime.includes('hour'):
        timeReturn = num + 'hr';
        break;
      case diffTime.includes('days') || diffTime.includes('day'):
        timeReturn = num + 'd';
        break;
      case diffTime.includes('weeks') || diffTime.includes('week'):
        timeReturn = num + 'w';
        break;
      case diffTime.includes('months') || diffTime.includes('month'):
        timeReturn = num + 'mo';
        break;
      case diffTime.includes('years') || diffTime.includes('year'):
        timeReturn = num + 'y';
        break;
      default:
        break;
    }
    if (!_.isEmpty(timeReturn)) {
      return timeReturn;
    } else {
      return diffTime;
    }
  } catch (error) {
    console.log('ERROR------>', error);
    return 'ago';
  }
}

const isIOS = Platform.OS === 'ios';

export {hasNotch, isIOS};

export const responseError = (
  error: any,
  contextData: any,
  showAlert = true,
) => {
  contextData.setIsGlobalLoading(false);
  let statusCode = _.get(error, 'response.status', 0);
  let message = _.get(error, 'response.data.message');
  if (!message) {
    const data = _.get(error, 'response.data');
    const msg = _.get(error, 'response.message', 'Something went wrong');
    message = data && typeof data === 'string' ? data : msg;
  }
  switch (statusCode) {
    case 404:
      // API end point issue do any action for all api
      customAlert({message: 'API End Point Missing', showAlert});
      break;
    case 403:
      // client is forbidde do any action for all api
      customAlert({
        message: 'Client is forbidden. Error code 403 Found.',
        showAlert,
      });
      break;
    case 401:
      // Unauthorization user will receive empty response

      break;
    case 400:
      // something is wrong in body params
      customAlert({message, showAlert});
      break;
    case APIErrorCodes.SESSION_EXPIRED:
      // unable to refresh token
      customAlert({message, showAlert});
      contextData.resetState?.();
      break;
    default:
      // Other error do any action for all api
      customAlert({message, showAlert});
      break;
  }
};

// data search method
export async function searchData(
  data: SearchResultType[],
  value: string,
): Promise<SearchResultType[]> {
  try {
    const regex = new RegExp(value ?? '', 'i');
    // search callback function
    const onSearch = (title: SearchResultType) => {
      // search value in title using regex with search method of string
      const isMatched = String(title ?? '').search?.(regex) !== -1;
      return isMatched;
    };
    // filter value from data array using search callback function
    const search: SearchResultType[] = _.filter(data, onSearch);
    // remove duplicate value from search array
    const result = _.uniq(search);
    return result;
  } catch (error) {
    return [];
  }
}

// search data using multiple Keys method
export async function searchDataWithMultiKeys(
  data: Array<Record<string, any>>,
  keys: string[],
  value: string,
): Promise<any[]> {
  const regex = new RegExp(value ?? '', 'i');
  const search = data.filter(obj =>
    keys.some(key => {
      const str = String(obj?.[key] ?? '');
      return str === value || str.search?.(regex) !== -1;
    }),
  );
  return search;
}

export const suggestionFormat = (arr: any[], keys: string[]): string[] => {
  let suggestions: string[] = [];
  _.forEach(arr, function (iterator) {
    // pick only expected keys value from object
    const expKeysValue = _.pick(iterator, keys);
    // add values to suggestions array
    suggestions = _.concat(suggestions, _.values(expKeysValue));
  });
  // remove duplicate values
  const uniqueSuggestions = _.uniq(suggestions);
  return uniqueSuggestions;
};

export const strCaptalize = (strData: string) => {
  const str = strData;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return str2;
};

export function convertShortName(str: string): string {
  if (str) {
    return str
      .replace(/[^a-zA-Z ]/g, '')
      .split(' ')
      .map(s => s?.[0] || '')
      .join('')
      .toUpperCase();
  }
  return '';
}

export function insertValue(str: string, index: number, value: string) {
  if (str.length > index) {
    return str.substring(0, index) + value + str.substring(index);
  }
  return str;
}

export const formatPhoneNumber = (phoneNo = '') => {
  if (!_.isEmpty(phoneNo)) {
    phoneNo = phoneNo.replace(/[^0-9]/g, '').substring(0, 10);
    phoneNo = insertValue(phoneNo, 0, '(');
    phoneNo = insertValue(phoneNo, 4, ')');
    phoneNo = insertValue(phoneNo, 5, ' ');
    phoneNo = insertValue(phoneNo, 9, ' - ');
  }
  return phoneNo;
};

// get mode of transport icon using transport name
export function getModeOfTransportIcon(key: string) {
  switch (key?.toLocaleLowerCase()) {
    case ModeOfTransport.RAIL:
      return <Icon preset="icon40Size" icon={'RailIcon'} />;
    case ModeOfTransport.TRUCK:
      return <Icon preset="icon40Size" icon={'TruckIcon'} />;
    case ModeOfTransport.FOB:
      return <Icon preset="icon40Size" icon={'FOBIcon'} />;
    case ModeOfTransport.INVENTORY_TRANSFER:
      return <Icon preset="icon40Size" icon={'InventoryTransferIcon'} />;
    case ModeOfTransport.RAIL_FOB || ModeOfTransport.FOB_RAIL:
      return (
        <View style={styles.row}>
          <Icon preset="icon20Size" icon={'RailIcon'} />
          <Icon preset="icon20Size" icon={'FOBIcon'} />
        </View>
      );
    case ModeOfTransport.TRUCK_FOB || ModeOfTransport.FOB_TRUCK:
      return (
        <View style={styles.row}>
          <Icon preset="icon20Size" icon={'TruckIcon'} />
          <Icon preset="icon20Size" icon={'FOBIcon'} />
        </View>
      );
    case ModeOfTransport.TRUCK_RAIL || ModeOfTransport.RAIL_TRUCK:
      return (
        <View style={styles.row}>
          <Icon preset="icon20Size" icon={'TruckIcon'} />
          <Icon preset="icon20Size" icon={'RailIcon'} />
        </View>
      );
    default:
      return <Icon preset="icon40Size" icon={'TruckRailFOBIcon'} />;
  }
}

export function generateOTPCode(signInDate: string) {
  const str = signInDate;
  return Math.abs(
    Array.from(str).reduce((prev: number, char: string) => {
      const newHash = (prev << 5) - prev + char.charCodeAt(0);
      return newHash & newHash;
    }, 0),
  )
    .toString()
    .slice(-6);
}

// parse releases lines using static data
export function parseReleasesLines(
  contractNumber: string,
  contracts: ContractType[],
  releasesLines: ReleasesLineType[],
): ContractReleasesLineType[] {
  const lines: {[x: string]: ReleasesLineType[]} = {};
  _.forEach(releasesLines, function (releasesLine) {
    const lineNumber = _.get(
      releasesLine,
      ReleasesLineKeys.CONTRACT_LINE_NUMBER,
      '',
    );
    // get current contract from contracts array using contract number and line number
    const contract = _.filter(contracts, {
      [ReleasesLineKeys.CONTRACT_NUMBER]: contractNumber,
      [ReleasesLineKeys.CONTRACT_LINE_NUMBER]: lineNumber,
    });
    // TODO: Add contract number to release lines array, contract number comes from open contract screen -> only for static data
    _.assign(releasesLine, {
      [ReleasesLineKeys.CONTRACT_NUMBER]: contractNumber,
      [ReleasesLineKeys.TITLE_TRANSFER]: _.get(
        contract,
        '[0].' + ContractKeys.TITLE_TRANSFER,
      ),
      [ReleasesLineKeys.CONTRACT_LINE_NUMBER]: `Line ${lineNumber}`,
      [ReleasesLineKeys.QUANTITY_TEXT]: getQuantity(releasesLine),
    });
    const line = _.get(lines, lineNumber, []);
    const lineReleases = [...line, releasesLine];
    _.assign(lines, {[lineNumber]: lineReleases});
  });
  const data: ContractReleasesLineType[] = [];
  _.forEach(lines, (value, key) => {
    const contractLines = value.sort(
      dynamicSort(ReleasesLineKeys.RELEASE_NUMBER),
    );
    // get current contract from contracts array using contract number and line number
    const contract = _.filter(contracts, {
      [ReleasesLineKeys.CONTRACT_NUMBER]: contractNumber,
      [ReleasesLineKeys.CONTRACT_LINE_NUMBER]: key,
    });
    let titleTransfer = _.get(contract, ContractKeys.TITLE_TRANSFER, '');
    let destinationText = '';
    if (titleTransfer === 'origin') {
      destinationText =
        _.get(contract, '[0].' + ContractKeys.ORIGIN_CITY, '') +
        ', ' +
        _.get(contract, '[0].' + ContractKeys.ORIGIN_STATE, '');
    } else {
      destinationText =
        _.get(contract, '[0].' + ContractKeys.ORIGIN_CITY, '') +
        ', ' +
        _.get(contract, '[0].' + ContractKeys.ORIGIN_STATE, '') +
        ' to ' +
        _.get(contract, '[0].' + ContractKeys.DESTINATION_CITY, '') +
        ', ' +
        _.get(contract, '[0].' + ContractKeys.DESTINATION_STATE, '');
    }
    const releaseContract = {
      ..._.get(contract, '[0]', {}),
      scheduleId: contractNumber + '_' + key,
      [ContractKeys.RELEASES_LINES]: contractLines,
      [ContractKeys.CONTRACT_LINE_NUMBER]: `Line ${key}`,
      [ContractKeys.DESTINATION_TEXT]: destinationText,
    };
    data.push(releaseContract);
  });
  return data;
}

// remove object element from an array
export const removeElementFromArray = (arr: any[], key: string, val: any) => {
  let index = _.findIndex(arr, item => {
    return item?.[key] === val;
  });
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
};

// Intersect if we got two or more transport in one line.
export const getIntersactionModeOfTransport = (arr: any[], key: string) => {
  let uniqueTransport: any = [];
  arr.forEach(element => {
    if (uniqueTransport && uniqueTransport.length > 0) {
      if (uniqueTransport.includes(element?.[key]) === false) {
        uniqueTransport.push(element?.[key]);
      }
    } else {
      uniqueTransport.push(element?.[key]);
    }
  });
  if (uniqueTransport.length === 1) {
    return `${uniqueTransport[0]}`.toLowerCase();
  } else if (uniqueTransport.length === 2) {
    return `${uniqueTransport[0] + ' ' + uniqueTransport[1]}`.toLowerCase();
  } else {
    return '';
  }
};

export function getUniqueListBy(arr: any[], key: string) {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}

export function dynamicSort(property: any) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a: any, b: any) {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export function fixedFloatVal(val: number): number {
  try {
    return parseFloat(val.toFixed(2));
  } catch (error) {
    return val;
  }
}

// remove string value from an array
export const removeStringFromArray = (arr: string[], val: string) => {
  let index = _.findIndex(arr, item => {
    return item === val;
  });
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
};

// to get ISO format string date
export const getISODate = (): String => {
  return new Date().toISOString();
};

// To get Quantity from release object
export const getQuantity = (item: ReleasesLineType) => {
  let quantity: string = '';
  quantity = _.get(item, ReleasesLineKeys.SHIPPED_QUANTITY, '').toString();
  if (_.isEmpty(quantity)) {
    quantity = _.get(item, ReleasesLineKeys.SCHEDULE_QUANTITY, '').toString();
  }
  if (_.isEmpty(quantity)) {
    return '';
  } else {
    return quantity + ' ' + _.get(item, ReleasesLineKeys.UOM, '');
  }
};

// To generate unique id
export const hash = (str: string): number =>
  Math.abs(
    Array.from(str).reduce((prev: number, char: string) => {
      const newHash = (prev << 5) - prev + char.charCodeAt(0);

      return newHash & newHash;
    }, 0),
  );
export function addMetricsCount(
  CONTRACT_OBJ: ScreenBlockCardProps[],
  metrics: MetricsType[],
): ScreenBlockCardProps[] {
  try {
    const metricsObj = metrics?.reduce((previousObject, currentObject) => {
      return Object.assign(previousObject, {
        [_.get(currentObject, 'name', '')]:
          _.get(currentObject, 'value', '0') || '0',
      });
    }, {});

    return CONTRACT_OBJ.map((contract: ScreenBlockCardProps) => ({
      ...contract,
      count: _.get(metricsObj, contract.key || 'any', '0') || '0',
    }));
  } catch (error) {
    return CONTRACT_OBJ;
  }
}

export const IS_IOS: boolean = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
const {width, height}: {width: number; height: number} =
  Dimensions.get('window');
export const IPhoneX: boolean = IS_IOS && height === 812 && width === 375;

export function searchReleasesLines(
  searchText: string,
  releasesLines: ContractReleasesLineType[],
  keys: ReleasesLineKeys[],
  isExactSearch = false,
) {
  const regex = new RegExp(searchText ?? '', 'i');
  let lines: ContractReleasesLineType[] = releasesLines.map(
    (item: ContractReleasesLineType) => {
      const search = item.releasesLines.filter((obj: any) =>
        keys.some(key => {
          const isExactMatched = obj?.[key] && String(obj?.[key]).match(regex);
          return isExactSearch
            ? isExactMatched
            : isExactMatched || String(obj?.[key] ?? '').search?.(regex) !== -1;
        }),
      );
      return _.assign({}, item, {
        releasesLines: search,
      });
    },
  );
  return lines.filter(
    (value: ContractReleasesLineType) => value?.releasesLines?.length,
  );
}

// Get all user specific titles subtitles massage and much more
export function getUserTypeDetails(isInternalUser = true): {
  title: string;
  subTitle: string;
} {
  let details = {
    title: 'SELECT_ACCOUNT',
    subTitle: 'PLEASE_SELECT_ACCOUNT',
  };
  if (!isInternalUser) {
    details = {
      title: 'NO_ACCOUNT_ACCESS',
      subTitle: 'DBS_IN_PROCESS',
    };
  }
  return details;
}

// for sorting an array.
export function compare(a: any, b: any, key: string) {
  if (a?.[key] < b?.[key]) {
    return -1;
  }
  if (a?.[key] > b?.[key]) {
    return 1;
  }
  return 0;
}

export function getStatusBarStyle(isLoggedIn: boolean) {
  let statusBarStyle: ViewStyle = styles.safeAreaWhite;
  let statusBarColor: string = color.white;

  if (isLoggedIn) {
    statusBarStyle = styles.safeAreaView;
    statusBarColor = color.dim;
  }
  return {
    statusBarStyle,
    statusBarColor,
  };
}
export function filterExpiringContract(
  contracts: ContractType[],
  next30Date: any,
) {
  return contracts.filter(item => {
    const isExpiring = moment(
      _.get(item, ContractKeys.CONTRACT_END_DATE),
    ).isSameOrBefore(next30Date);
    return isExpiring;
  });
}

export function formatDestinationCityState(data: any) {
  const destinationCityState = {};
  let cityState = _.get(data, ReleasesLineKeys.DESTINATION_CITY_STATE, '');
  cityState = cityState.split(', ');
  const city = _.get(cityState, '[0]', '');
  const state = _.get(cityState, '[1]', '');
  if (city && state) {
    _.assign(destinationCityState, {
      [ReleasesLineKeys.DESTINATION_CITY]: city,
      [ReleasesLineKeys.DESTINATION_STATE]: state,
    });
  }
  return destinationCityState;
}

export function formatOriginCityState(data: any) {
  const originCityState = {};
  let cityState = _.get(data, ReleasesLineKeys.ORIGIN_CITY_STATE, '');
  cityState = cityState.split(', ');
  const city = _.get(cityState, '[0]', '');
  const state = _.get(cityState, '[1]', '');
  if (city && state) {
    _.assign(originCityState, {
      [ReleasesLineKeys.GSP_LATITUDE]: city,
      [ReleasesLineKeys.GSP_LONGITUDE]: state,
    });
  }
  return originCityState;
}

export function isValidLatLng(values: ReleasesLineType): boolean {
  let isValid = false;
  const lat = parseFloat(_.get(values, [ReleasesLineKeys.GSP_LATITUDE], ''));
  const lng = parseFloat(_.get(values, [ReleasesLineKeys.GSP_LONGITUDE], ''));

  if (!_.isNaN(Number(lat)) && !_.isNaN(Number(lng))) {
    isValid = true;
  }
  return isValid;
}

// get mode of transport icon name using transport name
export function getModeOfTransportIconName(key: string) {
  switch (key?.toLocaleLowerCase()) {
    case ModeOfTransport.RAIL:
      return 'RailIcon';
    case ModeOfTransport.FOB:
      return 'FOBIcon';
    case ModeOfTransport.INVENTORY_TRANSFER:
      return 'InventoryTransferIcon';
    default:
      return 'TruckIcon';
  }
}

export function getProgressBarWidth(
  quantity: number,
  shippedQuantity: number,
): string {
  let barWidth: number = 0;
  if (quantity) {
    const value = (shippedQuantity * 100) / quantity;
    if (!_.isNaN(value)) {
      barWidth = fixedFloatVal(value);
    }
  }
  return `${barWidth}%`;
}

export function isValidNumber(value: any): boolean {
  if (value) {
    if (!_.isNaN(Number(value))) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Convert date into mmm-dd-yyyy format.
export function changeDateFormat(date: any): string {
  let formattedDate: any = date;
  if (!isNaN(date)) {
    formattedDate = moment(date).format(DATE_FORMAT);
  }
  return formattedDate;
}

// Convert date & time into mmm-dd-yyyy format.
export function changeDateAndTimeFormat(date: any): string {
  let formattedDate: any = date;
  if (!isNaN(date)) {
    formattedDate = moment(date).format(DATE_TIME_FORMAT);
  }
  return formattedDate;
}

// check date is available in given duration or not
export const checkDateInBetween = (
  compareDate: any,
  startDate: any,
  endDate: any,
) => {
  return (
    compareDate.isBetween(startDate, endDate) ||
    compareDate.isSame(startDate) ||
    compareDate.isSame(endDate)
  );
};
// format specific text for search
export function formatSpecificText(arr: string[]) {
  const lineIndex = arr.findIndex((item: string) =>
    item.toLowerCase().includes('line'),
  );
  if (lineIndex !== -1) {
    const line = _.get(arr, `[${lineIndex + 1}]`, '');
    const lineText = _.get(arr, `[${lineIndex}]`, '');
    if (line && !_.isNaN(Number(line))) {
      // remove line number
      arr.splice(lineIndex, 2);
      arr.push(lineText + ' ' + line);
    }
  }
  return arr;
}

// search dynamic data using multiple Keys method
export function dynamicSearchWithMultiKeys(
  data: Array<Record<string, any>>,
  keys: string[],
  value: string,
): any[] {
  let searchResult: any[] = data;
  let searchArr = value?.trim()?.toLowerCase()?.split(' ') || [];
  searchArr = _.uniq(searchArr);
  searchArr = formatSpecificText(searchArr);
  _.forEach(searchArr, (searchTextVal: string) => {
    searchResult = _.filter(searchResult, obj =>
      _.some(keys, key => {
        const str = String(_.get(obj, `${[key]}`, '')).toLowerCase();
        if (str) {
          // verify if search text is included in the string
          const isMatched =
            str.includes(searchTextVal) || searchTextVal.includes(str);
          return isMatched;
        } else {
          return false;
        }
      }),
    );
  });
  return searchResult;
}

/**
 * parse shipments data
 **/
export function parseShipments(
  shipments: ReleasesLineType[],
): ReleasesLineType[] {
  _.forEach(shipments, function (shipment) {
    const lineNumber = _.get(shipment, ReleasesLineKeys.CONTRACT_LINE_NUMBER);
    // assign contract line number and quantity text to shipment object
    _.assign(shipment, {
      [ReleasesLineKeys.QUANTITY_TEXT]: getQuantity(shipment),
      [ReleasesLineKeys.CONTRACT_LINE_NUMBER]: `Line ${lineNumber}`,
    });
  });
  return shipments;
}

/**
 * get valid regular expression text
 */
export function getValidRegExpText(searchText: string) {
  let reText: any = '';
  try {
    reText = RegExp(searchText ?? '', 'i');
  } catch (error) {
    console.log('error', error);
  }
  return reText;
}
