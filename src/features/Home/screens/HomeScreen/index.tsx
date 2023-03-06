import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMMKVString} from 'react-native-mmkv';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import DryCleaner, {IDryCleaner} from '../../components/DryCleaner';
import Loader from '../../../../components/Loader';
import TextWrapper from '../../../../components/TextWrapper';
import {HomeStackParamList} from '../../../../models/navigation';
import {StorageKeys} from '../../../../models/storage';
import Animated, {withTiming} from 'react-native-reanimated';
import useAnimatedStyleProperty from '../../../../common/hooks/useAnimatedStyleProperty';
import CustomButton from '../../../../components/CustomButton';

const ListEmptyComponent: FC = () => {
  return <TextWrapper>No items</TextWrapper>;
};

const keyExtractor = (item: IDryCleaner) => {
  return item.id;
};

const ItemSeparatorComponent: FC = () => {
  return <View style={styles.separator} />;
};

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const animationDuration = 300;

const HomeScreen: FC<Props> = ({navigation}) => {
  const [userName] = useMMKVString(StorageKeys.userName);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [dryCleaners, setDryCleaners] = useState<IDryCleaner[]>();
  const {animatedValue: listOpacity, animatedStyle: animatedOpacityStyle} =
    useAnimatedStyleProperty('opacity', 0);

  const fetchDryCleaners = async () => {
    try {
      if (userName) {
        // const response = await TweetsAPI.getTweets({userName});
        // setDryCleaners(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialFetchDryCleaners = async () => {
    setIsLoading(true);
    await fetchDryCleaners();
    setIsLoading(false);
  };

  const refreshDryCleaners = async () => {
    setisRefreshing(true);
    await fetchDryCleaners();
    setisRefreshing(false);
  };

  useEffect(() => {
    initialFetchDryCleaners();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      listOpacity.value = withTiming(1, {duration: animationDuration});
    } else {
      listOpacity.value = 0;
    }
  }, [listOpacity, isLoading]);

  const renderDryCleaner: ListRenderItem<IDryCleaner> = ({item}) => {
    const navigateToOrders = () => {
      if (userName) {
        navigation.navigate('Orders', {item, userName});
      }
    };

    return (
      <TouchableOpacity onPress={navigateToOrders}>
        <DryCleaner {...item} />
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent: FC = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <CustomButton label="Add" onPress={() => {}} />
        <TextWrapper style={styles.listHeader}>{`${userName}`}</TextWrapper>
      </View>
    );
  }, [userName]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <Animated.View style={animatedOpacityStyle}>
          <FlatList
            data={dryCleaners}
            renderItem={renderDryCleaner}
            onRefresh={refreshDryCleaners}
            refreshing={isRefreshing}
            ListHeaderComponent={ListHeaderComponent}
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListEmptyComponent={ListEmptyComponent}
            keyExtractor={keyExtractor}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};
export default HomeScreen;
