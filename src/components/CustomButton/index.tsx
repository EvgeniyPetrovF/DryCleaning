import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {colors} from '../../constants';
import Loader from '../Loader';
import TextWrapper from '../TextWrapper';
import {styles} from './styles';

interface CustomButtonProps extends TouchableOpacityProps {
  label?: string;
  textStyle?: StyleProp<TextStyle>;
  pending?: boolean;
}

const CustomButton = ({
  onPress,
  disabled,
  pending,
  label,
  style,
  textStyle,
  children,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled && styles.disabledButton]}
      disabled={disabled}
      {...props}>
      {pending ? (
        <Loader color={colors.white} />
      ) : (
        label && (
          <TextWrapper style={[styles.buttonText, textStyle]}>
            {label}
          </TextWrapper>
        )
      )}

      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;
