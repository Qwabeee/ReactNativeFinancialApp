import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
  Platform,
  Linking,
  NetInfo,
} from 'react-native';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import NotificationService from '../../services/NotificationService';
import AnalyticsService from '../../services/AnalyticsService';
import SyncService from '../../services/SyncService';

const NotificationSettings = ({ navigation }) => {
  const [settings, setSettings] = useState({
    transactionAlerts: true,
    budgetAlerts: true,
    weeklyReports: true,
    monthlyReports: true,
    marketingEmails: false,
  });
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    initializeSettings();
    AnalyticsService.setCurrentScreen('NotificationSettings', 'Settings');
    
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const initializeSettings = async () => {
    try {
      const [savedSettings, permission] = await Promise.all([
        NotificationService.getNotificationSettings(),
        NotificationService.checkNotificationPermission(),
      ]);

      if (savedSettings) {
        setSettings(savedSettings);
      }
      setHasPermission(permission);

      if (!permission) {
        try {
          await NotificationService.requestPermission();
          setHasPermission(true);
          AnalyticsService.logEvent('notification_permission_granted');
        } catch (error) {
          AnalyticsService.logEvent('notification_permission_denied');
          Alert.alert(
            'Permission Required',
            'Please enable notifications in your device settings to receive alerts.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => {
                  AnalyticsService.logEvent('open_notification_settings');
                  if (Platform.OS === 'ios') {
                    Linking.openURL('app-settings:');
                  } else {
                    Linking.openSettings();
                  }
                },
              },
            ],
          );
        }
      }
    } catch (error) {
      AnalyticsService.trackError(error, 'initializeSettings');
      Alert.alert('Error', 'Failed to load notification settings');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key) => {
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please enable notifications in your device settings to receive alerts.',
      );
      return;
    }

    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    
    try {
      const operation = async () => {
        const success = await NotificationService.updateNotificationSettings(newSettings);
        if (!success) {
          throw new Error('Failed to save settings');
        }
        AnalyticsService.trackNotificationSettingsChanged(newSettings);
      };

      const result = await SyncService.handleOfflineOperation({
        type: 'notification_settings',
        data: newSettings,
        operation,
      });

      if (result.offline) {
        Alert.alert(
          'Offline Mode',
          'Your changes will be synced when you\'re back online.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      AnalyticsService.trackError(error, 'handleToggle');
      Alert.alert('Error', 'Failed to save notification settings');
      // Revert the change if save fails
      setSettings(settings);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          title="Notification Settings"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Notification Settings"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content}>
        {!isOnline && (
          <View style={styles.offlineWarning}>
            <Text style={styles.offlineText}>
              You are currently offline. Changes will be synced when you're back online.
            </Text>
          </View>
        )}

        {!hasPermission && (
          <View style={styles.permissionWarning}>
            <Text style={styles.permissionText}>
              Notifications are disabled. Please enable them in your device settings to receive alerts.
            </Text>
          </View>
        )}

        <Card>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alerts</Text>
            <SettingItem
              title="Transaction Alerts"
              description="Receive notifications for new transactions"
              value={settings.transactionAlerts}
              onToggle={() => handleToggle('transactionAlerts')}
              disabled={!hasPermission}
            />
            <SettingItem
              title="Budget Alerts"
              description="Get notified when you're close to budget limits"
              value={settings.budgetAlerts}
              onToggle={() => handleToggle('budgetAlerts')}
              disabled={!hasPermission}
            />
          </View>
        </Card>

        <Card>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reports</Text>
            <SettingItem
              title="Weekly Reports"
              description="Receive weekly spending summaries"
              value={settings.weeklyReports}
              onToggle={() => handleToggle('weeklyReports')}
              disabled={!hasPermission}
            />
            <SettingItem
              title="Monthly Reports"
              description="Get detailed monthly financial reports"
              value={settings.monthlyReports}
              onToggle={() => handleToggle('monthlyReports')}
              disabled={!hasPermission}
            />
          </View>
        </Card>

        <Card>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Marketing</Text>
            <SettingItem
              title="Marketing Emails"
              description="Receive promotional offers and updates"
              value={settings.marketingEmails}
              onToggle={() => handleToggle('marketingEmails')}
              disabled={!hasPermission}
            />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const SettingItem = ({ title, description, value, onToggle, disabled }) => (
  <View style={[styles.settingItem, disabled && styles.disabledSetting]}>
    <View style={styles.settingInfo}>
      <Text style={[styles.settingTitle, disabled && styles.disabledText]}>{title}</Text>
      <Text style={[styles.settingDescription, disabled && styles.disabledText]}>
        {description}
      </Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#f0f0f0', true: '#007AFF' }}
      thumbColor="#fff"
      accessibilityLabel={title}
      accessibilityHint={`Toggle ${title} setting`}
      disabled={disabled}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineWarning: {
    backgroundColor: '#fff3cd',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  offlineText: {
    color: '#856404',
    fontSize: 14,
  },
  permissionWarning: {
    backgroundColor: '#fff3cd',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  permissionText: {
    color: '#856404',
    fontSize: 14,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  disabledSetting: {
    opacity: 0.5,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  disabledText: {
    color: '#999',
  },
});

export default NotificationSettings; 