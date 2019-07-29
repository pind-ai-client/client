import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from "react-native";
import axios from 'axios'
import Listitem from './listitem'

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
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listAnswer: {
    flex: 4,
    backgroundColor: 'yellow',
    justifyContent: 'center'
  }
})

const DetailAnswer = () => {

  const [answer, setAnswer] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/answers/5d3de345b6643c3db4651915')
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
    <View style={styles.container}>
      <View style={styles.score}>
        <Text>{answer.score}</Text>
      </View>
      <View style={styles.detailStudent}>
        <Text>{answer.name}</Text>
      </View>
      <View style={styles.listAnswer}>
        {answer.length === 0 ? <Text>Loading dulu mas</Text> :
          <>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: 'red',
              margin: 10
            }}>
              <Text>No</Text>
              <Text>Answer</Text>
              <Text>Key</Text>
            </View>
            <FlatList
              data={Object.entries(answer.answers)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Listitem master={item} />
                  </View>
                )
              }}
            />
          </>
        }
      </View>
    </View>
  );
};

export default DetailAnswer;
