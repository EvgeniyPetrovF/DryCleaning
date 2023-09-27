import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

const crossIcon = require('../../assets/images/cross-sign.png');

const CloseButton = ({
  onPress,
  disabled,
  style,
  ...props
}: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled && styles.disabledButton]}
      disabled={disabled}
      {...props}>
      <FastImage style={styles.deleteImage} source={crossIcon} />
    </TouchableOpacity>
  );
};

export default CloseButton;
