import React from "react";
import { withNavigation } from "react-navigation";
import { View, Text } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import moment from "moment-with-locales-es6";

const Listitem = ({ master, navigation }) => {
  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("detail", {
          id: master._id // ngirim id set soal
        })
      }
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          minHeight: 75,
          margin: 10,
          padding: 20,
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2C5364" }}>
            {master.title}
          </Text>
          <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>
            {master.answers.length} questions
          </Text>
        </View>
        <Text style={{color: 'rgba(0,0,0,0.5)'}}>{moment(master.createdAt).fromNow()}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default withNavigation(Listitem);
