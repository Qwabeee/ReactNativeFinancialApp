import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransactionItem = ({ transaction, onPress }) => {
  const { amount, category, description, date, type } = transaction;
  const isExpense = type === 'expense';
  const amountColor = isExpense ? '#FF3B30' : '#34C759';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon
          name={isExpense ? 'arrow-downward' : 'arrow-upward'}
          size={24}
          color={amountColor}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.date}>
          {format(new Date(date), 'h:mm a')}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {isExpense ? '-' : '+'}${Math.abs(amount).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  amountContainer: {
    marginLeft: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionItem; 