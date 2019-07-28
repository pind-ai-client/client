import React, { useEffect, useState } from "react";
import { 
  View, 
  Text,
  StyleSheet,
} from "react-native";
import axios from 'axios'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  score: {
    flex: 2,
    backgroundColor: 'blue'
  },
  detailStudent: {
    flex: 1,
    backgroundColor: 'green'
  },
  listAnswer: {
    flex: 4,
    backgroundColor: 'yellow'
  }
})

const DetailAnswer = () => {

  const [answer, setAnswer] = useState({})

  useEffect(() => {
    axios.get('http://localhost:3000/answers/5d3da92e08d53f13eb74c036')
    .then(({ data }) => {
      console.log('dapet datanyaa nih ======')
      console.log(data)
      setAnswer(data)
    })
    .catch(err => {
      console.log('error fetch one answer')
      console.log(err)
    })
  }, [])
  return (
    <View style= {styles.container}>
      <View style={styles.score}> 
        <Text>For Score(chart)</Text>
      </View>
      <View style={styles.detailStudent}> 
        <Text>For Detail Student</Text>
      </View>
      <View style={styles.listAnswer}>
        
      </View>

    </View>
  );
};

export default DetailAnswer;
