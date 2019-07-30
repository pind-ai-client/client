import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import ActionButton from "react-native-action-button";
import { AntDesign } from "@expo/vector-icons";
import style from "./style";
import { LinearGradient } from "expo-linear-gradient";
import {data} from '../../../../../mockdata'
import { FlatList, TouchableOpacity, TouchableNativeFeedback, Text } from "react-native-gesture-handler";
import HeaderView from './HeaderView'
import Listitem from './listitem'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchSetSoal } from '../../../../../store/action'

const DetailAnswer = (props) => {
  let id = props.navigation.getParam("id");

  useEffect(()=>{
    props.fetchSetSoal(id) 
    // console.log('ini detaillll trigger');
    
  },[])


  return (
    <>
      { props.setSoal === {} ? (
        <View>
          <Text>Nothing to show</Text>
        </View>
      ) : (
      <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
        <View style={style.container}>
          <HeaderView id={id} dataSoal={props.setSoal}/>
          {/* <Text>{JSON.stringify(props.setSoal)}</Text> */}
          <View style={{alignItems: 'center', justifyContent: 'center', height: 10}}>
            <View style={{zIndex: 3}}>
              <TouchableOpacity onPress={() => props.navigation.navigate('camera')} style={{zIndex: 2}}>
                <View style={{zIndex: 1, borderColor: '#2C5364', borderWidth: 10, backgroundColor: 'white', borderRadius: 100, height: 75, width: 75, alignItems: 'center', justifyContent: 'center'}}>
                  <AntDesign name='camera' size={30} color='#2C5364' />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={props.setSoal.answers}
            renderItem={({ item,index }) => {
              return (
                <TouchableNativeFeedback onPress={() => props.navigation.navigate('detailanswer', {data: item})}>
                  <Listitem answer={item} />
                </TouchableNativeFeedback>
              );
            }}
          />
        </View>
      </LinearGradient>
      ) }
    </>
  );
};

// <Button title='tambah aku mas' onPress={() => setPercent(percent + 5)}/>

//         <Button
//           title="to answer detail"
//           onPress={() => navigation.navigate("detailanswer")}
//         />

// <AnimatedCircularProgress
//               size={150}
//               width={30}
//               fill={percent}
//               tintColor="#00e0ff"
//               onAnimationComplete={() => console.log('onAnimationComplete')}
//               backgroundColor="#3d5875" 
//             >
//               { (percent) => (
//                 <Text style={{fontFamily: 'montserrat-black', color: 'white', fontSize: 30}}>{Math.floor(percent) + '%'}</Text>
//               )}
//             </AnimatedCircularProgress>
const mapStatetoProps = state =>{
  return {
    setSoal : state.setSoal,
    loading : state.isLoading
  }
}

const mapDispatchtoProps = {
  fetchSetSoal
}


export default connect(mapStatetoProps,mapDispatchtoProps)(DetailAnswer);
