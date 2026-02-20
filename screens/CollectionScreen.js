import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const productsByCategory = {
  Dresses: [
    {
      id: '1',
      name: 'Silk Maxi Dress',
      images: [
        require('../assets/products/p1.jpg'),
        require('../assets/products/p2.jpg'),
        require('../assets/products/p3.jpg'),
      ],
      price: 20000,
    },
    {
      id: '2',
      name: 'Red Carpet Gown',
      images: [
        require('../assets/products/p2.jpg'),
        require('../assets/products/p2.jpg'),
      ],
      price: 35000,
    },
  ],
  Makeup: [
    {
      id: '3',
      name: 'Gold Earrings',
      images: [
        require('../assets/products/p3.jpg'),
        require('../assets/products/p3.jpg'),
      ],
      price: 5000,
    },
  ],
  Bridal: [
    {
      id: '4',
      name: 'Traditional Bridal Attire',
      images: [
        require('../assets/products/k2.jpg'),
        require('../assets/products/k2.jpg'),
      ],
      price: 15000,
    },
    {
      id: '5',
      name: 'White Bridal Gown',
      images: [
        require('../assets/k5.jpeg'),
        require('../assets/k6.jpeg'),
        require('../assets/k7.jpeg'),
      ],
      price: 60000,
    },
  ],
};

export default function CollectionScreen({ route, navigation }) {
  const { category } = route.params;
  const products = productsByCategory[category] || [];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={item.images[0]} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₦{item.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 60,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
