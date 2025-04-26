import analytics from '@react-native-firebase/analytics';

class AnalyticsService {
  static async logEvent(eventName, params = {}) {
    try {
      await analytics().logEvent(eventName, params);
    } catch (error) {
      console.error('Error logging analytics event:', error);
    }
  }

  static async setUserProperties(properties) {
    try {
      await analytics().setUserProperties(properties);
    } catch (error) {
      console.error('Error setting user properties:', error);
    }
  }

  static async setUserId(userId) {
    try {
      await analytics().setUserId(userId);
    } catch (error) {
      console.error('Error setting user ID:', error);
    }
  }

  static async setCurrentScreen(screenName, screenClass) {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenClass,
      });
    } catch (error) {
      console.error('Error setting current screen:', error);
    }
  }

  // Specific event tracking methods
  static async trackTransactionAdded(amount, category) {
    await this.logEvent('transaction_added', {
      amount,
      category,
    });
  }

  static async trackBudgetUpdated(category, amount) {
    await this.logEvent('budget_updated', {
      category,
      amount,
    });
  }

  static async trackNotificationSettingsChanged(settings) {
    await this.logEvent('notification_settings_changed', settings);
  }

  static async trackAppOpened() {
    await this.logEvent('app_opened');
  }

  static async trackError(error, context) {
    await this.logEvent('error_occurred', {
      error_message: error.message,
      error_code: error.code,
      context,
    });
  }
}

export default AnalyticsService; 