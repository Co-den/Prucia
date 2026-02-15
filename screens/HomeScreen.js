import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

const categories = [
  {
    id: '1',
    title: 'Dresses',
    image: {uri:'../assets/categories/p1.jpg'},
  },
  {
    id: '2',
    title: 'Streetwear',
    image: {uri:'../assets/categories/p2.jpg'},
  },
  {
    id: '3',
    title: 'Runway',
    image: {uri:'../assets/categories/p3.jpg'},
  },
  {
    id: '4',
    title: 'Accessories',
    image: {uri:'../assets/categories/p4.jpg'},
  },
  {
    id: '5',
    title: 'Bridal',
    image: {uri:'../assets/categories/b1.jpg'},
  },
  {
    id: '6',
    title: 'Casual',
    image: {uri:'../assets/categories/p1.jpg'},
  },
];

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Collections', { category: item.title })}
    >
      <ImageBackground
        source={item.image}
        style={styles.image}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>PRUCIA COLLECTIONS</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    color: '#111',
  },
  card: {
    flex: 1,
    margin: 8,
    height: width * 0.5,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#f2f2f2',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
