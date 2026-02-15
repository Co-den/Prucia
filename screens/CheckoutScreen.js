import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default CheckoutScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Delivery Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TextInput style={styles.input} placeholder="Street Address" />
        <TextInput style={styles.input} placeholder="City" />
        <TextInput style={styles.input} placeholder="State" />
        <TextInput style={styles.input} placeholder="Country" />
        <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" />
      </View>

      {/* Delivery Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Method</Text>
        <TouchableOpacity style={styles.option}>
          <Text>Standard Delivery - ₦1,200 (3–5 days)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>Express Delivery - ₦2,500 (24hrs)</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity style={styles.option}>
          <Text>Paystack (Card, Bank, USSD)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text>Subtotal:</Text>
          <Text>₦15,000</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Shipping:</Text>
          <Text>₦1,200</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>₦16,200</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Receipt')}>
        <Text style={styles.checkoutText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 30, // Adjust for header

  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop:6,
    textAlign: 'center',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: '#ff6f61',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

