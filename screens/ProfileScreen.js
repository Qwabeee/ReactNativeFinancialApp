import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);

  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: 'January 2023',
    subscription: 'Premium',
  };

  const menuItems = [
    {
      id: 1,
      title: 'Account Settings',
      icon: 'person-outline',
      onPress: () => {},
    },
    {
      id: 2,
      title: 'Security',
      icon: 'shield-outline',
      onPress: () => {},
    },
    {
      id: 3,
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {},
    },
    {
      id: 5,
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userData.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
          </View>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <View style={styles.memberInfo}>
            <Text style={styles.memberText}>Member since {userData.memberSince}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{userData.subscription}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="notifications-outline" size={24} color="#007AFF" />
              <Text style={styles.preferenceText}>Push Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notifications ? '#007AFF' : '#f4f3f4'}
            />
          </View>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="moon-outline" size={24} color="#007AFF" />
              <Text style={styles.preferenceText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={darkMode ? '#007AFF' : '#f4f3f4'}
            />
          </View>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="finger-print-outline" size={24} color="#007AFF" />
              <Text style={styles.preferenceText}>Biometric Authentication</Text>
            </View>
            <Switch
              value={biometricAuth}
              onValueChange={setBiometricAuth}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={biometricAuth ? '#007AFF' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#007AFF" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceText: {
    fontSize: 16,
    marginLeft: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen; 