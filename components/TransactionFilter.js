import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';

const TransactionFilter = ({
  visible,
  onClose,
  onApply,
  categories,
  selectedCategories,
  dateRange,
  onDateRangeChange,
}) => {
  const [tempSelectedCategories, setTempSelectedCategories] = useState(selectedCategories);
  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const handleCategoryToggle = (category) => {
    setTempSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    onApply({
      categories: tempSelectedCategories,
      dateRange: tempDateRange,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter Transactions</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      tempSelectedCategories.includes(category) &&
                        styles.selectedCategory,
                    ]}
                    onPress={() => handleCategoryToggle(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        tempSelectedCategories.includes(category) &&
                          styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Date Range</Text>
              <View style={styles.dateRangeContainer}>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    tempDateRange === 'week' && styles.selectedDate,
                  ]}
                  onPress={() => setTempDateRange('week')}
                >
                  <Text
                    style={[
                      styles.dateText,
                      tempDateRange === 'week' && styles.selectedDateText,
                    ]}
                  >
                    This Week
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    tempDateRange === 'month' && styles.selectedDate,
                  ]}
                  onPress={() => setTempDateRange('month')}
                >
                  <Text
                    style={[
                      styles.dateText,
                      tempDateRange === 'month' && styles.selectedDateText,
                    ]}
                  >
                    This Month
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    tempDateRange === 'year' && styles.selectedDate,
                  ]}
                  onPress={() => setTempDateRange('year')}
                >
                  <Text
                    style={[
                      styles.dateText,
                      tempDateRange === 'year' && styles.selectedDateText,
                    ]}
                  >
                    This Year
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setTempSelectedCategories([]);
                setTempDateRange('month');
              }}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#007AFF',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  selectedDateText: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    marginLeft: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TransactionFilter; 