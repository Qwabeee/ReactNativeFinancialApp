import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDataPersistence } from '../contexts/DataPersistenceContext';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { useAuth } from '../contexts/AuthContext';
import BudgetCategory from '../components/BudgetCategory';
import BudgetSummary from '../components/BudgetSummary';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const BudgetScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { saveData, getData } = useDataPersistence();
  const { trackEvent } = useAnalytics();
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    try {
      setLoading(true);
      const budgetData = await getData('budgets', user.uid);
      if (budgetData) {
        setBudget(budgetData);
      } else {
        // Initialize default budget categories
        const defaultBudget = {
          categories: [
            { name: 'Housing', allocated: 0, spent: 0, color: '#FF6B6B' },
            { name: 'Food', allocated: 0, spent: 0, color: '#4ECDC4' },
            { name: 'Transportation', allocated: 0, spent: 0, color: '#45B7D1' },
            { name: 'Entertainment', allocated: 0, spent: 0, color: '#96CEB4' },
            { name: 'Utilities', allocated: 0, spent: 0, color: '#FFEEAD' },
            { name: 'Savings', allocated: 0, spent: 0, color: '#D4A5A5' },
          ],
          period: 'monthly',
          totalAllocated: 0,
          totalSpent: 0,
        };
        setBudget(defaultBudget);
        await saveData('budgets', user.uid, defaultBudget);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load budget');
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (categoryName, amount) => {
    try {
      const updatedBudget = {
        ...budget,
        categories: budget.categories.map(category =>
          category.name === categoryName
            ? { ...category, allocated: amount }
            : category
        ),
      };
      updatedBudget.totalAllocated = updatedBudget.categories.reduce(
        (sum, category) => sum + category.allocated,
        0
      );
      setBudget(updatedBudget);
      await saveData('budgets', user.uid, updatedBudget);
      trackEvent('budget_update', { category: categoryName, amount });
    } catch (error) {
      Alert.alert('Error', 'Failed to update budget');
    }
  };

  const addExpense = async (categoryName, amount) => {
    try {
      const updatedBudget = {
        ...budget,
        categories: budget.categories.map(category =>
          category.name === categoryName
            ? { ...category, spent: category.spent + amount }
            : category
        ),
      };
      updatedBudget.totalSpent = updatedBudget.categories.reduce(
        (sum, category) => sum + category.spent,
        0
      );
      setBudget(updatedBudget);
      await saveData('budgets', user.uid, updatedBudget);
      trackEvent('expense_added', { category: categoryName, amount });
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const chartData = {
    labels: budget.categories.map(category => category.name),
    datasets: [
      {
        data: budget.categories.map(category => category.spent),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budget Planning</Text>
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === 'monthly' && styles.selectedPeriod,
            ]}
            onPress={() => setSelectedPeriod('monthly')}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'monthly' && styles.selectedPeriodText,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === 'yearly' && styles.selectedPeriod,
            ]}
            onPress={() => setSelectedPeriod('yearly')}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'yearly' && styles.selectedPeriodText,
              ]}
            >
              Yearly
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <BudgetSummary
        totalAllocated={budget.totalAllocated}
        totalSpent={budget.totalSpent}
      />

      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {budget.categories.map(category => (
        <BudgetCategory
          key={category.name}
          category={category}
          onUpdate={updateCategory}
          onAddExpense={addExpense}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  periodButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedPeriod: {
    backgroundColor: '#007AFF',
  },
  periodText: {
    color: '#666',
  },
  selectedPeriodText: {
    color: '#fff',
  },
  chartContainer: {
    margin: 20,
    borderRadius: 16,
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default BudgetScreen; 