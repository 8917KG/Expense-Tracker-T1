import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export function SignUpScreen(props) {

  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState("")
  const [validPw, setValidPw] = useState(false)
  const [validForm, setValidForm] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    if (email.indexOf('@') > 0) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }
  }, [email])

  useEffect(() => {
    if (password.length >= 8) {
      setValidPw(true)
    }
    else {
      setValidPw(false)
    }
  }, [password])

  useEffect(() => {
    if (validEmail && validPw) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  })

  useEffect (() => {
    if (props.authStatus){
      // navigation.navigate("Home")
      navigation.reset({ index: 0, routes: [{name: "Home"}]})
    }
  }, [props.authStatus])

  return (
    <View>

      <Text>Sign Up Here</Text>
      <View>

        <Text>Email address</Text>
        <TextInput
          placeholder="you@domain.com"
          value={email}
          onChangeText={(emailText) => setEmail(emailText)}
        />

        <Text>Password</Text>
        <TextInput
          placeholder="minimum 8 characters"
          value={password}
          onChangeText={(pwText) => setPassword(pwText)}
          secureTextEntry={true}
        />

        <TouchableOpacity disabled={(validForm) ? false : true} onPress={()=> props.handler(email,password)}>
          <Text>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text>Have an account? Sign in here</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

})