import React from 'react';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import CustomButton from '../CustomButton';
import DefaultModal, {DefaultModalProps} from '../DefaultModal';
import {styles} from './styles';

export interface ImagePickerAction {
  title: string;
  callback: typeof launchCamera | typeof launchImageLibrary;
  options: CameraOptions | ImageLibraryOptions;
}

interface ImagePickerModal extends DefaultModalProps {
  onButtonPress: (
    options: ImagePickerAction['options'],
    callback: ImagePickerAction['callback'],
  ) => void;
}

const actions: ImagePickerAction[] = [
  {
    title: 'Take Image',
    callback: launchCamera,
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: true,
    },
  },
  {
    title: 'Select Image',
    callback: launchImageLibrary,
    options: {
      selectionLimit: 5,
      mediaType: 'photo',
      includeBase64: true,
    },
  },
];

const ImagePickerModal = ({
  isVisible,
  closeModal,
  onButtonPress,
}: ImagePickerModal) => {
  return (
    <DefaultModal isVisible={isVisible} closeModal={closeModal}>
      {actions.map(({title, callback, options}) => {
        return (
          <CustomButton
            label={title}
            key={title}
            style={styles.button}
            onPress={() => onButtonPress(options, callback)}
          />
        );
      })}
    </DefaultModal>
  );
};

export default ImagePickerModal;
