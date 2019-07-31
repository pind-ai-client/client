import React, { useEffect } from "react";
import * as Font from "expo-font";
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import Pindai from "./src/navigation";
import firebase from 'firebase';
import { Provider } from 'react-redux'
import store from './store'

const dimens = Dimensions.get('window')
console.log(dimens, '====================')

export default function App() {
  useEffect(() => {
    Font.loadAsync({
      "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
      "montserrat-black": require("./assets/fonts/Montserrat-Black.ttf"),
      "montserrat-thin": require("./assets/fonts/Montserrat-Thin.ttf"),
      pacifico: require("./assets/fonts/Pacifico-Regular.ttf")
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user, 'from appjs')
      }
      // Do other things
    });
  }, []);
  return (
    <Provider store={store} >
      <View style={styles.container}>
        <Pindai />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight
  }
});
