import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { CartContext } from '../contexts/CartContext';

export default function SavedItemsScreen({ navigation }) {
  const { savedItems, moveToCart, removeFromSaved } = useContext(CartContext);

  const handleMoveToCart = (item) => {
    moveToCart(item);
    Alert.alert('Moved', `${item.name} has been moved to cart.`);
  };

  const handleRemove = (itemId) => {
    removeFromSaved(itemId);
    Alert.alert('Removed', `Item has been removed from saved items.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => handleMoveToCart(item)}>
            <Text style={styles.move}>Move to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemove(item.id)}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Items</Text>
      {savedItems.length === 0 ? (
        <Text style={styles.empty}>You have no saved items.</Text>
      ) : (
        <FlatList
          data={savedItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 70, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  empty: { fontSize: 16, fontStyle: 'italic', color: '#777' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 18, fontWeight: '600' },
  price: { fontSize: 16, color: '#444', marginTop: 6 },
  buttons: { flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' },
  move: { color: '#2e7d32', fontWeight: 'bold' },
  remove: { color: '#e53935', fontWeight: 'bold' },
});
