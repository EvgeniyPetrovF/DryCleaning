import React from 'react';
import {Text, TextProps} from 'react-native';
import {styles} from './styles';

const TextWrapper = ({style, ...props}: TextProps) => {
  return (
    <Text allowFontScaling={false} style={[styles.text, style]} {...props}>
      {props.children}
    </Text>
  );
};

export default TextWrapper;
