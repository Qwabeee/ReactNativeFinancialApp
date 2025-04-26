import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return styles.outline;
      case 'elevated':
        return styles.elevated;
      default:
        return styles.default;
    }
  };

  return (
    <View style={[styles.container, getVariantStyles(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  default: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  elevated: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default Card; 