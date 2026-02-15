import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with your actual API call
    setTimeout(() => {
      const mockOrders = [
        {
          id: 'ORD-1021',
          status: 'Delivered',
          date: '2024-06-18',
          total: 17500,
          items: 3,
        },
        {
          id: 'ORD-1020',
          status: 'In Transit',
          date: '2024-06-10',
          total: 9200,
          items: 1,
        },
        {
          id: 'ORD-1019',
          status: 'Cancelled',
          date: '2024-05-28',
          total: 14300,
          items: 2,
        },
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1200);
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>Order #{item.id}</Text>
      <Text style={styles.status}>Status: <Text style={{ fontWeight: 'bold' }}>{item.status}</Text></Text>
      <Text>Date: {item.date}</Text>
      <Text>Items: {item.items}</Text>
      <Text style={styles.total}>Total: ₦{item.total.toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#f68b1e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  orderCard: {
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  status: {
    fontSize: 14,
    marginBottom: 4,
  },
  total: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#f68b1e',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
