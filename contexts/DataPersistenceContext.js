import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const DataPersistenceContext = createContext({});

export const DataPersistenceProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
      if (state.isConnected) {
        syncPendingChanges();
      }
    });

    return () => unsubscribe();
  }, []);

  const syncPendingChanges = async () => {
    try {
      const pending = await AsyncStorage.getItem('pendingSync');
      if (pending) {
        const pendingData = JSON.parse(pending);
        for (const item of pendingData) {
          await syncData(item);
        }
        await AsyncStorage.removeItem('pendingSync');
        setPendingSync([]);
      }
    } catch (error) {
      console.error('Error syncing pending changes:', error);
    }
  };

  const syncData = async (data) => {
    try {
      const { collection, id, data: itemData } = data;
      await setDoc(doc(db, collection, id), itemData, { merge: true });
    } catch (error) {
      console.error('Error syncing data:', error);
      throw error;
    }
  };

  const saveData = async (collection, id, data) => {
    try {
      if (isOnline) {
        await setDoc(doc(db, collection, id), data, { merge: true });
      } else {
        const pending = await AsyncStorage.getItem('pendingSync');
        const pendingData = pending ? JSON.parse(pending) : [];
        pendingData.push({ collection, id, data });
        await AsyncStorage.setItem('pendingSync', JSON.stringify(pendingData));
        setPendingSync(pendingData);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  };

  const getData = async (collection, id) => {
    try {
      if (isOnline) {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        }
        return null;
      } else {
        const localData = await AsyncStorage.getItem(`${collection}_${id}`);
        return localData ? JSON.parse(localData) : null;
      }
    } catch (error) {
      console.error('Error getting data:', error);
      throw error;
    }
  };

  const cacheData = async (collection, id, data) => {
    try {
      await AsyncStorage.setItem(`${collection}_${id}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error caching data:', error);
      throw error;
    }
  };

  return (
    <DataPersistenceContext.Provider
      value={{
        isOnline,
        pendingSync,
        saveData,
        getData,
        cacheData,
      }}
    >
      {children}
    </DataPersistenceContext.Provider>
  );
};

export const useDataPersistence = () => {
  return useContext(DataPersistenceContext);
}; 