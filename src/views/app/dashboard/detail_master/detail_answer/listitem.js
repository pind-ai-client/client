import React from "react";
import { withNavigation } from "react-navigation";
import { View, Text, Alert } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import moment from "moment-with-locales-es6";

const Listitem = ({ master, navigation }) => {
  return (
    <TouchableNativeFeedback
      onPress={() =>
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
              { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
      }
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          minHeight: 75,
          margin: 10,
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "black" }}>
            {master[0]}
          </Text>
          <Text style={{ fontSize: 14, color: "rgba(0,0,0,0.5)" }}>
            {master[1]}
          </Text>
          <Text style={{ fontSize: 14, color: "rgba(0,0,0,0.5)" }}>
            A
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default withNavigation(Listitem);
