import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import BottomTabNavigator from './BottomTabNavigator';
import ProfileSettings from '../screens/settings/ProfileSettings';
import NotificationSettings from '../screens/settings/NotificationSettings';
import HelpScreen from '../screens/HelpScreen';
import AboutScreen from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { user, signOut } = useAuth();

  const CustomDrawerContent = ({ navigation }) => {
    return (
      <View style={styles.drawerContent}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Icon name="account-circle" size={60} color="#007AFF" />
          </View>
          <Text style={styles.userName}>{user?.displayName || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.drawerSection}>
          <DrawerItem
            label="Home"
            icon={({ color }) => <Icon name="home" size={24} color={color} />}
            onPress={() => navigation.navigate('Main')}
          />
          <DrawerItem
            label="Profile Settings"
            icon={({ color }) => <Icon name="person" size={24} color={color} />}
            onPress={() => navigation.navigate('ProfileSettings')}
          />
          <DrawerItem
            label="Notification Settings"
            icon={({ color }) => <Icon name="notifications" size={24} color={color} />}
            onPress={() => navigation.navigate('NotificationSettings')}
          />
          <DrawerItem
            label="Help"
            icon={({ color }) => <Icon name="help" size={24} color={color} />}
            onPress={() => navigation.navigate('Help')}
          />
          <DrawerItem
            label="About"
            icon={({ color }) => <Icon name="info" size={24} color={color} />}
            onPress={() => navigation.navigate('About')}
          />
        </View>

        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Sign Out"
            icon={({ color }) => <Icon name="exit-to-app" size={24} color={color} />}
            onPress={signOut}
          />
        </View>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#666',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
        },
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          title: 'Profile Settings',
          drawerIcon: ({ color }) => <Icon name="person" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{
          title: 'Notification Settings',
          drawerIcon: ({ color }) => <Icon name="notifications" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: 'Help',
          drawerIcon: ({ color }) => <Icon name="help" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          drawerIcon: ({ color }) => <Icon name="info" size={24} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
});

export default DrawerNavigator; 