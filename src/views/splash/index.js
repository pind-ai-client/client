import React, { useEffect } from 'react'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import style from "./style"
import * as firebase from 'firebase'


const index = (props) => {
  checkLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('dashboard')
      } else {
        props.navigation.navigate('login')
      }
    })
  }

  useEffect(() => {
    checkLoggedIn()
    setTimeout(() => {
      props.navigation.navigate('login')
    }, 2000)
  }, [])


  return (
    <View style={style.container}>
      <Text style={style.title}>pindai✔️</Text>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default index
