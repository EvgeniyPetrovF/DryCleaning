import React, {FC, useCallback} from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '../../../../components/CustomButton';
import Loader from '../../../../components/Loader';
import TextWrapper from '../../../../components/TextWrapper';
import {HomeStackParamList} from '../../../../models/navigation';
import {IDryCleaner} from '../../../../models/types';
import DryCleaner from '../../components/DryCleaner';
import DryCleanerForm from '../../components/DryCleanerForm';
import useAnimatedList from '../../hooks/useAnimatedList';
import useDatabase from '../../hooks/useDatabase';
import useDryCleaners from '../../hooks/useDryCleaners';
import {styles} from './styles';

const ListEmptyComponent: FC = () => {
  return <TextWrapper>No items</TextWrapper>;
};

const keyExtractor = (item: IDryCleaner) => {
  return `${item.id}`;
};

const ItemSeparatorComponent: FC = () => {
  return <View style={styles.separator} />;
};

type Props = NativeStackScreenProps<HomeStackParamList, 'DryCleaners'>;

const HomeScreen: FC<Props> = () => {
  const db = useDatabase();
  const {
    showModal,
    showEditModal,
    isLoading,
    isRefreshing,
    tempDryCleaner,
    dryCleaners,

    addDryCleaner,
    deleteDryCleaner,
    editDryCleaner,
    refreshDryCleaners,
    onDryCleanerPress,
    closeAddModal,
    openAddModal,
    closeEditModal,
  } = useDryCleaners(db);

  const {animatedOpacityStyle} = useAnimatedList({isLoading});

  const renderDryCleaner: ListRenderItem<IDryCleaner> = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onDryCleanerPress(item)}>
        <DryCleaner {...item} deleteDryCleaner={deleteDryCleaner} />
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent: FC = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <CustomButton label="Add" onPress={openAddModal} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <Animated.View style={[animatedOpacityStyle, styles.listContainer]}>
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
      <DryCleanerForm
        buttonTitle="Add Dry Cleaner"
        onButtonPress={addDryCleaner}
        visible={showModal}
        closeModal={closeAddModal}
      />
      <DryCleanerForm
        buttonTitle="Edit Dry Cleaner"
        onButtonPress={editDryCleaner}
        visible={showEditModal}
        closeModal={closeEditModal}
        dryCleaner={tempDryCleaner}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
