import React, {FC, useCallback, useEffect, useState} from 'react';
import CustomButton from '../../../../components/CustomButton';
import DefaultModal from '../../../../components/DefaultModal';
import ImageGallery from '../../../../components/ImageGallery';
import ImagePickerModal, {
  ImagePickerAction,
} from '../../../../components/ImagePickerModal';
import TextInputWrapper from '../../../../components/TextInputWrapper';
import {IDryCleaner, IService, LocalImage} from '../../../../models/types';
import ServicesInputs from '../ServicesInputs';
import {styles} from './styles';

export interface DryCleanerForm {
  visible: boolean;
  buttonTitle: string;
  onButtonPress: (dryCleaner: IDryCleaner) => Promise<void>;
  closeModal: () => void;
  dryCleaner?: IDryCleaner;
}

const DryCleanerForm: FC<DryCleanerForm> = ({
  buttonTitle,
  visible,
  onButtonPress,
  closeModal,
  dryCleaner,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState<IService[]>([]);
  const [images, setImages] = useState<LocalImage[]>([]);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    setName(dryCleaner?.name ?? '');
    setDescription(dryCleaner?.description ?? '');
    setImages(dryCleaner?.images ?? []);
    setServices(dryCleaner?.services ?? []);
  }, [dryCleaner]);

  const buttonHandler = async () => {
    await onButtonPress({
      name,
      description,
      id: dryCleaner?.id as string,
      services,
      images,
    });
    setName('');
    setDescription('');
    setImages([]);
    setServices([]);
    closeModal();
  };

  const addImages = async (
    options: ImagePickerAction['options'],
    callback: ImagePickerAction['callback'],
  ) => {
    try {
      const result = await callback(options);
      if (result.assets) {
        setImages([
          ...images,
          ...result.assets.map<LocalImage>(asset => ({
            ...asset,
            currentStatus: 'new',
          })),
        ]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setImageModalVisible(false);
    }
  };

  const deleteImage = useCallback(
    async (image: LocalImage) => {
      if (image.currentStatus === 'new') {
        setImages(images.filter(item => item.uri !== image.uri));
      } else {
        const clearImages = images.map<LocalImage>(item =>
          item?.id === image.id ? {...item, currentStatus: 'deleted'} : item,
        );
        setImages(clearImages);
      }
    },
    [images],
  );

  const openImagePickerModal = useCallback(() => {
    setImageModalVisible(true);
  }, []);

  const closeImagePickerModal = useCallback(() => {
    setImageModalVisible(false);
  }, []);

  const filteredImages = images.filter(
    image => image.currentStatus !== 'deleted',
  );

  return (
    <DefaultModal isVisible={visible} closeModal={closeModal}>
      <TextInputWrapper
        containerStyle={styles.bottomOffset}
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInputWrapper
        containerStyle={styles.bottomOffset}
        style={styles.textArea}
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <ServicesInputs
        style={styles.bottomOffset}
        label="Services"
        services={services}
        setServices={setServices}
      />
      <ImageGallery
        label="Images"
        images={filteredImages}
        deleteImage={deleteImage}
        onAddPress={openImagePickerModal}
      />
      <CustomButton label={buttonTitle} onPress={buttonHandler} />
      <ImagePickerModal
        isVisible={imageModalVisible}
        closeModal={closeImagePickerModal}
        onButtonPress={addImages}
      />
    </DefaultModal>
  );
};

export default DryCleanerForm;
