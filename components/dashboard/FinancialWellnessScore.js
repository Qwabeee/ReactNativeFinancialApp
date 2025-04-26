import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FinancialWellnessScore = ({ score, status, advice, tags }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#357ABD']}
        style={styles.gradient}
      >
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.scoreLabel}>Financial Wellness Score</Text>
        </View>
        
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{status}</Text>
          <Text style={styles.advice}>{advice}</Text>
        </View>

        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View 
              key={index} 
              style={[
                styles.tag,
                { backgroundColor: getTagColor(tag.color) }
              ]}
            >
              <Text style={styles.tagText}>{tag.name}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const getTagColor = (color) => {
  switch (color) {
    case 'primary':
      return '#007AFF';
    case 'success':
      return '#34C759';
    case 'warning':
      return '#FF9500';
    default:
      return '#007AFF';
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statusContainer: {
    marginBottom: 15,
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  advice: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default FinancialWellnessScore; 