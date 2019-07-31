import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, Button, ImageBackground, Dimensions, Image, ActivityIndicator } from "react-native";
import style from "./style";
import { Google } from 'expo'
import * as Facebook from 'expo-facebook'
import firebase from '../../api/firebase'
import { LinearGradient } from 'expo-linear-gradient'

import { connect } from 'react-redux'
import { login } from '../../../store/action'
import { TouchableNativeFeedback } from "react-native-gesture-handler";

let {width, height} = Dimensions.get('window')

const Login = ({ navigation, login }) => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
      }
      // Do other things
    });
  }, []);

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
        setLoading(true)        
        login({
          userName: result.user.name,
          email: result.user.email,
          UserId: result.user.id,
          photoUrl: result .user.photoUrl
        }, navigation.navigate)
        firebase.auth().signInWithCredential(credential).catch((error) => {
          // Handle Errors here.
          console.log(error)
        });
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      setLoading(false)
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
      <ImageBackground source={require('../../../assets/loginbg.jpg')} style={style.container}>
        <View style={{backgroundColor: 'rgba(0,0,0,0.75)', height: height, width: width, padding: 20}}>
          <View style={{height: (height/3)*2, justifyContent:'center'}}>
            <Text style={{fontFamily: 'montserrat-regular', textTransform:'uppercase', color: 'white', fontSize: 25}}>Pandai</Text>
            <Text style={{fontFamily: 'montserrat-regular', textTransform:'uppercase', color: 'white', fontSize: 25}}>dengan</Text>
            <Text style={{fontFamily: 'montserrat-black', textTransform:'uppercase', color: 'white', fontSize: 35}}>Pindai</Text>
            <Text style={{marginVertical: 20, fontFamily: 'montserrat-regular', fontSize: 25, color: 'white'}}>Start Now</Text>
          </View>
          {
            !loading ?
            <>
              <TouchableNativeFeedback onPress={loginWithGoogle}>
                <View style={{marginVertical: 10, borderRadius: 50, borderColor: 'white', borderWidth: 2, width: width - 40, padding: 20, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'white', fontSize: 15, fontFamily: 'montserrat-regular'}}>Sign in with google</Text>
                </View>
              </TouchableNativeFeedback>
              {/* <TouchableNativeFeedback onPress={loginWithFacebook}>
                <View style={{marginVertical: 10, borderRadius: 50, borderColor: 'white', borderWidth: 2, width: width - 40, padding: 20, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'white', fontSize: 15, fontFamily: 'montserrat-regular'}}>Sign in with facebook</Text>
                </View>
              </TouchableNativeFeedback> */}
            </>
            : <ActivityIndicator size="large" color="white" />
 

            
          }
        </View>
      </ImageBackground>
  );
  
};

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login)

// <Image
//           source={require('../../../assets/frontlogo.png')}  
//           style={{width: 250, height: 40}}
//         />