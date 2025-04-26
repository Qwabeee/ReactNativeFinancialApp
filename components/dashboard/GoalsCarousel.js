import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GoalsCarousel = ({ goals = [] }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Goals</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {goals.length > 0 ? (
          goals.map((goal, index) => (
            <View key={index} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Ionicons name={getGoalIcon(goal.type)} size={24} color="#007AFF" />
                <Text style={styles.goalTitle}>{goal.title}</Text>
              </View>
              <Text style={styles.goalAmount}>${goal.currentAmount} / ${goal.targetAmount}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.goalDate}>Target: {goal.targetDate}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="flag-outline" size={40} color="#999" />
            <Text style={styles.emptyStateText}>No goals set yet</Text>
            <TouchableOpacity style={styles.addGoalButton}>
              <Text style={styles.addGoalText}>Add a Goal</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const getGoalIcon = (type) => {
  switch (type) {
    case 'savings':
      return 'wallet-outline';
    case 'debt':
      return 'card-outline';
    case 'investment':
      return 'trending-up-outline';
    default:
      return 'flag-outline';
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#007AFF',
    fontSize: 14,
  },
  carousel: {
    paddingHorizontal: 20,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  goalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  goalDate: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    width: 250,
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  emptyStateText: {
    marginTop: 10,
    color: '#999',
    fontSize: 14,
  },
  addGoalButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  addGoalText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GoalsCarousel; 