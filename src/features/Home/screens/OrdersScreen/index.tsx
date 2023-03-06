import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HomeStackParamList} from '../../../../models/navigation';
import DryCleaner from '../../components/DryCleaner';
import {styles} from './styles';

type Props = NativeStackScreenProps<HomeStackParamList, 'Orders'>;

type Order = {
  title: string;
  value: string;
};

const OrdersScreen: FC<Props> = ({route}) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <DryCleaner {...item} />
    </SafeAreaView>
  );
};
export default OrdersScreen;
