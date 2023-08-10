import {StyleSheet} from 'react-native';
import {colors, dimensions, text} from '../../constants';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: dimensions.offset.small,
  },
  text: {
    color: colors.white,
    fontSize: text.size.middle,
  },
});
