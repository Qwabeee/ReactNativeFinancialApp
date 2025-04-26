import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const NOTIFICATION_SETTINGS_KEY = '@notification_settings';

class NotificationService {
  static async requestPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        throw new Error('Notification permission denied');
      }
    }
  }

  static async getToken() {
    try {
      await this.requestPermission();
      const token = await messaging().getToken();
      await AsyncStorage.setItem('@fcm_token', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      throw error;
    }
  }

  static async checkNotificationPermission() {
    const settings = await messaging().hasPermission();
    return settings === messaging.AuthorizationStatus.AUTHORIZED ||
           settings === messaging.AuthorizationStatus.PROVISIONAL;
  }

  static async getNotificationSettings() {
    try {
      const settings = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error getting notification settings:', error);
      return null;
    }
  }

  static async updateNotificationSettings(settings) {
    try {
      await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      return false;
    }
  }

  static setupBackgroundHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }

  static setupForegroundHandler() {
    messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
      // Handle foreground notifications here
    });
  }

  static async scheduleLocalNotification(title, body, data = {}) {
    const settings = await this.getNotificationSettings();
    if (!settings) return;

    // Check if notifications are enabled for this type
    if (data.type === 'transaction' && !settings.transactionAlerts) return;
    if (data.type === 'budget' && !settings.budgetAlerts) return;

    // Schedule local notification
    // Implementation will depend on the notification library you're using
  }

  static async handleNotificationPress(notification) {
    // Handle notification press based on the notification data
    const { data } = notification;
    if (data.type === 'transaction') {
      // Navigate to transaction details
    } else if (data.type === 'budget') {
      // Navigate to budget details
    }
  }
}

export default NotificationService; 