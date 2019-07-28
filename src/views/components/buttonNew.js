import React, { useState, useEffect } from "react";
import { withNavigation } from "react-navigation";
import { View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import { AntDesign } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";

const buttonNew = ({ navigation }) => {
  //   const [hasCameraPermission, setCameraPermission] = useState(null);
  //   const [type, setType] = useState(Camera.Constants.Type.back);
  //   const [opencam, setopencam] = useState(true);

  //   let askPermission = async () => {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //     setCameraPermission(status === "granted");
  //   };

  //   useEffect(() => {
  //     askPermission();
  //   }, []);

  console.log(navigation);

  return (
    <View>
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

export default withNavigation(buttonNew);
