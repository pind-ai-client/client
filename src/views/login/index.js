import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import style from "./style";
import * as firebase from 'firebase';
import { Facebook, Google } from 'expo'
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDoyydLwwVoReuTTiinYw7UBZ4CdaWOrTM",
  authDomain: "pindai-bf9cc.firebaseapp.com",
  databaseURL: "https://pindai-bf9cc.firebaseio.com",
};
firebase.initializeApp(firebaseConfig);

const Login = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
      }
    
      // Do other things
    });
  }, []);

   async function loginWithGoogle() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "304290495073-17lh08lqersl4rpqlq9rqdc0hqos47ap.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        console.log('succes login')
        // this.setState({
        //   signedIn: true,
        //   name: result.user.name,
        //   photoUrl: result.user.photoUrl
        // })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  async function loginWithFacebook() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '588718061654132',
      { permissions: ['public_profile'] }
    );
  
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
  
      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log('facebook error')
        // Handle Errors here.
      });
    }
  }
  return (
    <View style={style.container}>
      <Button title="Login" onPress={() => loginWithFacebook() } />
      <Button title="Sign in with Google" onPress={() => loginWithGoogle()} />
    </View>
  );
};

export default Login;
