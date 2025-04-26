import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BudgetSummary = ({ totalAllocated, totalSpent, period }) => {
  const remaining = totalAllocated - totalSpent;
  const progress = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;
  const progressColor = progress > 80 ? '#FF3B30' : progress > 50 ? '#FF9500' : '#34C759';

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period} Budget Summary</Text>
      
      <View style={styles.progressContainer}>
        <LinearGradient
          colors={[progressColor, `${progressColor}80`]}
          style={[styles.progressBar, { width: `${Math.min(progress, 100)}%` }]}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Budget</Text>
          <Text style={styles.statValue}>${totalAllocated.toFixed(2)}</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Spent</Text>
          <Text style={styles.statValue}>${totalSpent.toFixed(2)}</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={[
            styles.statValue,
            { color: remaining < 0 ? '#FF3B30' : '#34C759' }
          ]}>
            ${remaining.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  period: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BudgetSummary; 