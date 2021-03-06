import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import { View, Text, Alert, Modal, TouchableOpacity } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient'
import moment from "moment-with-locales-es6";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import axios from "axios";

const Listitem = ({ master, navigation, answerId, answerKey, index, fullAnswer, fetchData, number }) => {
  const kamusHuruf = {
    A : 0,
    B : 1,
    C : 2,
    D : 3,
    E : 4
  }
  const kamusAngka = {
    0 : 'A',
    1 : 'B',
    2 : 'C',
    3 : 'D',
    4 : 'E',
    
  }
  const [modalVisible, setModalVisible] = useState(false)
  const [value, setValue] = useState(kamusHuruf[master[1]])

  saveUpdate = () => {
    setModalVisible(false)
    console.log(fullAnswer, '0000000000000000000000000000')
    console.log(answerId)
    fullAnswer[index + 1] = kamusAngka[value]
    axios.put(`http://35.240.166.155:3000/answers/${answerId}`, { answers: fullAnswer })
    .then(({ data }) => {
      fetchData()
    })
    .catch(err => {
      console.log('updated gagal', err)
    })
  }

  const radio_props = [
    {label: 'A', value: 0 },
    {label: 'B', value: 1 },
    {label: 'C', value: 2 },
    {label: 'D', value: 3 },
    {label: 'E', value: 4 }
  ]
  // console.log(answerKey[index],'07070707======70707070')
  return (
    <TouchableNativeFeedback
      onLongPress={() =>
        setModalVisible(true)
      }
    >
      <View
        style={{
          backgroundColor: 'white',
          borderLeftColor:  master[1] === answerKey[index][1] ? "green" : master[1].length == 0 ? 'red' : 'yellow',
          borderLeftWidth: 10,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          minHeight: 75,
          margin: 10,
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Text style={{ fontSize: 20, color: "rgba(0,0,0,0.75)", fontFamily: master[1] === answerKey[index][1] ? "montserrat-regular" : master[1].length == 0 ? 'montserrat-black' : 'montserrat-black' }}>
            {master[0]}
          </Text>
          <Text style={{ fontSize: 18, color: 'rgba(0,0,0,0.75)', fontFamily: master[1] === answerKey[index][1] ? "montserrat-regular" : master[1].length == 0 ? 'montserrat-black' : 'montserrat-black', }}>
            {master[1]}
          </Text>
          <Text style={{ fontSize: 18, color: 'rgba(0,0,0,0.75)', fontFamily: master[1] === answerKey[index][1] ? "montserrat-regular" : master[1].length == 0 ? 'montserrat-black' : 'montserrat-black' }}>
            {answerKey[index][1]}
          </Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
          <View style={{ marginTop: '40%', height:'100%' }}>
            <View>
            <View style= {{
              alignItems: "center"
            }}>
              <Text style={{fontFamily: 'montserrat-black', color: 'white', fontSize: 20, marginBottom: 20}}>Edit Answer</Text>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Text style={{fontFamily: 'montserrat-black', color: 'white', fontSize: 20,}}>{number}.</Text>
                <RadioForm
                  radio_props={radio_props}
                  initial={kamusHuruf[master[1]]}
                  formHorizontal={true}
                  labelHorizontal={false}
                  buttonColor={'white'}
                  labelStyle={{fontSize: 15, fontFamily: 'montserrat-regular', color: 'white'}}
                  onPress={(value) => {setValue(value)}}
                />
              </View>
            </View>
            <View style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: "space-around",
              alignItems: 'center',
              marginBottom: 20
            }}>
              <TouchableOpacity 
              style={{
                backgroundColor: 'white',
                width: 150,
                padding: 5,
                borderRadius: 20
              }}
              onPress={() => {
                saveUpdate()
              }}
              >
                <Text style={{fontSize:15, color: 'green', fontFamily: 'montserrat-black', textAlign:'center'}}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={{
                backgroundColor: 'white',
                width: 150,
                padding: 5,
                borderRadius: 20
              }}
              onPress={() => {
                setModalVisible(false)
              }}>
                <Text style={{fontSize:15, color: 'red', fontFamily: 'montserrat-black', textAlign:'center'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </TouchableNativeFeedback>
  );
};

export default withNavigation(Listitem);
