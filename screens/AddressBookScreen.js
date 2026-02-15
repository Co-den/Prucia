import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddressBookScreen({ navigation }) {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      label: 'Home',
      addressLine1: '123 Fashion St.',
      addressLine2: 'Suite 4B',
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      postalCode: '100001',
    },
    {
      id: '2',
      label: 'Work',
      addressLine1: '456 Corporate Ave.',
      addressLine2: '',
      city: 'Abuja',
      state: 'FCT',
      country: 'Nigeria',
      postalCode: '900001',
    },
  ]);

  const deleteAddress = (id) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAddresses((prev) => prev.filter((addr) => addr.id !== id));
            Alert.alert('Deleted', 'Address has been deleted.');
          },
        },
      ]
    );
  };

 

  const editAddress = (id) => {
    Alert.alert('Edit Address', `This will open the edit form for address ID: ${id} (to be implemented).`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <Text style={styles.label}>{item.label}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => editAddress(item.id)} style={styles.actionButton}>
            <Ionicons name="create-outline" size={20} color="#f68b1e" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteAddress(item.id)} style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color="#e53935" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.addressText}>{item.addressLine1}</Text>
      {item.addressLine2 ? <Text style={styles.addressText}>{item.addressLine2}</Text> : null}
      <Text style={styles.addressText}>
        {item.city}, {item.state}, {item.country} - {item.postalCode}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Address Book</Text>

        {addresses.length === 0 ? (
          <Text style={styles.empty}>No addresses saved.</Text>
        ) : (
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1 }}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={()=> navigation.navigate('AddAddress')}>
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.addText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  empty: { textAlign: 'center', marginTop: 30, color: '#999' },
  addressCard: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: { fontSize: 18, fontWeight: '600', color: '#333' },
  addressText: { fontSize: 16, color: '#555' },
  actionButtons: { flexDirection: 'row' },
  actionButton: { marginLeft: 15 },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#f68b1e',
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
});
