import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

//Screens
import { HomeScreen } from './screens/HomeScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { SignInScreen } from './screens/SignInScreen';

//firebase
import { firebaseConfig } from './config/Config';
import { initializeApp } from 'firebase/app'
import { getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
 } from "firebase/firestore";
import { async } from '@firebase/util';

const Stack = createNativeStackNavigator();
const FBApp = initializeApp( firebaseConfig )
const FBAuth = getAuth( FBApp )
const FBdb = getFirestore( FBApp )


export default function App() {

  const [auth, setAuth] = useState()

  onAuthStateChanged ( FBAuth, (user) => {
    if ( user ){
      setAuth (user)
      console.log( user.uid )
    }
    else {
      setAuth (null)
    }
  })

  const SignUp = ( email, password ) => {
    createUserWithEmailAndPassword( FBAuth, email, password )
    .then((userCredential) => console.log(userCredential))
    .catch((error) => console.log(error))
  }

  const SignIn = (email, password) => {
    signInWithEmailAndPassword(FBAuth, email, password)
    .then ((userCredential) => console.log(userCredential))
    .catch((error) => console.log(error))
  }

  const SignOut = () => {
    signOut(FBAuth)
    .then(() => {

    })
    .catch((error) => console.log(error))
  }

  const AddData = async (expense) => {
    const userId = auth.uid
    const path = `users/${userId}/expenses`
    // const data = {id: new Date().getTime(), description: "sample data"}
    const ref = await addDoc(collection (FBdb, path), expense)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name = "Welcome" component={WelcomeScreen} />  */}
        <Stack.Screen name = "Sign Up" >
          { (props) => <SignUpScreen {...props} handler = {SignUp} authStatus={auth}/>}
        </Stack.Screen>
        <Stack.Screen name = "Sign In">
          {(props) => <SignInScreen {...props} handler = {SignIn} authStatus={auth} />}
        </Stack.Screen>
        <Stack.Screen name = "Home" >
          {(props) => <HomeScreen {...props} authStatus={auth} signOutHandler = {SignOut} add={AddData}/> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
