import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Picker } from "react-native";
import Select from "./answerSelect"

const NewMaster = () => {
  const [totalKey, setTotal] = useState("1")
  const [array, setArray] = useState(["A"])
  const [selected, setSelected] = useState("A")
  // let arr=[]
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
    console.log("checccccccccccccck",index);
    let arraynew = array
    arraynew[index] = value
    await setArray(arraynew)
    await setSelected
    console.log("checccccccccccccck",array);
  }

  return (
    <View style={{marginTop : 150, justifyContent : "center", alignItems : "center"}}>
      {/* <Text>new master</Text> */}
      <Text>Form Create Soal</Text>
      <TextInput
        style={{height : 40, borderColor : "gray", borderWidth : 1, width : 300, marginTop : 10, padding : 10}}
        placeholder="title.."
      />
      <TextInput
        style={{height : 40, borderColor : "gray", borderWidth : 1, width : 300, marginTop : 10, padding : 10}}
        placeholder="folder name.."
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
          <Select/>
        )}
        />

        {/* {array.map((item,index)=> <Text key={index}>{item}</Text>)} */}
      </View>


    </View>
  );
};

export default NewMaster;
