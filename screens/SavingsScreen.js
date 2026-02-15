import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function SavingsScreen() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      Alert.alert('Invalid Amount', 'Enter a valid number');
      return;
    }

    setBalance(prev => prev + num);
    setAmount('');
    Alert.alert('Success', `₦${num} added to savings`);
  };

  const handleWithdraw = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      Alert.alert('Invalid Amount', 'Enter a valid number');
      return;
    }
    if (num > balance) {
      Alert.alert('Insufficient Funds', 'You cannot withdraw more than your balance');
      return;
    }

    setBalance(prev => prev - num);
    setAmount('');
    Alert.alert('Success', `₦${num} withdrawn from savings`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>💰 Your Savings</Text>
      <Text style={styles.balance}>₦{balance.toFixed(2)}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add to Savings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonWithdraw} onPress={handleWithdraw}>
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  balance: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'green',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonAdd: {
    backgroundColor: '#007aff',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonWithdraw: {
    backgroundColor: '#ff3b30',
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
