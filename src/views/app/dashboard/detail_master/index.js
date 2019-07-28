import React from "react";
import { View, Text, Button, Dimensions, screenWidth } from "react-native";
import NewButton from "../../../components/buttonNew";
import ActionButton from "react-native-action-button";
import { AntDesign } from "@expo/vector-icons";
import style from "./style";
import { LineChart, PieChart, ProgressChart} from 'react-native-chart-kit'

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
      <ProgressChart
        data={[0.4, 0.6, 0.8]}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(57, 128, 209, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
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
