import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const api = axios.create({
    baseURL:"http://192.168.1.20:5050/api",
    timeout:10000

})
api.interceptors.request.use(async(config)=>{
const token = await AsyncStorage.getItem("token")
if(token){
    config.headers.Authorization = `Bearer ${token}`
}
return config
},(error)=>{
    Promise.reject(error)
})
export default api