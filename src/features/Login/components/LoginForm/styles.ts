import {StyleSheet} from 'react-native';
import {dimensions} from '../../../../constants';

export const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOffset: {
    marginBottom: dimensions.offset.large,
  },
});
