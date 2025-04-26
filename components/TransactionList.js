import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TransactionItem from './TransactionItem';
import { format } from 'date-fns';

const TransactionList = ({
  transactions,
  onTransactionPress,
  onEndReached,
  loading,
  refreshing,
  onRefresh,
}) => {
  const groupTransactionsByDate = (transactions) => {
    const grouped = {};
    transactions.forEach((transaction) => {
      const date = format(new Date(transaction.date), 'MMMM d, yyyy');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    });
    return grouped;
  };

  const renderDateHeader = (date) => (
    <View style={styles.dateHeader}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  const renderTransaction = ({ item }) => (
    <TransactionItem
      transaction={item}
      onPress={() => onTransactionPress(item)}
    />
  );

  const renderSection = ({ item }) => (
    <View style={styles.section}>
      {renderDateHeader(item.date)}
      {item.transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onPress={() => onTransactionPress(transaction)}
        />
      ))}
    </View>
  );

  const groupedTransactions = groupTransactionsByDate(transactions);
  const sections = Object.entries(groupedTransactions).map(([date, transactions]) => ({
    date,
    transactions,
  }));

  if (loading && !refreshing && transactions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <FlatList
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item) => item.date}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions found</Text>
        </View>
      }
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  dateHeader: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default TransactionList; 