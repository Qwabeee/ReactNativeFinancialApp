import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GoalsScreen = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      type: 'savings',
      title: 'Emergency Fund',
      currentAmount: 2500,
      targetAmount: 5000,
      targetDate: 'Dec 2023',
      progress: 50,
    },
    {
      id: 2,
      type: 'investment',
      title: 'Stock Portfolio',
      currentAmount: 5000,
      targetAmount: 10000,
      targetDate: 'Jun 2024',
      progress: 50,
    },
    {
      id: 3,
      type: 'debt',
      title: 'Credit Card Payoff',
      currentAmount: 2000,
      targetAmount: 0,
      targetDate: 'Mar 2024',
      progress: 60,
    },
  ]);

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    type: 'savings',
    targetAmount: '',
    targetDate: '',
  });

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetAmount && newGoal.targetDate) {
      const goal = {
        id: goals.length + 1,
        ...newGoal,
        currentAmount: 0,
        progress: 0,
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        type: 'savings',
        targetAmount: '',
        targetDate: '',
      });
      setIsAddingGoal(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Financial Goals</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setIsAddingGoal(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {isAddingGoal && (
          <View style={styles.addGoalForm}>
            <TextInput
              style={styles.input}
              placeholder="Goal Title"
              value={newGoal.title}
              onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Target Amount"
              keyboardType="numeric"
              value={newGoal.targetAmount}
              onChangeText={(text) => setNewGoal({ ...newGoal, targetAmount: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Target Date (MMM YYYY)"
              value={newGoal.targetDate}
              onChangeText={(text) => setNewGoal({ ...newGoal, targetDate: text })}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsAddingGoal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={handleAddGoal}
              >
                <Text style={styles.buttonText}>Save Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {goals.map((goal) => (
          <View key={goal.id} style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Ionicons 
                name={getGoalIcon(goal.type)} 
                size={24} 
                color="#007AFF" 
              />
              <Text style={styles.goalTitle}>{goal.title}</Text>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${goal.progress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{goal.progress}%</Text>
            </View>

            <View style={styles.goalDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Current</Text>
                <Text style={styles.detailValue}>${goal.currentAmount}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Target</Text>
                <Text style={styles.detailValue}>${goal.targetAmount}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Due Date</Text>
                <Text style={styles.detailValue}>{goal.targetDate}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addGoalForm: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
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
    marginBottom: 15,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  goalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GoalsScreen; 