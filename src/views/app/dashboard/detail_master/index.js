import React, {useState} from "react";
import { View, Text, Button, Dimensions, screenWidth } from "react-native";
import NewButton from "../../../components/buttonNew";
import ActionButton from "react-native-action-button";
import { AntDesign } from "@expo/vector-icons";
import style from "./style";
import { LineChart, PieChart, ProgressChart} from 'react-native-chart-kit'
import ProgressCircle from 'react-native-progress-circle'
import {AnimatedCircularProgress} from 'react-native-circular-progress'

const DetailAnswer = ({ navigation }) => {
  let id = navigation.getParam("id");
  const [percent, setPercent] = useState(25)
  
  console.log(id);
  return (
    <View style={style.container}>
      <Text> {id} </Text>
      <AnimatedCircularProgress
        size={100}
        width={30}
        fill={percent}
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" 
      >
        { (percent) => (
          <Text>{Math.floor(percent) + '%'}</Text>
        )}
      </AnimatedCircularProgress>

      <Button title='tambah aku mas' onPress={() => setPercent(percent + 5)}/>
      
      <Button
        title="to answer detail"
        onPress={() => navigation.navigate("detailanswer")}
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
