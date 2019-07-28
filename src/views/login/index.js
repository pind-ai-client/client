import React from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import style from "./style";

const Login = ({ navigation }) => {
  return (
    <View style={style.container}>
      <Button title="Login" onPress={() => navigation.navigate("dashboard")} />
    </View>
  );
};

export default Login;
