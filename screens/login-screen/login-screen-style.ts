import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {color, typography, verticalScale} from '../../theme';
import * as global from '../../theme/font';
import {normalize} from '../../utils';

interface Styles {
  root: ViewStyle;
  loginTxtStyle: TextStyle;
  accountTxtStyle: TextStyle;
  txtInputStyle: TextStyle;
  buttonContainer: ViewStyle;
  recaptchaViewStyle: ViewStyle;
  btnCheckboxStyle: ViewStyle;
  correctIconStyle: ImageStyle;
  txtRobotStyle: TextStyle;
  captchaIconStyle: ImageStyle;
  webView: ViewStyle;
  loadingViewStyle: ViewStyle;
  inputContainer: ViewStyle;
  centerView: ViewStyle;
  headerStyle: ViewStyle;
  containerStyle: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  root: {flex: 1, backgroundColor: color.white},
  headerStyle: {
    marginBottom: 0,
  },
  containerStyle: {
    flex: 0.9,
    justifyContent: 'center',
  },
  centerView: {
    flex: 0.8,
    justifyContent: 'center',
  },
  loginTxtStyle: {
    fontFamily: typography.secondary,
    color: color.black,
    marginLeft: normalize(20),
    fontSize: global.font_20,
    lineHeight: 25,
  },
  accountTxtStyle: {
    fontFamily: typography.primary,
    color: color.lightText,
    marginLeft: normalize(20),
    fontSize: global.font_16,
    lineHeight: 18,
    marginTop: normalize(6),
  },
  txtInputStyle: {
    marginTop: verticalScale(15),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  recaptchaViewStyle: {
    marginTop: normalize(8),
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: normalize(10),
  },
  btnCheckboxStyle: {
    height: normalize(20),
    width: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.white,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: normalize(20),
  },
  correctIconStyle: {
    tintColor: color.white,
    height: normalize(30),
    width: normalize(30),
  },
  txtRobotStyle: {
    marginLeft: normalize(10),
    color: color.lightText,
    flex: 1,
  },
  captchaIconStyle: {
    height: normalize(50),
    width: normalize(50),
  },
  webView: {
    flex: 1,
    backgroundColor: color.dimBackground,
  },
  loadingViewStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  inputContainer: {
    paddingHorizontal: normalize(20),
  },
});

export {styles};
