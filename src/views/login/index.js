import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import style from "./style";
import { Google } from 'expo'
import * as Facebook from 'expo-facebook'
import firebase from '../../api/firebase'

const Login = ({ navigation, login }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
      }
      // Do other things
    });
    console.log(login)
  }, []);

   loginWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "304290495073-17lh08lqersl4rpqlq9rqdc0hqos47ap.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
        console.log('login google')
        console.log(result.user)
        login({
          userName: result.user.name,
          email: result.user.email,
          UserId: result.user.id
        })
        navigation.navigate('dashboard')
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  loginWithFacebook = async () => {
    const result = await Facebook.logInWithReadPermissionsAsync(
      '588718061654132',
      { permissions: ['public_profile', "email", "user_friends"] }
    );
  
    if (result.type === 'success') {
      console.log('login fb')
      navigation.navigate('dashboard')
      // Build Firebase credential with the Facebook access token.
      // const credential = firebase.auth.FacebookAuthProvider.credential(token);
  
      // Sign in with credential from the Facebook user.
      // firebase.auth().signInWithCredential(credential).catch((error) => {
      //   console.log('facebook error')
      //   // Handle Errors here.
      // });
    }
  }
  return (
    <View style={style.container}>
      <Button title="Sign in with Facebook" onPress={() => loginWithFacebook() } />
      <Button title="Sign in with Google" onPress={() => loginWithGoogle()} />
    </View>
  );
  
};

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login)