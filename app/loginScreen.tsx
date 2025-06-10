import React, { useState } from "react";
import { router, useRouter } from "expo-router";
import api from "../utils/axiosInterseptor"
import { View, Text, Button, TextInput, Alert,StyleSheet, ImageBackground } from "react-native";
import {useAuth} from "../hooks/useAuth"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginScreen :React.FC=()=>{
    const{login, showSpinner, hideSpinner} = useAuth();
const [email, setEmail] = useState<string>();
const [password, setPassword] = useState<string>();
const backgroundImage = require('../assets/images/cool-background.png'); 
const handleLogin = async()=>{
    showSpinner();
    if(!email || !password){
        Alert.alert("Please fill al the required fields")
        return
    }
    try{
const response  = await api.post("/auth/login/",{email,password})

const {token, user} = response.data
await login(token)
hideSpinner();
router.replace('/(tabs)');
Alert.alert("success", "Login successfull")
    }
    catch(err:any){
Alert.alert("Login Failed", err.message)
    }
}
return(
    <ImageBackground
    source={backgroundImage} // Use any elegant background image URL
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
        <Text style={styles.title}> Login </Text>
        <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
        />
        <TextInput 
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#888"
        />
        <Button title="Login" onPress={handleLogin}  />
    </View>
    </ImageBackground>
)
}
export default LoginScreen
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    container: {  flex: 1,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay to enhance text visibility
        borderRadius: 10,
        padding: 20, },
  title: {  fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5,color: '#fff', 
  },
})