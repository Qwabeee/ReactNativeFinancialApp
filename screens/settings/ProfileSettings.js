import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import * as ImagePicker from 'expo-image-picker';

const ProfileSettings = ({ navigation }) => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      await updateProfile({ displayName: name });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant camera roll permissions to change your profile photo');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Handle image upload here
        console.log('Selected image:', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Profile Settings"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content}>
        <View style={styles.photoContainer}>
          <TouchableOpacity
            style={styles.photoButton}
            onPress={handleChangePhoto}
          >
            <Text style={styles.photoButtonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            editable={false}
          />

          <Button
            title="Update Profile"
            onPress={handleUpdateProfile}
            loading={loading}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photoButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  photoButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
});

export default ProfileSettings; 