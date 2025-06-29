
import { useRouter } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListRenderItem } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../utils/axiosInterseptor';

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Fetch products every time screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await api.get("/products");
          setProducts(response.data.data || []);
        } catch (err) {
          console.log("Error fetching products:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, [])
  );

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    if (!item || !item._id || !item.name || !item.imageUrl) return null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: '/stack/productDetails',
            params: { product: JSON.stringify(item) },
          })
        }
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          onError={(e) =>
            console.log('Image load error:', e.nativeEvent.error)
          }
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00b894" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    height: 120,
    borderRadius: 8,
    marginBottom: 6,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: '#00b894',
    fontWeight: '700',
  },
});
