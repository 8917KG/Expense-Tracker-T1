import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";


export function HomeScreen(props) {

  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const [expenseDate, setExpenseDate] = useState('')
  const [location, setLocation] = useState('')
  const [expenseFor, setExpenseFor] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (!props.authStatus) {
      navigation.reset({ index: 0, routes: [{ name: "Sign In" }] })
    }
  }, [props.authStatus])

  const saveExpense = () => {
    setShowModal( false )
    const expenseObj = {expenseDate: expenseDate, location: location, expenseFor: expenseFor, amount: amount}
    props.add(expenseObj)
  }

  return (
    <View>
      <Text>Home Screen</Text>

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
        transparent={false}
      >
        <View>

          <Text>Expense Date:</Text>
          <TextInput 
            value={expenseDate}
            onChangeText={(val) => setExpenseDate(val)}
          />

          <Text>Location:</Text>
          <TextInput
            value={location}
            onChangeText={(val) => setLocation(val)}
          />

          <Text>Expense For:</Text>
          <TextInput 
            value={expenseFor}
            onChangeText={(val) => setExpenseFor(val)}
          />

          <Text>Amount:</Text>
          <TextInput 
            value={amount}
            onChangeText={(val) => setAmount(val)}
          />

          <View>
            <TouchableOpacity onPress={() => saveExpense()}>
              <Text>
                Save
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text>Add Expense</Text>
      </TouchableOpacity>
    </View>
  )
} 