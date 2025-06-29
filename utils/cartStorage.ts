import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem } from '../hooks/cortContext';

const cart_key = "guest_cart"

export const addToGuestCart = async (cartItems : CartItem[])=>{
await AsyncStorage.setItem(cart_key, JSON.stringify(cartItems))
}
export const loadGuestCart = async(): Promise<CartItem[]>=>{
const json = await AsyncStorage.getItem(cart_key);
return json? JSON.parse(json) : [];
}
export const clearGuestCart = async()=>{
    await AsyncStorage.removeItem(cart_key);
}