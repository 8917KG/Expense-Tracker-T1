import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList } from "react-native";
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

  const ListClickHandler = (data) =>{
    navigation.navigate("Expense Detail", data)
  }

  const ListItem = ( props ) => {
    return (
      <View>
        <TouchableOpacity onPress={() => ListClickHandler({id: props.id, expenseFor: props.expenseFor, location: props.location, amount: props.amount, expenseDate: props.expenseDate })}>
          <Text>{props.expenseDate}</Text>
        </TouchableOpacity>
        <Text>{props.location}</Text>
        <Text>{props.amount}</Text>
        <Text>{props.expenseFor}</Text>
      </View>
    )
  }

  const ListItemSparator =  ( props ) => {
    return(
      <View></View>
    )
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

      <FlatList 
        data = {props.data}
        renderItem={({item}) => (<ListItem expenseDate={item.expenseDate} id={item.id} location={item.location} expenseFor={item.expenseFor} amount={item.amount}/>)}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ListItemSparator}
      /> 
    </View>
  )
} 