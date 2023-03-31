import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {color, typography} from '../theme';
import * as global from '../theme/font';

const commonStyles = StyleSheet.create({
  
  flexStyle: {
    flex: 1,
  },
  btnCloseStyle: {
    justifyContent: 'center',
  },
  centerTxt: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainerStyle: {
    height: 80,
    width: '90%',
    backgroundColor: color.white,
    elevation: 4,
    shadowOffset: {height: 4, width: 2},
    shadowRadius: 4,
    shadowOpacity: 0.7,
    shadowColor: color.errorRed,
    borderWidth: 1,
    borderColor: color.errorRed,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainerStyle: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
    backgroundColor: color.dimRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  crossIconViewStyle: {
    height: 25,
    width: 25,
    borderRadius: 20,
    backgroundColor: color.errorRed,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIconStyle: {
    height: 20,
    width: 20,
    tintColor: color.white,
  },
  txtTitleStyle: {
    fontFamily: typography?.primary,
    fontSize: global.font_15,
    fontWeight: '700',
    lineHeight: 20,
    color: color.darkRed,
  },
  rowContainerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainerStyle2: {flex: 1, marginRight: 16},
  safeAreaView: {
    backgroundColor: color.dim,
  },
});

export {commonStyles};
