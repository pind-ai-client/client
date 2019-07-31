import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import { View, Text, Alert } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import moment from "moment-with-locales-es6";
import {deleteSetSoal, fetchSetSoals} from '../../../../store/action'
import {connect} from 'react-redux'


const Listitem = ({ master, navigation, deleteSetSoal, user, getSoals }) => {
  const[keyTotal,setKeyTotal] = useState(0)


  useEffect(()=>{
    console.log('ini master di listItem', master);
    key = 0
    for(key in master.answerKey){
        key+1
    }
    setKeyTotal(key)
    console.log(keyTotal);
    
  },[])


  return (
    <TouchableNativeFeedback
      onPress={() => {
        console.log(master._id)
        navigation.navigate("detail", {
          id: master._id, questions : keyTotal // ngirim id set soal
          })
        }
      }>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            minHeight: 75,
            margin: 10,
            padding: 20,
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2C5364" }}>
              {master.title}
            </Text>
            <Text style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>
              {keyTotal} questions
            </Text>
          </View>
          <Text style={{color: 'rgba(0,0,0,0.5)'}}>{moment(master.createdAt).fromNow()}</Text>
        </View>
    </TouchableNativeFeedback>
  );
};

const mapDispatchToProps = {
  deleteSetSoal
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Listitem));
