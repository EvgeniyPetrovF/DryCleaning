import {StyleSheet} from 'react-native';
import {colors, dimensions, text} from '../../constants';

export const styles = StyleSheet.create({
  button: {
    minWidth: '60%',
    backgroundColor: colors.primary,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimensions.borderRadius.small,
    paddingHorizontal: dimensions.offset.normal,
  },
  disabledButton: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: text.size.big,
    color: colors.white,
  },
});
