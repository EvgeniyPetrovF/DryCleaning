import React, {FC} from 'react';
import {View} from 'react-native';
import CloseButton from '../../../../components/CloseButton';
import ImageGallery from '../../../../components/ImageGallery';
import TextWrapper from '../../../../components/TextWrapper';
import {IDryCleaner} from '../../../../models/types';
import {styles} from './styles';

type Props = {
  deleteDryCleaner?: (id: string) => void;
};

const DryCleaner: FC<IDryCleaner & Props> = ({
  id,
  name,
  description,
  images,
  services,
  deleteDryCleaner,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextWrapper style={styles.name}>Name: {name}</TextWrapper>
      </View>
      <TextWrapper>Description: {description}</TextWrapper>
      {services?.map(service => (
        <View key={service.id} style={styles.service}>
          <TextWrapper style={styles.serviceItem}>
            Service: {service?.title}
          </TextWrapper>
          <TextWrapper style={styles.serviceItem}>
            Price: {service?.price}
          </TextWrapper>
        </View>
      ))}
      {!!images?.length && <ImageGallery label="Images: " images={images} />}
      {deleteDryCleaner && (
        <CloseButton
          style={styles.deleteButton}
          onPress={() => {
            deleteDryCleaner(id);
          }}
        />
      )}
    </View>
  );
};

export default DryCleaner;
