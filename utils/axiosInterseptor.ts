import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const api = axios.create({
    baseURL:"http://172.16.3.112:5050/api",
    timeout:10000

})
api.interceptors.request.use(async(config)=>{
const token = await AsyncStorage.getItem("tokenm")
if(token){
    config.headers.Authorization = `Bearer ${token}`
}
return config
},(error)=>{
    Promise.reject(error)
})
export default api