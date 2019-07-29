import React from 'react'
import { FlatList, TouchableNativeFeedback } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import style from "./style";

function listItem(props) {
  const { data } = props
  return (
    <TouchableNativeFeedback
      onPress={data.onPress}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          minHeight: 75,
          margin: 10,
          padding: 20,
          justifyContent: 'center',
          alignItems: "center",
          borderRadius: 4,
          borderWidth: 0.5,
          borderColor: '#d6d7da',
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#9cbdc8" }}>
            {data.title}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

export default listItem
