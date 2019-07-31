import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, ImageBackground } from "react-native";
import style from "./style";
import Listitem from "./listitem";
import { AntDesign } from "@expo/vector-icons";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity
} from "react-native-gesture-handler";
import {LinearGradient} from 'expo-linear-gradient'
import { data, usermock, masters } from "../../../../mockdata";
import {connect} from 'react-redux';
import axios from 'axios'
import { fetchSetSoals, successFetchSoals } from '../../../../store/action'


const Dashboard = ({ successFetchSoals, navigation, user, fetchSetSoals, setSoals }) => {
  const [sortedSetsoals, setSortedSetsoals] = useState({data:setSoals})
  const [pickSortBy, setPickSortBy] = useState()
  console.log('###################################################3re render')
  // console.log('ini di global setsoals y', setSoals);
  console.log('ini di global srotedsetsoals', sortedSetsoals);
  // console.log('ini di global user', user);
  let name = user.userName.split(' ')
  let firstName = name[0]
  let lastName = name[1]

  useEffect(() => {
    console.log('##########################masuk use effect user', user)
    fetchSetSoals(user.UserId) // ini ngefetch set soal based user id nya
  }, [])

  useEffect(() => {
    console.log('##########################masuk set useeffect sorted')
    // console.log('masuk sini', sortedClick)
    let sorted
    if (pickSortBy === 'newest') {
      sorted = sortedSetsoals.data.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt))
    } else if (pickSortBy === 'oldest') {
      sorted = sortedSetsoals.data.sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt))
    } else {
      sorted = setSoals
    }
    console.log('ini picksortby', pickSortBy)
    console.log('ini yang di sorted', sorted)
    setSortedSetsoals({data: sorted})
    // if (!sortedClick) {
    // }
  }, [setSoals])

  const sortByNewest = () => {
    console.log('##########################start newest brok')
    let sorted = setSoals.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt))
    // console.log('ini sorted newests', sorted)
    // successFetchSoals(sorted)
    setSortedSetsoals({data: sorted})
    setPickSortBy('newest')
  }

  const sortByOldest = () => {
    console.log('##########################start sortByOldest')
    // console.log('ini sorted oldest', sorted)
    // successFetchSoals(sorted)
    let sorted = setSoals.sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt))    
    setSortedSetsoals({data: sorted})
    setPickSortBy('oldest')
  }

  return (
    
    <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
    <ImageBackground 
      source={require('../../../../assets/exam.jpg')} 
      style={style.topcontainer}
      imageStyle={{
        borderBottomRightRadius: 50
      }}
      >
      <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', borderBottomRightRadius: 50}}>
        <View style={style.navcontainer}>          
          <View style={style.logocontainer}>
            <TouchableWithoutFeedback hitSlop={{left: -20, right: -20, top: -20, bottom: -20}} onPress={() => {navigation.navigate('settings')}}>
              <Text style={style.logo}>pindai</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={[style.avatarcontainer, {marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={ () => navigation.navigate('settings') }>
              <View>
              <Image
                source={{
                  uri: user.photoUrl
                }}
                style={style.avatar}
              />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={style.hello}>Hi, <Text style={{fontFamily: 'montserrat-black', fontSize: 20}}>{firstName}</Text>{lastName && (<Text style={{color: 'orange'}}>{lastName}</Text>)}</Text>
              <Text style={{color: 'white', fontFamily:'montserrat-regular'}}>Welcome back!</Text>
            </View>
          </View>
        </View>
      </View>
      </ImageBackground>
      <View style={style.categories}>
        <Text style={{color: 'white'}}>You have {user.setSoal.length} Question Sets in total</Text>
      </View> 
      <View style={style.listcontainer}>
        <View style={{ flexDirection: 'row' }}>
          <Button title="Latest" onPress={sortByNewest} />
          <Button title="Oldest" onPress={sortByOldest} />
        </View>
        <FlatList

          keyExtractor={(item, index) => index.toString()}
          data={sortedSetsoals.data}
          renderItem={({ item }) => {
            return (
              <View>
                <Listitem master={item} />
              </View>
            );
          }}
        />
      </View>
    </LinearGradient>
  );
};

const MapStateToProps = state => {
  return {
    user: state.user,
    setSoals: state.setSoals
  }
}
const mapDispatchtoProps = {
  fetchSetSoals,
  successFetchSoals
}

// <Text style={style.username}>{user.name}</Text>
export default connect(MapStateToProps,mapDispatchtoProps)(Dashboard);
