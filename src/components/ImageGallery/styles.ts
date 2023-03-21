import {StyleSheet} from 'react-native';
import {colors, dimensions, text} from '../../constants';

export const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: dimensions.offset.tiny,
    marginBottom: dimensions.offset.small,
  },
  imageContainer: {
    width: 140,
    height: 140,
  },
  deleteButton: {
    position: 'absolute',
    right: dimensions.offset.tiny,
    top: dimensions.offset.tiny,
  },
  deleteImage: {
    width: 16,
    height: 16,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: dimensions.borderRadius.default,
  },
  label: {
    alignSelf: 'flex-start',
    color: colors.black,
    fontWeight: text.weight.thin,
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: dimensions.borderRadius.default,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSign: {
    color: colors.primary,
    fontSize: text.size.large,
  },
});
