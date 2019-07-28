import React, { useEffect } from "react";
import * as Font from "expo-font";
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import Pindai from "./src/navigation";

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
  }, []);
  return (
    <View style={styles.container}>
      <Pindai />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight
  }
});
