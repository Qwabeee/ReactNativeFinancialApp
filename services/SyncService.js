import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

class SyncService {
  static async initialize() {
    // Subscribe to network state changes
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        this.syncPendingChanges();
      }
    });
  }

  static async syncPendingChanges() {
    try {
      const pendingChanges = await AsyncStorage.getItem('@pending_changes');
      if (!pendingChanges) return;

      const changes = JSON.parse(pendingChanges);
      for (const change of changes) {
        await this.processChange(change);
      }

      // Clear pending changes after successful sync
      await AsyncStorage.removeItem('@pending_changes');
    } catch (error) {
      console.error('Error syncing pending changes:', error);
    }
  }

  static async processChange(change) {
    try {
      switch (change.type) {
        case 'notification_settings':
          // Sync notification settings with backend
          await this.syncNotificationSettings(change.data);
          break;
        case 'transaction':
          // Sync transaction with backend
          await this.syncTransaction(change.data);
          break;
        case 'budget':
          // Sync budget with backend
          await this.syncBudget(change.data);
          break;
        default:
          console.warn('Unknown change type:', change.type);
      }
    } catch (error) {
      console.error('Error processing change:', error);
      throw error;
    }
  }

  static async queueChange(change) {
    try {
      const pendingChanges = await AsyncStorage.getItem('@pending_changes');
      const changes = pendingChanges ? JSON.parse(pendingChanges) : [];
      changes.push(change);
      await AsyncStorage.setItem('@pending_changes', JSON.stringify(changes));
    } catch (error) {
      console.error('Error queueing change:', error);
      throw error;
    }
  }

  static async syncNotificationSettings(settings) {
    // Implement backend sync for notification settings
    // This is a placeholder for the actual implementation
    console.log('Syncing notification settings:', settings);
  }

  static async syncTransaction(transaction) {
    // Implement backend sync for transactions
    // This is a placeholder for the actual implementation
    console.log('Syncing transaction:', transaction);
  }

  static async syncBudget(budget) {
    // Implement backend sync for budgets
    // This is a placeholder for the actual implementation
    console.log('Syncing budget:', budget);
  }

  static async isOnline() {
    const state = await NetInfo.fetch();
    return state.isConnected;
  }

  static async handleOfflineOperation(operation) {
    const isOnline = await this.isOnline();
    if (isOnline) {
      return operation();
    } else {
      // Queue the operation for later sync
      await this.queueChange(operation);
      return { success: true, offline: true };
    }
  }
}

export default SyncService; 