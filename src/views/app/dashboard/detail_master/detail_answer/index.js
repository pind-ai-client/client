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
  TextInput,
  Image
} from "react-native";
import axios from 'axios'
import Listitem from './listitem'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { withNavigation } from 'react-navigation'

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
    axios.put('http://35.240.166.155:3000/answers/'+ data._id, {name})
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
              <AnimatedCircularProgress
                size={150}
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
              <View style={{padding: 20}}>
                <View>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={{
                      fontSize: 20,
                      fontFamily: 'montserrat-black',
                      color: 'white'
                    }}>{!answer.name ? 'loading...' : answer.name}</Text>
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
              <Text>Loading dulu masnya</Text>
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
                        answerId={answer._id}>
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
          <View style ={{
            padding: 20
          }}>
          {
            type === 'edit' ?
            <>
            <Text style = {{textAlign: 'center'}}>Edit Student Name</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
              onChangeText={text => setName(text.toUpperCase())}
              value={name}
            />
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
              <TouchableHighlight
                style={{
                  backgroundColor: 'green',
                  width: 150,
                  padding: 5
                }}
                onPress={() => {
                  editName()
                }}>
                <Text style={{color: 'white'}}>Save</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  backgroundColor: 'yellow',
                  width: 150,
                  padding: 5
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
            </>
            : <>
              <Image
                source={{uri: answer.imageUrl}}
                style={{width: 280, height: 373.1, resizeMode:'contain', borderRadius: 20}}
              />
              <TouchableHighlight
                style={{
                  backgroundColor: 'yellow',
                  width: 150,
                  padding: 5
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Back</Text>
              </TouchableHighlight>
            </>
          }
          </View>
      </Modal>
    </LinearGradient>
  );
};

export default withNavigation(DetailAnswer);
