import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { CartContext } from '../contexts/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function CartScreen({ navigation }) {
  const {
    cartItems,
    removeFromCart,
    savedItems,
    saveForLater,
    moveToCart,
  } = useContext(CartContext);

  const [loading, setLoading] = useState(true); // Spinner state

  useEffect(() => {
    // Simulate cart loading (replace this with your actual fetch/init)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay for example

    return () => clearTimeout(timer);
  }, []);

  const renderCartItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
        <TouchableOpacity
          onPress={() => {
            saveForLater(item);
            Alert.alert('Saved for later', `${item.name} saved for later.`);
          }}
        >
          <Text style={styles.saveText}>Save for later</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            removeFromCart(item.id);
            Alert.alert('Removed', `${item.name} removed from cart.`);
          }}
        >
          <Text style={[styles.saveText, { color: 'red' }]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSavedItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
        <TouchableOpacity
          onPress={() => {
            moveToCart(item);
            Alert.alert('Moved to cart', `${item.name} moved back to cart.`);
          }}
        >
          <Text style={styles.saveText}>Move to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
        />
      )}

      <Text style={[styles.header, { marginTop: 30 }]}>Saved for Later</Text>
      {savedItems.length === 0 ? (
        <Text style={styles.emptyText}>No items saved for later.</Text>
      ) : (
        <FlatList
          data={savedItems}
          keyExtractor={(item) => item.id}
          renderItem={renderSavedItem}
        />
      )}

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          if (cartItems.length === 0) {
            Alert.alert('Cart Empty', 'Add items to cart before checkout.');
            return;
          }
          navigation.navigate('Checkout');
        }}
      >
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 70, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', paddingBottom: 30, marginBottom: 10 },
  emptyText: { fontSize: 16, fontStyle: 'italic', color: '#999' },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  details: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 18, fontWeight: '600' },
  price: { fontSize: 16, color: '#555', marginBottom: 8 },
  saveText: { color: '#ff6f61', fontWeight: 'bold', marginVertical: 4 },
  checkoutButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
