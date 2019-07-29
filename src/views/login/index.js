import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import style from "./style";
import { Google } from 'expo'
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook'
import firebase from '../../api/firebase'

import { connect } from 'react-redux'
import { login } from '../../../store/action'

const Login = ({ navigation, login }) => {
  useEffect(() => {
    // initAsync()
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
      }
      // Do other things
    });
    console.log(login)
  }, []);

  // first attempt
  // loginWithGoogle = async () => {
  //   try {
  //     const result = await Google.logInAsync({
  //       androidClientId:
  //         "304290495073-17lh08lqersl4rpqlq9rqdc0hqos47ap.apps.googleusercontent.com",
  //       scopes: ["profile", "email"]
  //     })
  //     if (result.type === "success") {
  //       console.log('login google')
  //       console.log(result.user)
  //       login({
  //         userName: result.user.name,
  //         email: result.user.email,
  //         UserId: result.user.id,
  //         photoUrl: result .user.photoUrl
  //       })
  //       navigation.navigate('dashboard')
  //     } else {
  //       console.log("cancelled")
  //     }
  //   } catch (e) {
  //     console.log("error", e)
  //   }
  // }

  // first attempt
  loginWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "304290495073-kltkc2u9c27gmvan6u2u60rpavh76eq1.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
        const credential = await firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken)
        login({
          userName: result.user.name,
          email: result.user.email,
          UserId: result.user.id,
          photoUrl: result .user.photoUrl
        })
        navigation.navigate('dashboard')
        firebase.auth().signInWithCredential(credential).catch((error) => {
          // Handle Errors here.
          console.log(error)
        });
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
      {/* <Button title="Sign in with Google" onPress={() => signInWithGoogleAsync()} /> */}
      {/* <Button title="Sign in with Google" onPress={() => signInAsync()} /> */}
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