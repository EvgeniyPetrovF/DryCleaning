import React, {FC} from 'react';
import {View} from 'react-native';
import TextWrapper from '../../../../components/TextWrapper';
import {styles} from './styles';

export interface IDryCleaner {
  id: string;
  name: string;
  description?: string;
  services: string;
  photos?: string[];
}

const DryCleaner: FC<IDryCleaner> = ({name, description}) => {
  return (
    <View>
      <View style={styles.header} />
      <TextWrapper>{name}</TextWrapper>
      <TextWrapper>{description}</TextWrapper>
    </View>
  );
};

export default DryCleaner;
