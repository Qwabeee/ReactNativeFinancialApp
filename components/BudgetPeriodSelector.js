import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const BudgetPeriodSelector = ({ selectedPeriod, onPeriodChange }) => {
  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  return (
    <View style={styles.container}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period.id}
          style={[
            styles.periodButton,
            selectedPeriod === period.id && styles.selectedPeriod,
          ]}
          onPress={() => onPeriodChange(period.id)}
        >
          <Text
            style={[
              styles.periodText,
              selectedPeriod === period.id && styles.selectedPeriodText,
            ]}
          >
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  periodButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPeriod: {
    backgroundColor: '#007AFF',
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  selectedPeriodText: {
    color: '#fff',
  },
});

export default BudgetPeriodSelector; 