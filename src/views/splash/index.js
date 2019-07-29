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

  useEffect(() => {
    setTimeout(() => {
      checkLoggedIn()
    }, 3000)
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
