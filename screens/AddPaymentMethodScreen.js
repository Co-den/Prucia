import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

export default function AddPaymentMethodScreen({ navigation }) {
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    holder: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    const { cardNumber, expiry, cvv, holder } = form;
    if (!cardNumber || !expiry || !cvv || !holder) {
      Alert.alert('Missing Fields', 'Please complete all card details.');
      return;
    }

    Alert.alert('Saved', 'Payment method added successfully.');
    navigation.goBack(); // Or send to backend/context
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add New Card</Text>

        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="number-pad"
          onChangeText={(val) => handleChange('cardNumber', val)}
          value={form.cardNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          onChangeText={(val) => handleChange('expiry', val)}
          value={form.expiry}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          keyboardType="number-pad"
          onChangeText={(val) => handleChange('cvv', val)}
          value={form.cvv}
        />
        <TextInput
          style={styles.input}
          placeholder="Card Holder Name"
          onChangeText={(val) => handleChange('holder', val)}
          value={form.holder}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#f68b1e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
