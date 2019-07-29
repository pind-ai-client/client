import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Button, Dimensions } from "react-native";
import Select from "./answerSelect"
import { ScrollView } from "react-native-gesture-handler";
import {LinearGradient} from 'expo-linear-gradient'
import {connect} from 'react-redux'
import {createSetSoal} from '../../../../../store/action'

let {width, height} = Dimensions.get('window')

const NewMaster = ({createSetSoal, user, navigation}) => {
  const [totalKey, setTotal] = useState("1")
  const [array, setArray] = useState(["A"])
  const [selected, setSelected] = useState("A")
  const [title, setTitle] = useState('Untitled')
  // let arr=[]
  console.log(title)
  function handleInput(num){
    console.log('input ke handle');
    
    let arr = []
    let a = num.toString()
    setTotal(a)
    for(let i = 0 ; i < num ; i++){
      arr.push("A")
      console.log('ke trigger');
    }
    setArray(arr)
    console.log(arr,'===');
    
  }

  async function handleChange(value, index){
    let arraynew = array
    arraynew[index] = value
    await setArray(arraynew)
  }

  function save(){
    let newobj = {}

    array.forEach((arr, index) => {
      // newObj = Object.assign(newObj, {[index+1]: })
      newobj[parseInt(index+1)] = arr
    })
    console.log(newobj);
    createSetSoal({
      UserId: user.UserId,
      title,
      answerKey: newobj,
      answers: []
    })
    navigation.navigate('Dashboard')
  }

  return (

    <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
      <View style={{height: height-60, padding: 10}}>
        <View style={{height: height/3, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, fontFamily: 'montserrat-black', marginBottom: 10}}>New answer key</Text>
          <View style={{width: '100%', marginBottom: 10}}>
            <Text style={{color: 'white', fontFamily: 'montserrat-regular', marginBottom: 10, textAlign: 'center'}}>Subject Name: </Text>  
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              keyboardType="numeric"
              style={{borderColor : "white", borderWidth : 2, padding : 5, borderRadius: 10, color: 'white', textAlign: 'center'}}
              placeholder="Number of questions"
            />
          </View>
          <View style={{width: '100%', marginBottom: 10}}>
            <Text style={{color: 'white', fontFamily: 'montserrat-regular', marginBottom: 10, textAlign: 'center'}}># of Questions: </Text>  
            <TextInput
              onChangeText={text => handleInput(text)}
              value={totalKey}
              keyboardType="numeric"
              style={{borderColor : "white", borderWidth : 2, padding : 5, borderRadius: 10, color: 'white', textAlign: 'center'}}
              placeholder="Number of questions"
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <Button title="save" onPress={save}/>
          </View>
        </View>
        <View style={{backgroundColor: 'white', borderRadius: 10, padding: 20, height: height - 20 - (height/3)}}>
          <FlatList
            data={array}
            style={{marginBottom: 60}}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item,index})=>(
              <View>
                <Select index={index} handleChange={handleChange}/>
              </View>
            )}
          />
        </View>
      </View>
      </LinearGradient>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createSetSoal
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMaster);
