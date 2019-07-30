import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Picker, Button } from "react-native";
import Select from "./answerSelect"
import { connect } from 'react-redux'
import { editSetSoal } from '../../../../../store/action'

const NewMaster = (props) => {
  const [totalKey, setTotal] = useState("1")
  const [array, setArray] = useState([])
  const [selected, setSelected] = useState("A")
  const [title, setTitle] = useState('')
  const [folderName, setfolderName] = useState('')
  const [dataEdit2, setEdit] = useState({})

  let dataEdit = {}
  useEffect(()=>{
    setArray([])
    console.log('use', array);
    
    dataEdit = props.navigation.getParam('data','no-data')
    console.log('ini data edit di form ',dataEdit);
    
    setEdit(props.navigation.getParam('data','no-data'))
    setTitle(dataEdit.title)
    setfolderName(dataEdit.folderName)

    let value = []
    
    for(var key in dataEdit.answerKey){
      value.push(dataEdit.answerKey[key].toUpperCase())
    }
    console.log('ini value', value, dataEdit.answerKey);
    
    setArray(value)
    console.log('ini array baru', array);

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
    console.log('ini array sebelum',array);        
    let arraynew = array
    arraynew[index] = value
    setArray(arraynew)
    console.log('ini array updated',array);
    
    // setSelected
  }

  function saveEdit(){
    console.log('hei',array,title, folderName,dataEdit2._id)
    let answerKey = {}
    array.forEach((el,index) =>{
      answerKey[index+1] = el
    })
    console.log(answerKey);
    let option = {
      data : {
        title : title,
        folderName : folderName,
        answerKey : answerKey
      },
      navigate : props.navigation.navigate
    }
    
    props.editSetSoal(dataEdit2._id,option)
  }
  
  
  return (
    <View style={{marginTop : 150, justifyContent : "center", alignItems : "center"}}>
      <Text>Form Create Soal</Text>
      <Button
      onPress={saveEdit}
      title="save"
      />
      <TextInput
        onChangeText={(text) => setTitle(text)}
        style={{height : 40, borderColor : "gray", borderWidth : 1, width : 300, marginTop : 10, padding : 10}}
        placeholder="title.."
        value={title}
      />
      <TextInput
        onChangeText={(text) => setfolderName({text})}        
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
          <Select change={handleChange} item={item} index={index} edit={true}/>
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

mapDispatchtoProps = {
  editSetSoal
}

export default connect(mapStatetoProps, mapDispatchtoProps)(NewMaster);
