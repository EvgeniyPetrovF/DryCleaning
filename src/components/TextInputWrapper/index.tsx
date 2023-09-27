import React, {useEffect} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import useAnimatedStyleProperty from '../../common/hooks/useAnimatedStyleProperty';
import {colors} from '../../constants';
import TextWrapper from '../TextWrapper';
import {styles} from './styles';

interface TextInputWrapperProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const animationDuration = 300;

const TextInputWrapper = ({
  label,
  style,
  error,
  onFocus,
  onBlur,
  containerStyle,
  ...props
}: TextInputWrapperProps) => {
  const {animatedValue: animatedColor, animatedStyle: animatedTitleStyle} =
    useAnimatedStyleProperty('color', colors.black);
  const {animatedValue: errorOpacity, animatedStyle: animatedErrorStyle} =
    useAnimatedStyleProperty('opacity', 0);

  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderColor: animatedColor.value,
    };
  });

  const customOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.(e);
    animatedColor.value = withTiming(colors.black, {
      duration: animationDuration,
    });
  };

  const customOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus?.(e);
    animatedColor.value = withTiming(colors.primary, {
      duration: animationDuration,
    });
  };

  useEffect(() => {
    if (error) {
      errorOpacity.value = withTiming(1, {duration: animationDuration});
    } else {
      errorOpacity.value = 0;
    }
  }, [error, errorOpacity]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Animated.Text style={animatedTitleStyle}>
          <TextWrapper>{label}</TextWrapper>
        </Animated.Text>
      )}
      <Animated.View
        style={[
          styles.inputContainer,
          animatedBorderStyle,
          {borderColor: error ? colors.error : animatedColor.value},
        ]}>
        <TextInput
          allowFontScaling={false}
          style={[styles.input, style]}
          onBlur={customOnBlur}
          onFocus={customOnFocus}
          {...props}
        />
      </Animated.View>
      {error && (
        <Animated.View style={animatedErrorStyle}>
          <TextWrapper style={styles.errorText}>{error}</TextWrapper>
        </Animated.View>
      )}
    </View>
  );
};

export default TextInputWrapper;
