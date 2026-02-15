import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../contexts/CartContext';

const { width, height } = Dimensions.get('window');

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { addToCart } = useContext(CartContext);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    Alert.alert('Success', 'Product added to cart!');
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        <FlatList
          data={product.images}
          horizontal
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <Image source={item} style={styles.image} />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentImageIndex(index);
          }}
        />

        <View style={styles.indicatorContainer}>
          {product.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentImageIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        <View style={styles.details}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₦{product.price.toLocaleString()}</Text>
          <Text style={styles.description}>
            Elegant and stylish {product.name.toLowerCase()} perfect for any occasion.
          </Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyButton} onPress={decrement}>
              <Text style={styles.qtyButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.qtyButton} onPress={increment}>
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Fullscreen Modal for Image */}
        <Modal visible={modalVisible} transparent>
          <View style={styles.modalBackground}>
            <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
            {selectedImage && (
              <Image source={selectedImage} style={styles.fullscreenImage} />
            )}
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: height * 0.5,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    margin: 4,
  },
  activeIndicator: {
    backgroundColor: '#333',
    width: 12,
  },
  details: {
    padding: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  price: {
    fontSize: 22,
    color: '#888',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  qtyButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 6,
  },
  qtyButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 16,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: width,
    height: height * 0.7,
    resizeMode: 'contain',
  },
  modalClose: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
