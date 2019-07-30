import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,

} from "react-native";
import axios from 'axios'
import Listitem from './listitem'
import {LinearGradient} from 'expo-linear-gradient'
import {AnimatedCircularProgress} from 'react-native-circular-progress'
import {withNavigation} from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  score: {
    flex: 2,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailStudent: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listAnswer: {
    flex: 4,
    backgroundColor: 'yellow',
    justifyContent: 'center'
  }
})

const {width, height} = Dimensions.get('window')

const DetailAnswer = ({navigation}) => {

  let data = navigation.getParam('data')
  console.log(data)

  const [answer, setAnswer] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/answers/5d3de345b6643c3db4651915')
      .then(({ data }) => {
        console.log('dapet datanyaa nih ======')
        console.log(data)
        setAnswer(data)
      })
      .catch(err => {
        console.log('error fetch one answer')
        console.log(err)
      })
  }, [])

  return (
    <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
      <ImageBackground
        source={require('../../../../../../assets/graduate.jpeg')}
        style={{height, width}}
        blurRadius={2}
      >
        <View style={{backgroundColor: 'rgba(0,0,0,0.75)', height: height-60, width}}>
          <View style={{height: height/3, width: width, alignItems: 'center', justifyContent: 'center'}}>
            <AnimatedCircularProgress
              size={150}
              width={30}
              fill={86}
              tintColor={ answer.score <=60 ? ('red') : ("#00e0ff") }
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor='#3d5875'
            >
              { () => (
                <Text style={{fontFamily: 'montserrat-black', color: 'white', fontSize: 30}}>{'86%'}</Text>
              )}
            </AnimatedCircularProgress>
            <Text style={{fontFamily: 'montserrat-black', fontSize: 30, color: 'white'}}>Passed</Text>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default withNavigation(DetailAnswer);
