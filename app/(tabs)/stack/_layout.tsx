// app/(stack)/_layout.tsx
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function StackLayout() {
    const router  = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
        <Stack.Screen
        name='productDetails'
        options={{
            title:"Product details",
            headerLeft:()=>(
                <TouchableOpacity onPress={()=>router.back()} style={{paddingHorizontal:16}}>
<Ionicons name='arrow-back' size={24} color='black' />
                </TouchableOpacity>
            ),
            
        }}
        />

    </Stack>
  );
}
