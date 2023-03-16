import {useEffect, useRef, useState} from 'react';
import {withTiming} from 'react-native-reanimated';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import useAnimatedStyleProperty from '../../../common/hooks/useAnimatedStyleProperty';
import {IDryCleaner} from '../../../models/types';
import {Database} from '../../../services/database';

const animationDuration = 300;

const useDryCleaners = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tempDryCleaner, setTempDryCleaner] = useState<IDryCleaner>();
  const [dryCleaners, setDryCleaners] = useState<IDryCleaner[]>([]);
  const db = useRef<SQLiteDatabase | null>(null);

  const {animatedValue: listOpacity, animatedStyle: animatedOpacityStyle} =
    useAnimatedStyleProperty('opacity', 0);

  const addDryCleaner = async (dryCleaner: IDryCleaner) => {
    const newDryCleaner = {
      ...dryCleaner,
      id: dryCleaners.length ? dryCleaners[dryCleaners.length - 1].id + 1 : '1',
    };
    setDryCleaners([...dryCleaners, newDryCleaner]);
    if (db.current) {
      await Database.addDryCleanerToTable(db.current, newDryCleaner);
      await refreshDryCleaners();
    }

    setShowModal(false);
    setTempDryCleaner(undefined);
  };

  const deleteDryCleaner = async (id: string) => {
    if (db.current) {
      await Database.deleteDryCleanerFromTable(db.current, id);
    }
    setDryCleaners(prev => prev.filter(cleaner => cleaner.id !== id));
  };

  const editDryCleaner = async (updatedDryCleaner: IDryCleaner) => {
    setDryCleaners(prev =>
      prev.map(cleaner =>
        cleaner.id === updatedDryCleaner.id ? updatedDryCleaner : cleaner,
      ),
    );

    if (db.current) {
      await Database.saveDryCleanerToTable(db.current, updatedDryCleaner);
      updatedDryCleaner.services
        .filter(item => item.currentStatus === 'deleted')
        .forEach(item => {
          (async () => {
            await Database.deleteServiceFromTable(db.current!, item.id);
          })();
        });
      updatedDryCleaner.images
        .filter(item => item.currentStatus === 'deleted')
        .forEach(item => {
          (async () => {
            await Database.deleteImageFromTable(db.current!, item.id!);
          })();
        });
      await initialFetchDryCleaners();
    }
  };

  const fetchDryCleaners = async () => {
    try {
      if (!db.current) {
        db.current = await Database.getDBConnection();
      }
      await Database.createDryCleanersTable(db.current);
      const storedTodoItems = await Database.getDryCleaners(db.current);

      if (storedTodoItems.length) {
        setDryCleaners(storedTodoItems);
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
    setIsRefreshing(true);
    await fetchDryCleaners();
    setIsRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      // await Database.deleteDB();
      await initialFetchDryCleaners();
    })();

    return () => {
      if (db.current) {
        db.current.close();
        db.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      listOpacity.value = withTiming(1, {duration: animationDuration});
    } else {
      listOpacity.value = 0;
    }
  }, [listOpacity, isLoading]);

  const onDryCleanerPress = (item: IDryCleaner) => {
    setTempDryCleaner(item);
    setShowEditModal(true);
  };

  const closeAddModal = () => {
    setShowModal(false);
  };

  const openAddModal = () => {
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return {
    showModal,
    showEditModal,
    isLoading,
    isRefreshing,
    tempDryCleaner,
    dryCleaners,
    animatedOpacityStyle,

    addDryCleaner,
    deleteDryCleaner,
    editDryCleaner,
    refreshDryCleaners,
    onDryCleanerPress,
    closeAddModal,
    openAddModal,
    closeEditModal,
  };
};

export default useDryCleaners;
