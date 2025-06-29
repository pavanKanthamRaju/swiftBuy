import React,{createContext,useContext, useEffect, useState} from 'react';
import { useAuth } from './useAuth';
import {addToGuestCart, loadGuestCart, clearGuestCart} from '../utils/cartStorage';
import { addToCartApi, removeCartItemApi,getCart } from '@/utils/api/cart';
import { AnimateStyle } from 'react-native-reanimated';


export type CartItem = {
    productId: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
  };
type cartContextType = {
    cartItems :CartItem[];
    addToCart: (item: CartItem)=> void;
    clearCart: ()=>void
    removeCartItem : (item: CartItem)=>void
}    
const cartContext = createContext<cartContextType | undefined>(undefined)

export const CartProvider = ({children}: {children: React.ReactNode})=>{
    const {user, token, loading } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem []>([]);
    useEffect(() => {
      const initializeCart = async () => {
        if (loading) return;
    
        if (user) {
          try {
            const cart = await getCart(user._id);
            const formatted = cart.map((item: any) => ({
              productId: item.productId._id,
              name: item.productId.name,
              imageUrl: item.productId.imageUrl,
              quantity: item.quantity,
              price: item.productId.price,
            }));
            setCartItems(formatted);
          } catch (err) {
            console.error("Error fetching user cart:", err);
            setCartItems([]);
          }
        } else {
          const guestCart = await loadGuestCart();
          setCartItems(guestCart);
        }
      };
    
      initializeCart();
    }, [user, loading]);
    

        const syncToLocal = async(items:CartItem[])=>{
            setCartItems(items);
            if(!user) await addToGuestCart(items);
        }

        const addToCart = async(item: CartItem) :Promise<void> => {
          const quantityToAdd = item.quantity ?? 1;
        
          const exist = cartItems.find(i => i.productId === item.productId);
          const updated: CartItem[] = exist
            ? cartItems.map(i =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + quantityToAdd }
                  : i)
            : [...cartItems, { ...item, quantity: quantityToAdd }];
        
          await syncToLocal(updated);
        
          if (user) await addToCartApi(item.productId, quantityToAdd);
        };
        
const clearCart = async()=>{
    setCartItems([]);
    if(!user) await clearGuestCart();
}
const removeCartItem = async (item: CartItem) => {
    console.log("remove cart iteh has been it...")
    const exist = cartItems.find(i => i.productId === item.productId);
    console.log("item id "+ item.productId)
    console.log("exist   "+cartItems[0].productId)
    if (!exist) return; // Do nothing if not in cart
  
    let updated: CartItem[];
  
    if (exist.quantity <= 1) {
      // Remove item completely
      updated = cartItems.filter(i => i.productId !== item.productId);
      console.log("updated   "+ updated)
    } else {
      // Reduce quantity
      updated = cartItems.map(i =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    }
  
    await syncToLocal(updated);
  
    if (user) {
      await removeCartItemApi(item.productId);
    }
  };
  
return(
    <cartContext.Provider value = {{cartItems, addToCart, clearCart, removeCartItem}}>
        {children}
    </cartContext.Provider>
)

}
export const useCart = ()=>{
    const ctx = useContext(cartContext);
    if(!ctx) throw new Error('useCart must be used in carprovider');
    return ctx
    
}