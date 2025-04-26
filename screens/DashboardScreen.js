import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import FinancialWellnessScore from '../components/dashboard/FinancialWellnessScore';
import BalanceOverview from '../components/dashboard/BalanceOverview';
import GoalsCarousel from '../components/dashboard/GoalsCarousel';

const DashboardScreen = () => {
  // Mock data - replace with actual data fetching
  const userData = {
    firstName: 'Alex',
  };

  const financialData = {
    wellnessScore: 75,
    wellnessStatus: "Growing Steadily",
    wellnessAdvice: "You're doing great with expense tracking! Next step: boost your savings.",
    wellnessTags: [
      { name: "Budgeting", color: "primary" },
      { name: "Tracking", color: "success" },
      { name: "Saving", color: "warning" }
    ],
    balance: "$2,468",
    growthPercent: 8.2,
    income: "$3,542",
    expenses: "$1,074",
    savings: "$800",
    savingsPercent: 65,
    month: "June",
    year: "2023",
    goals: [
      {
        type: "savings",
        title: "Emergency Fund",
        currentAmount: 2500,
        targetAmount: 5000,
        targetDate: "Dec 2023"
      },
      {
        type: "investment",
        title: "Stock Portfolio",
        currentAmount: 5000,
        targetAmount: 10000,
        targetDate: "Jun 2024"
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hi, {userData.firstName}</Text>
          <Text style={styles.subtitle}>Let's grow your financial universe today</Text>
        </View>

        <FinancialWellnessScore 
          score={financialData.wellnessScore}
          status={financialData.wellnessStatus}
          advice={financialData.wellnessAdvice}
          tags={financialData.wellnessTags}
        />

        <BalanceOverview 
          balance={financialData.balance}
          growthPercent={financialData.growthPercent}
          income={financialData.income}
          expenses={financialData.expenses}
          savings={financialData.savings}
          savingsPercent={financialData.savingsPercent}
          month={financialData.month}
          year={financialData.year}
        />

        <GoalsCarousel goals={financialData.goals} />
      </ScrollView>
    </SafeAreaView>
  );
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
    padding: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default DashboardScreen; 