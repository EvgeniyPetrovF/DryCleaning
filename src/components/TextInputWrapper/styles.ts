import {StyleSheet} from 'react-native';
import {colors, dimensions, text} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    paddingHorizontal: dimensions.offset.small,
    height: 50,
    fontSize: text.size.middle,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: dimensions.borderRadius.default,
  },
  errorText: {
    color: colors.error,
    position: 'absolute',
    bottom: -10,
  },
});
