import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TextWrapper from '../../../../components/TextWrapper';
import {HomeStackParamList} from '../../../../models/navigation';
import DryCleaner from '../../components/DryCleaner';
import {styles} from './styles';

type Props = NativeStackScreenProps<HomeStackParamList, 'Orders'>;

const OrdersScreen: FC<Props> = ({route}) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <DryCleaner {...item} />
      <TextWrapper>Order</TextWrapper>
    </SafeAreaView>
  );
};
export default OrdersScreen;
