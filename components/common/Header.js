import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({
  title,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  showBackButton = false,
  onBackPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <View style={styles.left}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onBackPress}
            >
              <Icon name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          )}
          {leftIcon && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onLeftPress}
            >
              <Icon name={leftIcon} size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.right}>
          {rightIcon && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onRightPress}
            >
              <Icon name={rightIcon} size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  iconButton: {
    padding: 8,
  },
});

export default Header; 