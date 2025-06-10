import React, { useState } from "react";
import { router, useRouter } from "expo-router";
import api from "../utils/axiosInterseptor"
import { View, Text, Button, TextInput, Alert,StyleSheet } from "react-native";
import {useAuth} from "../hooks/useAuth"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginScreen :React.FC=()=>{
    const{login, showSpinner, hideSpinner} = useAuth();
const [email, setEmail] = useState<string>();
const [password, setPassword] = useState<string>();

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
    <View style={styles.container}>
        <Text style={{textAlign:'center',alignContent:'center',fontSize:20,fontWeight:"bold",paddingBottom:5 }}> Login </Text>
        <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        />
        <TextInput 
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        />
        <Button title="Login" onPress={handleLogin}  />
    </View>
)
}
export default LoginScreen
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5,
  },
})