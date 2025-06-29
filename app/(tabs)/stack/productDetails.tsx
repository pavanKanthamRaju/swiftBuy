import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View,  Text, Image, StyleSheet, ScrollView,Button, Alert} from "react-native";
import { useCart } from "@/hooks/cortContext";
import { useRouter } from "expo-router";



export default function productDetails(){
    const router = useRouter();
    const {addToCart} = useCart();
    const {product} = useLocalSearchParams();
    const parsedProduct = JSON.parse(product as string);
    const handleAddToCart = async()=>{
        await addToCart({
            productId: parsedProduct._id,
            name:parsedProduct.name,
            imageUrl:parsedProduct.imageUrl,
            price:parsedProduct.price,
            quantity:parsedProduct.quantity
        })
        router.push({
            "pathname": "/(tabs)/cartScreen"
        })
        // Alert.alert(`Added ToCart`, `${parsedProduct.name} has been adde to cart`)

    }
    return(
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={{uri:parsedProduct.imageUrl}} />
            <Text style={styles.name}>{parsedProduct.name}</Text>
            <Text style={styles.price}>₹{parsedProduct.price}</Text>
            <Text style={styles.description}>{parsedProduct.description}</Text>
<View style={styles.buttonContainer}>
    <Button title="Add to cart" onPress={handleAddToCart} />
</View>
        </ScrollView>
    )
 }
 const styles =StyleSheet.create({
    container:{
        padding:16,
        backgroundColor:"#fff"
    },
    image:{
width:'100%',
height:240,
borderRadius: 10,
marginBottom:16
    },
    name:{
        fontSize:22,
        fontWeight:"700",
        marginBottom:8
    },
    price:{
        fontSize:20,
        backgroundColor:"#27ae60",
        marginBottom:8
    },
    description:{
        fontSize:16,
        lineHeight:24,
        color:"#555"
    },
    buttonContainer:{
        marginTop:20
    }
 })