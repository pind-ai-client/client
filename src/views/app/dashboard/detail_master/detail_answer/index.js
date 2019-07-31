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
  // console.log(data)

  const [answer, setAnswer] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [type, setType] = useState('edit')
  const [name, setName] = useState('')

  fetchData = () => {
    axios.get(`http://35.240.166.155:3000/answers/${data._id}`)
      .then(({ data }) => {
        setAnswer(data)
        console.log(data)
        setName(data.name)
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
          <View style={{ height: height / 3, width: width, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableHighlight
              onPress={() => setType('image')}
            >
              <AnimatedCircularProgress
                size={150}
                width={30}
                fill={answer.score ? answer.score : 0}
                tintColor={ !answer.score ? 'red' : answer.score < 60 ? 'red' : '#00e0ff' }
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor='#3d5875'
              >
                {() => (
                  <Text style={{ fontFamily: 'montserrat-black', color: 'white', fontSize: 30 }}>{answer.score}</Text>
                )}
              </AnimatedCircularProgress>
            </TouchableHighlight>
            <Text style={{ fontFamily: 'montserrat-black', fontSize: 30, color: 'white' }}>{!answer.score ? 'loading...' : answer.score<60 ? 'Failed' : 'Passed' }</Text>
          </View>
          {
            answer.length === 0 ?
              <></>
              :
              <View>
                <View style={styles.detailStudent}>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white'
                    }}>{answer.name}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{
                  justifyContent: 'space-around',
                  backgroundColor: 'black',
                  flexDirection: 'row',
                  margin: 10,
                  padding: 5,
                  borderRadius: 7
                }}>
                  <Text style={{ color: 'white' }}>No</Text>
                  <Text style={{ color: 'white' }}>Answer</Text>
                  <Text style={{ color: 'white' }}>Key</Text>
                </View>
                <View style={{height: ((height/3) *2) - 60}}>
                  <FlatList
                    data={Object.entries(answer.answers)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <Listitem master={item} answerKey={Object.entries(answer.setSoalId.answerKey)} index={index} fullAnswer={answer.answers} fetchData={fetchData} answerId={answer._id}></Listitem>
                    )
                    }
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
