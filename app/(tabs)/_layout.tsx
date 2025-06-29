// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform, TouchableOpacity } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons'
// import { useRouter } from 'expo-router';
// import BlurTabBarBackground from '@/components/ui/TabBarBackground.ios';


// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
   
//     <SafeAreaProvider>
//     <Tabs screenOptions={{
//           tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//           headerShown: false,
//           tabBarButton: HapticTab,
//           tabBarBackground: TabBarBackground,
//           tabBarStyle: Platform.select({
//             ios: {
//               // Use a transparent background on iOS to show the blur effect
//               position: 'absolute',
//             },
//             default: {},
//           }),
//         }}>
//   <Tabs.Screen
//     name="productsList"
//     options={{
//       title: "Products",
//       href: '/',
      
//       tabBarIcon: ({ color }) => <IconSymbol size={28} name="cart.fill" color={color} />,
//     }}
//   />
//   <Tabs.Screen
//     name="explore"
//     options={{
//       title: "Explore",
//       tabBarIcon: ({ color }) => <IconSymbol size={28} name="cart.fill" color={color} />,
//     }}
//   />
//   <Tabs.Screen
//     name="productDetails"
//     options={{
     
//       href: null, // 👈 Hide from tab bar
//       headerShown: true,
//       headerTitle:'',
//       headerLeft:()=>{
// const router  = useRouter();
// return(
//   <TouchableOpacity onPress={()=> router.back()}>
// <Ionicons name='arrow-back' size={24} color="black" />
//   </TouchableOpacity >
// )
//       },
//     }}
//   />
//   <Tabs.Screen
//     name="index"
//     options={{
//       title: "Index",
//       href: null, // 👈 Hide from tab bar
//     }}
//   />
//   <Tabs.Screen
//   name="cartScreen"
//   options={{
//     title: "Cart",
//     tabBarIcon: ({ color }) => <IconSymbol name="cart.fill" color={color} size={24} />,
//   }}
// />
// </Tabs>
// </SafeAreaProvider>
//   );
// }

// /app/_layout.tsx



import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="productsList"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => (
            <Ionicons name="pricetags" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="cartScreen"
        options={{
          headerShown:true,
          headerLeft:()=>(
            <TouchableOpacity onPress={()=> router.back()} style={{paddingHorizontal: 16}}>
              <Ionicons name='arrow-back' size={24} color="black" />
            </TouchableOpacity>
          ),
          title: 'Cart',
          headerTitleAlign:"center",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
  name="profileScreen"
  options={{
    headerShown:true,
    title:"Profile",
    headerTitleAlign:"center",
    headerTitleStyle:{
fontSize:26,
fontWeight:800,
    },
    tabBarIcon: ({ color }) => (
      <Ionicons name="person-circle" color={color} size={24} />
    ),
  }} />
      <Tabs.Screen
  name="stack"
  options={{
    href: null, 
  }} />
  <Tabs.Screen
  name="index"
  options={{
    href: null, 
  }} />
     
    </Tabs>
  );
}


