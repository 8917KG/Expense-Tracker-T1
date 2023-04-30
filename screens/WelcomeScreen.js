import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function WelcomeScreen ( props ){

const navigation = useNavigation()

 return(
  <View>
   <Text>Welcome Screen</Text>
   <View>
    <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>Sign Up Here</TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>Login here</TouchableOpacity>
   </View>
  </View>
 )
} 