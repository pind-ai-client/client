import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Picker } from "react-native";
import Select from "./answerSelect"
import { connect } from 'react-redux'

const NewMaster = (props) => {
  const [totalKey, setTotal] = useState("1")
  const [array, setArray] = useState(["A"])
  const [selected, setSelected] = useState("A")
  const [title, setTitle] = useState('')
  const [folderName, setfolderName] = useState('')
  const [dataEdit2, setEdit] = useState({})

  let dataEdit = {}
  useEffect(()=>{
    dataEdit = props.navigation.getParam('data','no-data')
    setEdit(props.navigation.getParam('data','no-data'))
    setTitle(dataEdit.title)
    setfolderName(dataEdit.folderName)

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

  function handleChange(value, index){
    let arraynew = array
    arraynew[index] = value
    setArray(arraynew)
    setSelected
  }
  
  return (
    <View style={{marginTop : 150, justifyContent : "center", alignItems : "center"}}>
      <Text>Form Create Soal</Text>
      <TextInput
        onchangeText={(text) => setTitle({text})}
        style={{height : 40, borderColor : "gray", borderWidth : 1, width : 300, marginTop : 10, padding : 10}}
        placeholder="title.."
        value={title}
      />
      <TextInput
        onchangeText={(text) => setfolderName({text})}        
        style={{height : 40, borderColor : "gray", borderWidth : 1, width : 300, marginTop : 10, padding : 10}}
        placeholder="folder name.."
        value={folderName}
      />
      <Text style={{marginTop : 15}}>Number of Key Answer</Text>
      <TextInput
        onChangeText={text => handleInput(text)}
        value={totalKey}
        keyboardType="numeric"
        style={{height : 40, borderColor : "gray", borderWidth : 1, width : 70, padding : 10}}
        placeholder="..."
      />
      <View>
        <FlatList
        horizontal={false}
        data={array}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item,index})=>(
          <Select item={item} index={index} edit={true}/>
        )}
        />

      </View>


    </View>
  );
};

const mapStatetoProps = state =>{
  return {
    setSoal : state.setSoal
  }
}

export default connect(mapStatetoProps,null)(NewMaster);
