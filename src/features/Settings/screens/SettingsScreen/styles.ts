import {StyleSheet} from 'react-native';
import {dimensions, text} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: text.size.large,
    marginBottom: dimensions.offset.normal,
  },
});
