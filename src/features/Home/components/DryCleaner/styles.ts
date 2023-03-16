import {StyleSheet} from 'react-native';
import {colors, dimensions, text} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: dimensions.borderRadius.default,
    padding: dimensions.offset.normal,
  },
  header: {
    marginBottom: dimensions.offset.small,
  },
  name: {
    fontWeight: text.weight.medium,
    fontSize: text.size.big,
  },
  service: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceItem: {
    width: '50%',
  },
  deleteButton: {
    position: 'absolute',
    right: '3%',
    top: '3%',
  },
});
