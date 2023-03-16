import {StyleSheet} from 'react-native';
import {colors, dimensions, text} from '../../../../constants';

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    zIndex: 1,
    marginRight: dimensions.offset.small,
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
  },
  label: {
    color: colors.black,
    fontWeight: text.weight.thin,
  },
  addBtn: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: dimensions.borderRadius.default,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: dimensions.offset.small,
  },
  btnTitle: {
    color: colors.primary,
    fontWeight: text.weight.medium,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTitle: {
    width: '70%',
  },
  list: {
    flexGrow: 0,
  },
  servicePrice: {
    width: '20%',
  },
  itemContainer: {
    width: '100%',
    height: 50,
    marginBottom: dimensions.offset.tiny,
  },
  input: {
    width: '100%',
    heigth: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
