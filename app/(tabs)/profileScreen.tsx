import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { FlipInEasyX } from "react-native-reanimated";

export default function profileScreen(){
    const {logout, user} = useAuth();

return(
    <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
<Image source={{uri:"https://i.pravatar.cc/300"}} style={{height:200, width:200, marginBottom:10}} />
<Text style={{marginBottom:10, fontSize:24, fontWeight:"600"}}>  {user ? user.email : "Guest User"}</Text>
<TouchableOpacity onPress={()=>logout()} style={{backgroundColor:"#c20e17", paddingVertical:12, paddingHorizontal:54, borderRadius:10}}>
    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500", alignContent:"center" }}>Logout</Text>
</TouchableOpacity>
    </View>
)
}