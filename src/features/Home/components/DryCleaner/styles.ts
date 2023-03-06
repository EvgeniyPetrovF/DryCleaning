import {StyleSheet} from 'react-native';
import {dimensions, text} from '../../../../constants';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: dimensions.offset.tiny,
    marginBottom: dimensions.offset.small,
  },
  nickname: {
    fontWeight: text.weight.medium,
  },
});
