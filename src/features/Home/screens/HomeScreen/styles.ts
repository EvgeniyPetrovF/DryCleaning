import {StyleSheet} from 'react-native';
import {colors, dimensions, text} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dimensions.offset.normal,
  },
  listContainer: {
    marginVertical: dimensions.offset.normal,
    width: '100%',
  },
  listHeader: {
    fontSize: text.size.big,
    fontWeight: text.weight.bold,
    marginBottom: dimensions.offset.normal,
  },
  separator: {
    borderBottomColor: colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: dimensions.offset.small,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: dimensions.offset.normal,
  },
});
