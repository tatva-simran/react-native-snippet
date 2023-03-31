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
  btnCheckboxStyle: ViewStyle;
  inputContainer: ViewStyle;
  contentConatinerStyle: ViewStyle;
  flexView: ViewStyle;
  centerView: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  centerView: {
    flex: 0.75,
    justifyContent: 'center',
  },
  flexView: {flex: 1},
  contentConatinerStyle: {
    flex: 1,
  },
  root: {flex: 1, backgroundColor: color.white},
  loginTxtStyle: {
    fontFamily: typography.secondary,
    color: color.black,
    marginLeft: normalize(20),
    fontSize: global.font_20,
    lineHeight: 25,
    marginTop: normalize(25),
  },
  accountTxtStyle: {
    fontFamily: typography.primary,
    color: color.lightText,
    marginLeft: normalize(20),
    fontSize: global.font_16,
    lineHeight: 18,
    marginTop: normalize(6),
    marginBottom: normalize(10),
  },
  txtInputStyle: {
    backgroundColor: color.inputGray,
    height: verticalScale(54),
    marginTop: verticalScale(12),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  inputContainer: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(5),
  },
});

export {styles};
