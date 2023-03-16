import React, {memo} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {LocalImage} from '../../models/types';
import TextWrapper from '../TextWrapper';
import {styles} from './styles';

const crossIcon = require('../../assets/images/cross-sign.png');

interface ImageGalleryProps {
  images: LocalImage[];
  label?: string;
  deleteImage?: (image: LocalImage) => void;
  onAddPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const ImageGallery = ({
  images,
  label,
  deleteImage,
  style,
  onAddPress,
}: ImageGalleryProps) => {
  return (
    <View>
      {!!label && <TextWrapper style={styles.label}>{label}</TextWrapper>}
      <View style={[styles.imagesContainer, style]}>
        {onAddPress && (
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.flexCenter} onPress={onAddPress}>
              <View style={styles.addBtn}>
                <TextWrapper style={styles.addSign}>+</TextWrapper>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {images.map(image => {
          const {uri, id, base64} = image;
          const base64Image = `data:image/jpeg;base64,${base64}`;
          return (
            <View key={id ?? uri} style={styles.imageContainer}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={styles.image}
                source={{uri: base64Image}}
              />
              {deleteImage && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteImage(image)}>
                  <FastImage style={styles.deleteImage} source={crossIcon} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default memo(ImageGallery);
