import {StyleSheet} from 'react-native';
import {colors, dimensions, text} from '../../constants';

export const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimensions.borderRadius.small,
    paddingHorizontal: dimensions.offset.tiny,
  },
  disabledButton: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: text.size.big,
    color: colors.white,
  },
  deleteImage: {
    width: 16,
    height: 16,
  },
});
