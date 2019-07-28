import React from "react";
import { View, Text, Button } from "react-native";
import NewButton from "../../../components/buttonNew";
import ActionButton from "react-native-action-button";
import { AntDesign } from "@expo/vector-icons";
import style from "./style";

const DetailAnswer = ({ navigation }) => {
  let id = navigation.getParam("id");
  console.log(id);
  return (
    <View style={style.container}>
      <Button
        title="to answer detail"
        onPress={() => navigation.navigate("detailanswer")}
      />
      <Text> {id} </Text>
      <ActionButton
        buttonColor={"rgba(0,0,0,0.7)"}
        title="new"
        onPress={() => navigation.navigate("camera")}
      >
        <AntDesign name="plus" color="white" size={25} />
      </ActionButton>
    </View>
  );
};

export default DetailAnswer;
