import {Dimensions} from 'react-native';
import {scaleForFont} from './scale';

const {width, height}: {width: number; height: number} =
  Dimensions.get('window');

export const WINDOW = {width, height};
export const ScreenWidth: number = width;
export const ScreenHeight: number = height;

export const font_6 = scaleForFont(6);
export const font_8 = scaleForFont(8);
export const font_9 = scaleForFont(9);
export const font_10 = scaleForFont(10);
export const font_11 = scaleForFont(11);
export const font_12 = scaleForFont(12);
export const font_13 = scaleForFont(13);
export const font_14 = scaleForFont(14);
export const font_15 = scaleForFont(15);
export const font_16 = scaleForFont(16);
export const font_17 = scaleForFont(17);
export const font_18 = scaleForFont(18);
export const font_19 = scaleForFont(19);
export const font_20 = scaleForFont(20);
export const font_22 = scaleForFont(22);
export const font_24 = scaleForFont(24);
export const font_26 = scaleForFont(26);
export const font_28 = scaleForFont(28);
export const font_29 = scaleForFont(29);
export const font_32 = scaleForFont(32);
export const font_36 = scaleForFont(36);
export const font_40 = scaleForFont(40);
export const font_48 = scaleForFont(48);
export const font_53 = scaleForFont(53);
