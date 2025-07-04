import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from "react-native";
import { useCart } from "@/hooks/cortContext";
import { useRouter } from "expo-router";
import RazorpayCheckout from 'react-native-razorpay';
import api from '../../../utils/axiosInterseptor'
import { useAuth } from "@/hooks/useAuth";



export default function productDetails() {
    const router = useRouter();
    const { addToCart } = useCart();
    const { product } = useLocalSearchParams();
    const parsedProduct = JSON.parse(product as string);
    const {user} =useAuth(); 

    const handleAddToCart = async () => {
        await addToCart({
            productId: parsedProduct._id,
            name: parsedProduct.name,
            imageUrl: parsedProduct.imageUrl,
            price: parsedProduct.price,
            quantity: parsedProduct.quantity
        })
        router.push({
            "pathname": "/(tabs)/cartScreen"
        })
        // Alert.alert(`Added ToCart`, `${parsedProduct.name} has been adde to cart`)

    }
//     const handleCheckOut = async (amount: number) => {
//         console.log("checkout method hit..."+amount)
//         const receipt = "receipt_order_001";
//         try {
// const response = await api.post("/payments/createPaymentIntent",{
//     amount,
//     receipt
// })
// const {order} = (await response).data;
// console.log("Order is... "+JSON.stringify(order,null,2))
// const options:any = {
//     description: "SwiftBuy Order Payment",
//     currency:order.currency,
//     key:"rzp_test_uGH6EgWt72isIF",
//     amount:order.amount,
//     order_id: order.id,
//     name:"SwiftBuy",
//     prefil:{
//     email:"pawan.test@gmail.com",
//     contact: "9999999999",
//   name: "SwiftBuy User"
//     },
//     theme:{color:'#53a20e'}
// }
// RazorpayCheckout.open(options).then((data) =>{
//     console.log("payment Success "+ data);
// }).catch((error) => {
//     console.log(`Error: ${JSON.stringify(error, null, 2)} | ${error}`);
// })
//         }
//         catch (error) {
//             console.log(`Error: ${JSON.stringify(error, null, 2)}`);
//         }
//     }
const handleCheckOut = async (amount: number) => {
    console.log("Checkout initiated with amount:", amount);
  
    const receipt = "receipt_order_001";
  
    try {
      const response = await api.post("/payments/createPaymentIntent", {
        amount,
        receipt,
      });
  
      const { order } = response.data;
  
    //   console.log("Razorpay order created:", JSON.stringify(order, null, 2));
  
      const options:any = {
        description: "SwiftBuy Order Payment",
        currency: order.currency,
        key: "rzp_test_uGH6EgWt72isIF", // ✅ Your actual Razorpay test key here
        amount: order.amount,
        order_id: order.id,
        name: "SwiftBuy",
        prefill: {
          email: "pawan.test@gmail.com",
          contact: "9999999999",
          name: "SwiftBuy User",
        },
        theme: { color: "#53a20e" },
      };
  console.log(`options.... ${ JSON.stringify(options, null, 2)}`)

      RazorpayCheckout.open(options)
        .then((data) => {
          console.log("Payment Success:", data);
          Alert.alert("Success", `Payment ID: ${data.razorpay_payment_id}`);
        })
        .catch((error) => {
          console.log("Payment Error:", JSON.stringify(error, null, 2));
          Alert.alert("Payment Failed", error.description || "Unknown error");
        });
  
    } catch (error) {
      console.log("Order Creation Failed:", JSON.stringify(error, null, 2));
      Alert.alert("Error", "Failed to initiate Razorpay order.");
    }
  };
  
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={{ uri: parsedProduct.imageUrl }} />
            <Text style={styles.name}>{parsedProduct.name}</Text>
            <Text style={styles.price}>₹{parsedProduct.price}</Text>
            <Text style={styles.description}>{parsedProduct.description}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Add to cart" onPress={handleAddToCart} />
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => handleCheckOut(parsedProduct.price)}>
                <Text> Checkout </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff"
    },
    image: {
        width: '100%',
        height: 240,
        borderRadius: 10,
        marginBottom: 16
    },
    name: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8
    },
    price: {
        fontSize: 20,
        backgroundColor: "lightgreen",
        marginBottom: 8
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#555"
    },
    buttonContainer: {
        marginTop: 20
    },
    checkoutButton:{
         padding: 10,
        backgroundColor: "#27ae60",
        marginTop:10,
        justifyContent:"center",
        alignItems:"center"
    }
})