import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LearnScreen = () => {
  const articles = [
    {
      id: 1,
      title: 'Building an Emergency Fund',
      category: 'Savings',
      readTime: '5 min read',
      image: 'https://example.com/emergency-fund.jpg',
    },
    {
      id: 2,
      title: 'Understanding Credit Scores',
      category: 'Credit',
      readTime: '7 min read',
      image: 'https://example.com/credit-score.jpg',
    },
    {
      id: 3,
      title: 'Investment Basics for Beginners',
      category: 'Investing',
      readTime: '10 min read',
      image: 'https://example.com/investment.jpg',
    },
  ];

  const courses = [
    {
      id: 1,
      title: 'Personal Finance 101',
      lessons: 12,
      duration: '2 hours',
      progress: 25,
    },
    {
      id: 2,
      title: 'Smart Budgeting',
      lessons: 8,
      duration: '1.5 hours',
      progress: 50,
    },
    {
      id: 3,
      title: 'Investment Strategies',
      lessons: 15,
      duration: '3 hours',
      progress: 0,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Learn</Text>
          <Text style={styles.subtitle}>Expand your financial knowledge</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Articles</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.articlesContainer}
          >
            {articles.map((article) => (
              <TouchableOpacity key={article.id} style={styles.articleCard}>
                <View style={styles.articleImage}>
                  <Ionicons name="newspaper-outline" size={40} color="#007AFF" />
                </View>
                <View style={styles.articleContent}>
                  <Text style={styles.articleCategory}>{article.category}</Text>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={styles.articleReadTime}>{article.readTime}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Courses</Text>
          {courses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseProgress}>{course.progress}%</Text>
              </View>
              <View style={styles.courseDetails}>
                <Text style={styles.courseInfo}>{course.lessons} lessons</Text>
                <Text style={styles.courseInfo}>{course.duration}</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${course.progress}%` }
                  ]} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
  },
  articlesContainer: {
    paddingHorizontal: 20,
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    width: 280,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  articleImage: {
    height: 120,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleContent: {
    padding: 15,
  },
  articleCategory: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 5,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  articleReadTime: {
    fontSize: 12,
    color: '#666',
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
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
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  courseProgress: {
    fontSize: 14,
    color: '#007AFF',
  },
  courseDetails: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  courseInfo: {
    fontSize: 12,
    color: '#666',
    marginRight: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
});

export default LearnScreen; 