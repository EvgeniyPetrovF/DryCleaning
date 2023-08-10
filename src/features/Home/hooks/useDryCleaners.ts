import {useCallback, useEffect, useState} from 'react';
import {IDryCleaner, UseDatabaseType} from '../../../models/types';

const useDryCleaners = ({
  addDryCleanerToDB,
  deleteDryCleanerFromDB,
  editDryCleanerFromDB,
  fetchDryCleaners,
}: UseDatabaseType) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tempDryCleaner, setTempDryCleaner] = useState<IDryCleaner | null>();
  const [dryCleaners, setDryCleaners] = useState<IDryCleaner[]>([]);

  const refreshDryCleaners = useCallback(async () => {
    setIsRefreshing(true);
    const storedItems = await fetchDryCleaners();

    if (storedItems?.length) {
      setDryCleaners(storedItems);
    }

    setIsRefreshing(false);
  }, [fetchDryCleaners]);

  const addDryCleaner = useCallback(
    async (dryCleaner: IDryCleaner) => {
      const newDryCleaner = {
        ...dryCleaner,
        id: dryCleaners.length ? dryCleaners[dryCleaners.length - 1].id + 1 : 1,
      };

      try {
        await addDryCleanerToDB(newDryCleaner);
        await fetchDryCleaners();

        setDryCleaners([...dryCleaners, newDryCleaner]);

        setShowModal(false);
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    [addDryCleanerToDB, dryCleaners, fetchDryCleaners],
  );

  const deleteDryCleaner = async (id: number) => {
    try {
      await deleteDryCleanerFromDB(id);
      setDryCleaners(prev => prev.filter(cleaner => cleaner.id !== id));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const editDryCleaner = async (dryCleaner: IDryCleaner) => {
    const updatedDryCleaner = {...dryCleaner};
    try {
      await editDryCleanerFromDB(updatedDryCleaner);
      setDryCleaners(prev =>
        prev.map(cleaner =>
          cleaner.id === updatedDryCleaner.id ? updatedDryCleaner : cleaner,
        ),
      );

      await initialFetchDryCleaners();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const initialFetchDryCleaners = async () => {
    setIsLoading(true);
    const storedItems = await fetchDryCleaners();
    if (storedItems?.length) {
      setDryCleaners(storedItems);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initialFetchDryCleaners();
  }, []);

  const onDryCleanerPress = (item: IDryCleaner) => {
    setTempDryCleaner(item);
    openEditModal();
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

  const openEditModal = () => {
    setShowEditModal(true);
  };

  return {
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
  };
};

export default useDryCleaners;
