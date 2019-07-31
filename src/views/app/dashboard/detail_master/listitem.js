import React, { useEffect , useState } from "react";
import { View, Text, Dimensions, Alert } from "react-native";
import {AnimatedCircularProgress} from 'react-native-circular-progress'
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { deleteAnswer } from '../../../../../store/action'

const {width, height} = Dimensions.get('window')

const ListItem = ({ answer, user, deleteAnswer }) => {

  function deleteHandler(selected){
    deleteAnswer(selected._id, selected.UserId)
  }

  function showAlert(selected){
    console.log('alert supposed to be triggered')
    Alert.alert(
      selected.title,
      'What do you want to do?',
      [
        {text: 'Cancel', onPress: () => console.log('Ask me later pressed'), style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => Alert.alert('Delete', 'Are you sure?', [{text: 'Yes', onPress: () => deleteHandler(selected)}, {text: 'Cancel'}]),
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <TouchableNativeFeedback
      onLongPress={() => showAlert(answer)}
      onPress={() => {
        console.log(answer._id)
        navigation.navigate('detailanswer', {data: answer})
        }
      }
    >
      <View style={{margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#2C5364'}}>{answer.name}</Text>
        <AnimatedCircularProgress
          size={50}
          width={5}
          fill={Number(answer.score)}
          tintColor={answer.score <=60 ? ('red') : ("#00e0ff") }
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor='#3d5875'
        >
          { () => (
            <Text style={{fontFamily: 'montserrat-black', color: 'rgba(0,0,0,0.75)', fontSize: 15}}>{Math.floor(Number(answer.score)) + '%'}</Text>
          )}
        </AnimatedCircularProgress>
      </View>

    </TouchableNativeFeedback>
  );
};

const mapDispatchToProps = {
  deleteAnswer
}


export default connect(null, mapDispatchToProps)(withNavigation(ListItem));
