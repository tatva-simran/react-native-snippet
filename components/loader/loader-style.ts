import {StyleSheet} from 'react-native';
import {normalize} from '../../utils';

export const styles = StyleSheet.create({
  loader: {
    flex: 1,
    bottom: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  simpleLoader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(15),
  },
});
