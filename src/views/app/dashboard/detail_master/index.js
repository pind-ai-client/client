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
      <ProgressCircle
        percent={percent}
        radius={50}
        borderWidth={20}
        color="#3399ff"
        shadowColor="#999"
        bgColor='#fff'  
      >
        <Text>{'30%'}</Text>
      </ProgressCircle>
      <ProgressChart
        data={[percent/100]}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
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
