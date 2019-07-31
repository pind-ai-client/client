import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Button, Dimensions } from "react-native";
import Select from "./answerSelect"
import { connect } from 'react-redux'
import {LinearGradient} from 'expo-linear-gradient'
import { editSetSoal } from '../../../../../../store/action'
import { TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler";

let {width, height} = Dimensions.get('window')

const NewMaster = ({navigation, editSetSoal, setSoal, user}) => {
  const [totalKey, setTotal] = useState()
  const [array, setArray] = useState()
  const [selected, setSelected] = useState()
  const [title, setTitle] = useState('Untitled')
  const [folderName, setfolderName] = useState('')
  const [dataEdit2, setEdit] = useState({})
  const [passingGrade, setPassingGrade] = useState(0)


  let dataEdit = {}
  useEffect(()=>{
    dataEdit = navigation.getParam('data','no-data')
    setEdit(navigation.getParam('data','no-data'))
    setTitle(dataEdit.title)
    setfolderName(dataEdit.folderName)
    setPassingGrade(dataEdit.passingGrade)
    let value = []
    
    for(var key in dataEdit.answerKey){
      value.push(dataEdit.answerKey[key].toUpperCase())
    }
    setArray(value)
    setTotal(value.length.toString())
    
  },[])
  function handleInput(num){
    let arr = []
    let a = num.toString()
    setTotal(a)
    for(let i = 0 ; i < num ; i++){
      arr.push("A")
    }
    setArray(arr)
  }

  function save(){
    let newobj = {}

    array.forEach((arr, index) => {
      // newObj = Object.assign(newObj, {[index+1]: })
      newobj[parseInt(index+1)] = arr
    })
    console.log(newobj);
    console.log(title)
    console.log('ini dataEdit2', dataEdit2)
    editSetSoal(dataEdit2._id, {
      UserId: user.UserId,
      title: title,
      answerKey: newobj,
      passingGrade
    })
    // setTotal('')
    // setTitle('')
    // setArray(['A'])
    // setPassingGrade(70)
    navigation.navigate('detail')
  }

  function handleChange(value, index){
    let arraynew = array
    arraynew[index] = value
    setArray(arraynew)
    setSelected
  }
  
  
  // return (
  //   <View style={{marginTop : 150, justifyContent : "center", alignItems : "center"}}>
  //     <Text>Form Create Soal</Text>
  //     <TextInput
  //       onchangeText={(text) => setTitle({text})}
  //       style={{height : 40, borderColor : "gray", borderWidth : 1, width : 300, marginTop : 10, padding : 10}}
  //       placeholder="title.."
  //       value={title}
  //     />
  //     <TextInput
  //       onchangeText={(text) => setfolderName({text})}        
  //       style={{height : 40, borderColor : "gray", borderWidth : 1, width : 300, marginTop : 10, padding : 10}}
  //       placeholder="folder name.."
  //       value={folderName}
  //     />
  //     <Text style={{marginTop : 15}}>Number of Key Answer</Text>
  //     <TextInput
  //       onChangeText={text => handleInput(text)}
  //       value={totalKey}
  //       keyboardType="numeric"
  //       style={{height : 40, borderColor : "gray", borderWidth : 1, width : 70, padding : 10}}
  //       placeholder="..."
  //     />
  //     <View>
  //       <FlatList
  //       horizontal={false}
  //       data={array}
  //       keyExtractor={(item,index) => index.toString()}
  //       renderItem={({item,index})=>(
  //         <Select item={item} index={index} edit={true}/>
  //       )}
  //       />

  //     </View>
  //     </View>
  // )

  return (

    <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
      <View style={{height: height-60, padding: 10}}>
        <View style={{height: height/3, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 20, fontFamily: 'montserrat-black', marginBottom: 10}}>Edit answer key</Text>
          <View style={{width: '100%', marginBottom: 10}}>
            <Text style={{color: 'white', fontFamily: 'montserrat-regular', marginBottom: 10, textAlign: 'center'}}>Subject Name: </Text>  
            <TextInput
              value={title}
              onChangeText={(e) => setTitle(e)}
              style={{borderColor : "white", borderWidth : 2, padding : 5, borderRadius: 10, color: 'white', textAlign: 'center'}}
              placeholder="Subject Name"
            />
          </View>
          <View style={{width: '100%', marginBottom: 10, flexDirection:'row'}}>
            <View style={{flex: 0.5, width: '90%'}}>
              <Text style={{color: 'white', fontFamily: 'montserrat-regular', marginBottom: 10, textAlign: 'center'}}># of Questions: </Text>  
              <TextInput
                onChangeText={text => handleInput(text)}
                value={totalKey}
                required={true}
                keyboardType="numeric"
                style={{borderColor : "white", borderWidth : 2, padding : 5, borderRadius: 10, color: 'white', textAlign: 'center'}}
                placeholder="Number of questions"
              />
            </View>
            <View style={{flex: 0.5, width: '90%'}}>
              <Text style={{color: 'white', fontFamily: 'montserrat-regular', marginBottom: 10, textAlign: 'center'}}>Passing Grade: </Text>  
              <TextInput
                onChangeText={text => setPassingGrade(text)}
                value={passingGrade.toString()}
                keyboardType="numeric"
                required={true}
                style={{borderColor : "white", borderWidth : 2, padding : 5, borderRadius: 10, color: 'white', textAlign: 'center'}}
                placeholder="Passing grade"
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={save}>
              <View style={{width: 100, backgroundColor: 'white', borderRadius: 50, padding: 10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{color: '#2C5364', fontFamily:'montserrat-black', fontSize: 20}}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor: 'white', borderRadius: 10, padding: 20, height: height - 20 - (height/3)}}>
          <FlatList
            data={array}
            style={{marginBottom: 60}}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item,index})=>(
              <View>
                <Select item={item} index={index} handleChange={handleChange}/>
              </View>
            )}
          />
        </View>
      </View>
      </LinearGradient>
  );
};

const mapStatetoProps = state =>{
  return {
    setSoal : state.setSoal,
    user: state.user
  }
}

const mapDispatchToProps = {
  editSetSoal
}

export default connect(mapStatetoProps,mapDispatchToProps)(NewMaster);
