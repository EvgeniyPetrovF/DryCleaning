import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import TextWrapper from '../TextWrapper';
import {styles} from './styles';

interface LoaderProps {
  label?: string;
  color?: string;
}

const Loader = ({label, color}: LoaderProps) => {
  return (
    <View style={styles.centeredView}>
      <ActivityIndicator color={color} />
      <TextWrapper style={[styles.text, {color}]}>
        {label || 'Loading'}...
      </TextWrapper>
    </View>
  );
};

export default Loader;
