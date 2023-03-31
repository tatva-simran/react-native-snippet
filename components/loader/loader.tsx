import React, {FC, useContext} from 'react';
import {
  View,
  ActivityIndicator,
  ActivityIndicatorProps,
  ViewProps,
} from 'react-native';
import {GlobalContext} from '../../contexts';
import {color, ColorType} from '../../theme';
import {styles} from './loader-style';

export function Loader() {
  const contextData: any = useContext(GlobalContext);
  const {isGlobalLoading} = contextData;

  return (
    isGlobalLoading && (
      <View style={styles.loader}>
        <ActivityIndicator color="gray" size="large" />
      </View>
    )
  );
}

export const SimpleLoader: FC<
  {color?: ColorType; show?: boolean} & ViewProps & ActivityIndicatorProps
> = ({show, color: colorCode = 'graySeprator', style, size = 'large'}) => {
  return show ? (
    <View style={[styles.simpleLoader, style]}>
      <ActivityIndicator color={color[colorCode]} size={size} />
    </View>
  ) : null;
};
