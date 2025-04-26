import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BalanceOverview = ({
  balance,
  growthPercent,
  income,
  expenses,
  savings,
  savingsPercent,
  month,
  year
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Balance Overview</Text>
        <Text style={styles.date}>{month} {year}</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balance}>{balance}</Text>
        <View style={styles.growthContainer}>
          <Ionicons name="trending-up" size={16} color="#34C759" />
          <Text style={styles.growthText}>+{growthPercent}% this month</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Income</Text>
          <Text style={styles.statValue}>{income}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Expenses</Text>
          <Text style={styles.statValue}>{expenses}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Savings</Text>
          <Text style={styles.statValue}>{savings}</Text>
          <Text style={styles.savingsPercent}>{savingsPercent}% of income</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  growthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  growthText: {
    color: '#34C759',
    marginLeft: 5,
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  savingsPercent: {
    fontSize: 12,
    color: '#34C759',
    marginTop: 2,
  },
});

export default BalanceOverview; 