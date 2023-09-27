import {StyleSheet} from 'react-native';
import {colors, dimensions} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: dimensions.offset.small,
    backgroundColor: colors.white,
    borderRadius: dimensions.borderRadius.default,
    padding: dimensions.offset.big,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
