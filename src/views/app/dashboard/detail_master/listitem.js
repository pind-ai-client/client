import React, { useEffect , useState } from "react";
import { View, Text, Dimensions } from "react-native";
import {AnimatedCircularProgress} from 'react-native-circular-progress'
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from 'react-navigation'

const {width, height} = Dimensions.get('window')

const ListItem = ({answer}) => {
  return (
    <View style={{margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#2C5364'}}>{answer.name}</Text>
        <AnimatedCircularProgress
          size={50}
          width={5}
          fill={Number(answer.score)}
          tintColor={answer.score <=60 ? ('red') : ("#00e0ff") }
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor='#3d5875'
        >
          { () => (
            <Text style={{fontFamily: 'montserrat-black', color: 'rgba(0,0,0,0.75)', fontSize: 15}}>{Math.floor(Number(answer.score)) + '%'}</Text>
          )}
        </AnimatedCircularProgress>
      </View>
  );
};

export default (ListItem);
