import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const categories = [
  { id: '1', name: 'Fruits', image: require('../../assets/images/Fruits.jpeg'), screen: 'Product', category: 'Fruits' },
  { id: '2', name: 'Vegetables', image: require('../../assets/images/Vegies.jpeg'), screen: 'Product', category: 'Vegetables' },
  { id: '3', name: 'Grains', image: require('../../assets/images/Grains.jpeg'), screen: 'Product', category: 'Grains' },
  { id: '4', name: 'Dairy', image: require('../../assets/images/Dairy.jpeg'), screen: 'Product', category: 'Dairy' },
] as const;


const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FarmBridge</Text>
        <Text style={styles.subtitle}>Connecting Farmers with Buyers</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for produce..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={filteredCategories}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate(item.screen, { category: item.category })}
        >
          <Image source={item.image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
        
        )}
        contentContainerStyle={styles.categoriesContainer}
      />

      <View style={styles.ctaContainer}>
        <Text style={styles.ctaText}>Are you a farmer? Start listing your produce today!</Text>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Admin')}>
          <Text style={styles.ctaButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50', // Green color for the title
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa', // Light gray for subtitle
    marginTop: 5,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#1e1e1e', // Dark input background
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#fff', // White text
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // White text
    marginBottom: 10,
  },
  categoriesContainer: {
    justifyContent: 'space-between', // Space between cards
  },
  categoryCard: {
    backgroundColor: '#1e1e1e', // Dark card background
    borderRadius: 10,
    margin: 5, // Space between cards
    alignItems: 'center',
    padding: 15,
    width: (screenWidth - 40) / 2 - 10, // Half the screen width minus padding and margin
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  categoryImage: {
    width: 80, // Larger image size
    height: 80,
    marginBottom: 10,
    borderRadius: 40, // Circular images
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // White text
    textAlign: 'center',
  },
  ctaContainer: {
    position: 'absolute', // Use absolute positioning
    bottom: 40, // Adjust this value to move the button higher or lower
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50', // Green background
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: '#121212', // Dark button background
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  ctaButtonText: {
    color: '#4CAF50', // Green text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;