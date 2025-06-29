import { use } from 'react'
import api from '../axiosInterseptor'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const addToCartApi  = async(productId: string, quantity: number)=>{
    try{
        const response  = await api.post("/cart/add",{
            productId,
            quantity
        })
        if(response.status == 200){
            const data = await response.data();
            Alert.alert(`tem added to cart Successfully`)
        }else{
            Alert.alert(`Something went wrong...`)
        }
       
    }catch(err){
        console.log(`unable to add cart items... ${err}`)
    }
}

    export const getCart = async(userId:string)=>{
        console.log("Cart api has been hit......")
        try{
            const res = await api.get(`/cart/${userId}`)
            if(res.status == 200){
                console.log(res.data.cart)
                return res.data.cart
            }
        }catch(err){
            console.log(`unable to get cart items... ${err}`)
        }
        
    }
    export const removeCartItemApi  = async(productId: string)=>{
try{
    const res = await api.delete(`/cart/remove/${productId}`)
    if(res.status ==200){
        Alert.alert("cart Item removed successfullt...")
        console.log(res.data)
        return res.data
        
    }
}catch(err){
    Alert.alert("something went wrong...")
}
    }
    

