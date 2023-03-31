import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {color, typography} from '../../theme';
import * as global from '../../theme/font';
import {normalize} from '../../utils/normalize';

interface Styles {
  containerStyle: ViewStyle;
  modalContainerView: ViewStyle;
  centerViewStyle: ViewStyle;
  txtTitleStyle: TextStyle;
  txtDesStyle: TextStyle;
  btnBottomStyle: ViewStyle;
  centerIconStyle: ImageStyle;
  dotViewStyle: ViewStyle;
  crossBtnStyle: ViewStyle;
  containerViewStyle: ViewStyle;
  closeIcon: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
  closeIcon: {
    stroke: color.black,
    strokeWidth: 2,
  } as any,
  containerStyle: {
    flex: 1,
  },
  containerViewStyle: {
    flexDirection: 'row',
    width: '100%',
  },
  modalContainerView: {
    flex: 1,
    backgroundColor: color.dimBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerViewStyle: {
    backgroundColor: color.white,
    borderRadius: 12,
    width: '85%',
    paddingBottom: -2,
    borderColor: color.transparent,
  },
  txtTitleStyle: {
    fontFamily: typography.secondary,
    fontWeight: '700',
    color: color.black,
    textAlign: 'center',
    marginHorizontal: normalize(12),
    fontSize: global.font_19,
  },
  txtDesStyle: {
    fontFamily: typography.primary,
    fontWeight: '400',
    color: color.labelColor,
    textAlign: 'center',
    fontSize: global.font_14,
    marginHorizontal: normalize(12),
    marginTop: normalize(5),
    marginBottom: normalize(-7),
  },
  btnBottomStyle: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: color.primary,
    flex: 1,
    height: normalize(50),
  },
  centerIconStyle: {
    marginTop: normalize(-10),
    marginBottom: normalize(10),
    alignSelf: 'center',
  },
  dotViewStyle: {
    backgroundColor: color.primary,
    height: normalize(15),
    width: normalize(15),
    borderRadius: normalize(7.5),
    position: 'absolute',
    top: normalize(35),
    alignSelf: 'center',
    left: '54%',
  },
  crossBtnStyle: {
    height: normalize(30),
    width: normalize(30),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(10),
    marginRight: normalize(10),
    borderRadius: normalize(15),
    backgroundColor: color.borderColor,
  },
});

export {styles};
