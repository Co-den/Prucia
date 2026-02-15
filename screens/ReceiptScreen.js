import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function ReceiptScreen({ route }) {
  const { paymentInfo, items } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Receipt</Text>

      <Text style={styles.label}>Reference:</Text>
      <Text style={styles.value}>{paymentInfo.transactionRef || paymentInfo.reference}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{paymentInfo.status}</Text>

      <Text style={[styles.label, { marginTop: 20 }]}>Purchased Items:</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name} x {item.quantity}</Text>
            <Text>₦{(item.price * item.quantity).toLocaleString()}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>
        Total: ₦{items.reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString()}
      </Text>

      <Text style={styles.thankYou}>Thank you for shopping with PRUCIA!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 18, fontWeight: '600', marginTop: 10 },
  value: { fontSize: 16, marginBottom: 5 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  thankYou: {
    fontSize: 18,
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#555',
  },
});
