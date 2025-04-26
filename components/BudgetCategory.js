import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BudgetCategory = ({ category, onUpdate, onAddExpense }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(category.allocated.toString());

  const handleUpdate = () => {
    const newAmount = parseFloat(editAmount);
    if (!isNaN(newAmount) && newAmount >= 0) {
      onUpdate(category.name, newAmount);
      setIsEditing(false);
    } else {
      Alert.alert('Error', 'Please enter a valid amount');
    }
  };

  const handleAddExpense = () => {
    const expenseAmount = parseFloat(amount);
    if (!isNaN(expenseAmount) && expenseAmount > 0) {
      if (category.spent + expenseAmount <= category.allocated) {
        onAddExpense(category.name, expenseAmount);
        setAmount('');
        setModalVisible(false);
      } else {
        Alert.alert('Warning', 'Expense exceeds allocated budget');
      }
    } else {
      Alert.alert('Error', 'Please enter a valid amount');
    }
  };

  const progress = category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{category.name}</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.amount}>${category.allocated.toFixed(2)}</Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            style={styles.input}
            value={editAmount}
            onChangeText={setEditAmount}
            keyboardType="numeric"
            onBlur={handleUpdate}
            autoFocus
          />
        )}
      </View>

      <View style={styles.progressContainer}>
        <LinearGradient
          colors={[category.color, `${category.color}80`]}
          style={[styles.progressBar, { width: `${Math.min(progress, 100)}%` }]}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.spent}>Spent: ${category.spent.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Expense</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddExpense}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    color: '#007AFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    width: 100,
    textAlign: 'right',
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spent: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  modalButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default BudgetCategory; 