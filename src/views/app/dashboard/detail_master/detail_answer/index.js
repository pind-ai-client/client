import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
  Image,
  Button
} from "react-native";
import axios from 'axios'
import Listitem from './listitem'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { withNavigation } from 'react-navigation'
import { AntDesign } from "@expo/vector-icons";

let baseurl = 'http://35.240.166.155:3000'

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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  listAnswer: {
    flex: 4,
    backgroundColor: 'yellow',
    justifyContent: 'center'
  }
})

const { width, height } = Dimensions.get('window')

const DetailAnswer = ({ navigation }) => {

  let data = navigation.getParam('data')
  console.log(data, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

  const [answer, setAnswer] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [type, setType] = useState('edit')
  const [name, setName] = useState('')
  const [answerCount, setAnswerCount] = useState({
    correct: 0,
    wrong: 0,
    empty: 0
  })

  function calculateAnswer(studentAnswer, answerKey){
    let obj = {
      correct: 0,
      wrong: 0,
      empty: 0
    }
    let length = Object.keys(studentAnswer).length
    for( let i=1; i<=length; i++ ){
      if(studentAnswer[i.toString()] === answerKey[i.toString()]){
        obj.correct++
      }else if(studentAnswer[i.toString()] === ''){
        obj.empty++
      }else{
        obj.wrong++
      }
    }
    setAnswerCount(obj)
    console.log(answerCount, '========================xxxxxxxxxxxxxx========================');
  }

  fetchData = () => {
    axios.get(`http://35.240.166.155:3000/answers/${data._id}`)
      .then(({ data }) => {
        setAnswer(data)
        console.log(data, 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
        setName(data.name)
        calculateAnswer(data.answers, data.setSoalId.answerKey)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (type === 'image') {
      setModalVisible(true)
    }
  }, [type])

  useEffect(() => {
    if (modalVisible === false) {
      setType('edit')
    }
  }, [modalVisible])

  editName = () => {
    axios.put('http://35.240.166.155:3000/answers/'+ data._id, {name: name.toUpperCase()})
    .then(({data}) => {
      setModalVisible(false)
      fetchData()
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
      <ImageBackground
        source={require('../../../../../../assets/graduate.jpeg')}
        style={{ height, width }}
        blurRadius={2}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.75)', height: height - 60, width }}>
          <View style={{ height: height / 4, width: width, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableHighlight
              onPress={() => setType('image')}
            >
              <AnimatedCircularProgress
                size={width/3}
                width={30}
                fill={answer.score ? answer.score : 0}
                tintColor={ !answer.score ? 'red' : answer.score < answer.setSoalId.passingGrade ? 'red' : '#00e0ff' }
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor='#3d5875'
              >
                {() => (
                  <Text style={{ fontFamily: 'montserrat-black', color: 'white', fontSize: 30 }}>{answer.score}</Text>
                )}
              </AnimatedCircularProgress>
            </TouchableHighlight>
              <View style={{padding: 20}}>
                <View>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text 
                      style={{
                        fontSize: 20,
                        fontFamily: 'montserrat-black',
                        color: 'white'
                      }}
                    >
                      {!answer.name ? 'loading...' : answer.name}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: 'montserrat-black', fontSize: 30, color: 'white' }}>
                  {!answer.score ? 'loading...' : answer.score<answer.setSoalId.passingGrade ? 'Failed' : 'Passed' }
                </Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <View style={{width: 15, height: 15, backgroundColor: 'green', borderRadius: 50, marginRight: 15, marginBottom: 5}}/>     
                  <Text style={{color: 'white', fontFamily: 'montserrat-regular'}}>{answerCount.correct} Correct</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: 15, height: 15, backgroundColor: 'yellow', borderRadius: 50, marginRight: 15, marginBottom: 5}}/>     
                  <Text style={{color: 'white', fontFamily: 'montserrat-regular'}}>{answerCount.wrong} Wrong</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: 15, height: 15, backgroundColor: 'red', borderRadius: 50, marginRight: 15, marginBottom: 5}}/>     
                  <Text style={{color: 'white', fontFamily: 'montserrat-regular'}}>{answerCount.empty} Empty</Text>
                </View>
              </View>
            </View>
          </View>
          {
            answer.length === 0 ?
              <></>
              :
              <View>
                <View style={{height: 50}}>
                  
                  <View style={{
                    justifyContent: 'space-around',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    margin: 10,
                    padding: 5,
                    borderRadius: 7
                  }}>
                    <Text style={{ color: 'rgba(0,0,0,0.75)', fontFamily: 'montserrat-regular', fontSize: 18 }}>No</Text>
                    <Text style={{ color: 'rgba(0,0,0,0.75)', fontFamily: 'montserrat-regular', fontSize: 18 }}>Answer</Text>
                    <Text style={{ color: 'rgba(0,0,0,0.75)', fontFamily: 'montserrat-regular', fontSize: 18 }}>Key</Text>
                  </View>
                </View>
                <View style={{height: ((height/4) *3) - 145}}>
                  <FlatList
                    data={Object.entries(answer.answers)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <Listitem 
                        master={item} 
                        passing={ answer.score < answer.setSoalId.passingGrade ? false : true } 
                        answerKey={Object.entries(answer.setSoalId.answerKey)} 
                        index={index} 
                        fullAnswer={answer.answers} 
                        fetchData={fetchData} 
                        answerId={answer._id}
                        number={index+1}>
                      </Listitem>
                    )}
                  />
                </View>
              </View>
          }
        </View>
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
          <View style ={{
            padding: 20,
            height: '100%'
          }}>
          {
            type === 'edit' ?
            <>
            <Text style={{fontSize: 20, color: 'white', fontFamily: 'montserrat-black', textAlign:'center', marginTop: '30%', marginBottom: 30}}>Edit Student Name</Text>
            <TextInput
              // style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10}}
              style={{ height: 70, fontSize: 15, color: 'white', borderColor: 'white', borderWidth: 3, padding: 10, marginBottom: 10, textTransform:'uppercase', textAlign:'center', borderRadius: 20 }}
              onChangeText={text => setName(text)}
              value={name}
            />
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop:50
            }}>
              <TouchableHighlight
                style={{
                  backgroundColor: 'white',
                  width: 150,
                  padding: 5,
                  borderRadius: 20
                }}
                onPress={() => {
                  editName()
                }}>
                <Text style={{fontSize:15, color: 'green', fontFamily: 'montserrat-black', textAlign:'center'}}>Save</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  backgroundColor: 'white',
                  width: 150,
                  padding: 5,
                  borderRadius: 20
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{fontSize:15, color: 'red', fontFamily: 'montserrat-black', textAlign:'center'}}>Cancel</Text>
              </TouchableHighlight>
            </View>
            </>
            : <View>
              <Text style={{fontSize:15, color: 'white', fontFamily: 'montserrat-black', textAlign:'center'}}>{answer.name}'s Answer</Text>
              <Image
                source={{uri: answer.imageUrl}}
                style={{width: '100%', height: '85%', resizeMode:'contain', borderRadius: 20, marginBottom: 15, marginTop: 15}}
              />
              {/* <Button
                title='Back'
                color='#2C5364'
                onPress={() => setModalVisible(!modalVisible)}
              /> */}
              <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                <TouchableHighlight
                  style={{
                    backgroundColor: 'white',
                    width: 150,
                    padding: 5,
                    borderRadius: 20
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={{fontSize:15, color: 'red', fontFamily: 'montserrat-black', textAlign:'center'}}>Back</Text>
                </TouchableHighlight>
              </View>
            </View>
          }
          </View>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
};

export default withNavigation(DetailAnswer);
