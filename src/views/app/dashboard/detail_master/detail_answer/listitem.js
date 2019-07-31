import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import { View, Text, Alert, Modal, TouchableOpacity } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import moment from "moment-with-locales-es6";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import axios from "axios";

const Listitem = ({ master, navigation, answerId, answerKey, index, fullAnswer, fetchData }) => {
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
      onPress={() =>
        setModalVisible(true)
      }
    >
      <View
        style={{
          backgroundColor: master[1] === answerKey[index][1] ? "green" : master[1].length == 0 ? 'red' : 'yellow',
          borderRadius: 10,
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
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "black" }}>
            {master[0]}
          </Text>
          <Text style={{ fontSize: 14, color: "rgba(0,0,0,0.5)" }}>
            {master[1]}
          </Text>
          <Text style={{ fontSize: 14, color: "rgba(0,0,0,0.5)" }}>
            {answerKey[index][1]}
          </Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={{ marginTop: 22 }}>
          <View>
          <View style= {{
            alignItems: "center",
          }}>
            <RadioForm
              radio_props={radio_props}
              initial={kamusHuruf[master[1]]}
              formHorizontal={true}
              labelHorizontal={false}
              onPress={(value) => {setValue(value)}}
            />
          </View>
          <View style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: "space-around",
            alignItems: 'center'
          }}>
            <TouchableOpacity 
            style = {{
              backgroundColor: 'green',
              width: 150,
              padding: 5
            }}
            onPress={() => {
              saveUpdate()
            }}
            >
              <Text style={{
                textAlign: 'center'
              }}>
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style = {{
              backgroundColor: 'yellow',
              width: 150,
              padding: 5
            }} 
            onPress={() => {
              setModalVisible(false)
            }}>
              <Text style={{
                textAlign: 'center'
              }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>
    </TouchableNativeFeedback>
  );
};

export default withNavigation(Listitem);
