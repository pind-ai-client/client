import React, { useEffect } from 'react'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import style from "./style"
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { login } from '../../../store/action'

const index = (props) => {
  const { login } = props
  checkLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('#########################################3masuk checkLoggedin', user)
      if (user) {
        console.log('######################################### user ada')
        login({
          userName: user.displayName,
          email: user.email,
          UserId: user.uid,
          photoUrl: user.photoURL
        })
        props.navigation.navigate('dashboard')
      } else {
        console.log('########################################## user ga ada')
        props.navigation.navigate('login')
      }
    })
  }

  useEffect(() => {
    checkLoggedIn()
  }, [])


  return (
    <View style={style.container}>
      <Text style={style.title}>pindai✔️</Text>
      <ActivityIndicator size="large" />
    </View>
  )
}

const mapDispatchToProps = {
  login
}


export default connect(null, mapDispatchToProps)(index)
