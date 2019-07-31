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
  TextInput
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
  const [name, setName] = useState('')

  fetchData = () => {
    axios.get(`http://localhost:3000/answers/${data._id}`)
      .then(({ data }) => {
        setAnswer(data)
        setName(data.name)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  editName = () => {
    axios.put('http://localhost:3000/answers/'+ data._id, {name})
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
            <AnimatedCircularProgress
              size={150}
              width={30}
              fill={86}
              tintColor="#00e0ff"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor='#3d5875'
            >
              {() => (
                <Text style={{ fontFamily: 'montserrat-black', color: 'white', fontSize: 30 }}>{answer.score}</Text>
              )}
            </AnimatedCircularProgress>
            <Text style={{ fontFamily: 'montserrat-black', fontSize: 30, color: 'white' }}>Passed</Text>
          </View>
          {
            answer.length === 0 ?
              <Text>Loading dulu masnya</Text>
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
                <FlatList
                  data={Object.entries(answer.answers)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Listitem master={item} answerKey={Object.entries(answer.setSoalId.answerKey)} index={index} fullAnswer={answer.answers} fetchData={fetchData} answerId={answer._id}></Listitem>
                  )
                  }
                />
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
            <Text style = {{textAlign: 'center'}}>Edit Student Name</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
              onChangeText={text => setName(text)}
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
          </View>
      </Modal>
    </LinearGradient>
  );
};

export default withNavigation(DetailAnswer);
