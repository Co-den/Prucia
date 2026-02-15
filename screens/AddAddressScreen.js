import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function AddAddressScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    const { name, phone, street, city, state, country } = form;
    if (!name || !phone || !street || !city || !state || !country) {
      Alert.alert('Missing Info', 'Please complete all fields.');
      return;
    }

    // Normally, you'd send to backend or context
    console.log('Address added:', form);
    Alert.alert('Success', 'Address added successfully.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add New Address</Text>

        {['name', 'phone', 'street', 'city', 'state', 'country'].map((field) => (
          <TextInput
            key={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            style={styles.input}
            onChangeText={(text) => handleChange(field, text)}
            value={form[field]}
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, paddingTop: 50 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#f68b1e',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
