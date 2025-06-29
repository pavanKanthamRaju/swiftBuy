import React from 'react';
import { View, Text, Image, FlatList, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { CartItem, useCart } from '../../hooks/cortContext'; // adjust path
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { cartItems, removeCartItem, clearCart, addToCart } = useCart();

  const [loading, setLoading] = React.useState(true);
const addTocartFromCart = async(item:CartItem)=>{
  await addToCart({
    productId: item.productId,
    name:item.name,
    imageUrl:item.imageUrl,
    price:item.price,
    quantity:item.quantity
})
}
  React.useEffect(() => {
    // Delay to simulate loading (optional)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 100); // Small delay to wait for cart to initialize (can also tie this to useAuth's loading)

    return () => clearTimeout(timeout);
  }, [cartItems]);

  const total = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const renderItem = ({ item }: { item: CartItem }) => {
    if (!item || !item.imageUrl || !item.name || item.quantity === undefined || item.price === undefined) {
      return null;
    }

    return (
      <View style={styles.item}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={{fontSize: 16,}}>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</Text>
          <View style={{  flexDirection: "row", padding:10 }}>
            <TouchableOpacity onPress={()=>addTocartFromCart(item)}>
              <Ionicons name="add-circle" size={24} />
            </TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight:"800", marginLeft:7, marginRight:7}}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => removeCartItem(item)}>
              <Ionicons name="remove-circle" size={24} />
            </TouchableOpacity>
          </View>
        
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00b894" />
        <Text>Loading cart...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cartItems && cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={renderItem}
          />
          <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>
          <Button title="Clear Cart" onPress={clearCart} />
          <Text ></Text>
          <Button title="Proceed to Checkout" onPress={() => { /* add logic */ }} />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Your cart is empty</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor:"lightgray"
  },
  image: {
    
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    padding:5
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
  },
});
