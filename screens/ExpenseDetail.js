import { View, Text, TouchableOpacity, StyleSheet} from  'react-native'
import { useRoute } from '@react-navigation/native'

export function ExpenseDetail (props) {

 const route = useRoute()
 const { id, expenseDate, location, expenseFor, amount } = route.params
 return(
  <View>
   <Text>{expenseDate}</Text>
   <Text>{expenseFor}</Text>
   <Text>{location}</Text>
   <Text>{amount}</Text>
  </View>
 )
}