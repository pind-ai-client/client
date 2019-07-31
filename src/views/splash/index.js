import React, { useState, useEffect } from 'react'
import { View, Text, TouchableHighlight, Button, ImageBackground, Dimensions, Image, ActivityIndicator } from "react-native";
import style from "./style"
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { login } from '../../../store/action'
import * as Font from "expo-font";

let {width, height} = Dimensions.get('window')


const index = (props) => {
  const [loaded, setLoaded] = useState(false)
  const { login } = props
  checkLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        login({
          userName: user.displayName,
          email: user.email,
          UserId: user.uid,
          photoUrl: user.photoURL
        }, props.navigation.navigate)
        // props.navigation.navigate('dashboard')
      } else {
        props.navigation.navigate('login')
      }
    })
  }

  splash = async () => {
    await Font.loadAsync({
      "montserrat-regular": require('../../../assets/fonts/Montserrat-Regular.ttf'),
      "montserrat-black": require("../../../assets/fonts/Montserrat-Black.ttf"),
      "montserrat-thin": require("../../../assets/fonts/Montserrat-Thin.ttf"),
      pacifico: require("../../../assets/fonts/Pacifico-Regular.ttf")
    })
    setLoaded(true)
  }

  useEffect(() => {
    splash()
  }, [])

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        checkLoggedIn()
      }, 3000)
    }
  }, [loaded])


  return (
    <ImageBackground source={require('../../../assets/loginbg.jpg')} style={style.container}>
        <View style={{backgroundColor: 'rgba(0,0,0,0.75)', height: height, width: width, padding: 20}}>
      {
        loaded &&
        (
          <>
            <View style={{height: (height/3)*2, justifyContent:'center', marginTop: -45}}>
            <Text style={{fontFamily: 'montserrat-regular', textTransform:'uppercase', color: 'white', fontSize: 25}}>Pandai</Text>
              <Text style={{fontFamily: 'montserrat-regular', textTransform:'uppercase', color: 'white', fontSize: 25}}>dengan</Text>
              <Text style={{fontFamily: 'montserrat-black', textTransform:'uppercase', color: 'white', fontSize: 35}}>Pindai</Text>
            </View>
            <ActivityIndicator size="large" color="white" />
          </>
          )
        }
        </View>
      </ImageBackground>
  )
}

const mapDispatchToProps = {
  login
}


export default connect(null, mapDispatchToProps)(index)
