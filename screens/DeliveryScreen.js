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

export default function DeliveryScreen({ navigation }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const handleRequest = () => {
    if (!pickup || !dropoff) {
      Alert.alert('Missing Fields', 'Please enter both pickup and drop-off locations');
      return;
    }

    Alert.alert('Success', `Delivery from "${pickup}" to "${dropoff}" requested!`);
    setPickup('');
    setDropoff('');
    navigation.navigate('Home'); // Return to Home
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>📦 Request a Delivery</Text>

      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickup}
        onChangeText={setPickup}
      />

      <TextInput
        style={styles.input}
        placeholder="Drop-off Location"
        value={dropoff}
        onChangeText={setDropoff}
      />

      <TouchableOpacity style={styles.button} onPress={handleRequest}>
        <Text style={styles.buttonText}>Request Delivery</Text>
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
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
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
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
