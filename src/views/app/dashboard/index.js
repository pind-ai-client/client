import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, ImageBackground } from "react-native";
import style from "./style";
import Listitem from "./listitem";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native-gesture-handler";
import {LinearGradient} from 'expo-linear-gradient'
import {connect} from 'react-redux';
import { fetchSetSoals, successFetchSoals } from '../../../../store/action'


const Dashboard = ({ successFetchSoals, navigation, user, fetchSetSoals, setSoals }) => {
  const [sortedSetsoals, setSortedSetsoals] = useState({data:setSoals})
  const [pickSortBy, setPickSortBy] = useState()
  const [sortBy, setSortBy] = useState({type: 'time', asc: false})
  console.log('###################################################3re render')
  // console.log('ini di global setsoals y', setSoals);
  console.log('ini di global srotedsetsoals', sortedSetsoals);
  // console.log('ini di global user', user);
  let name = user.userName.split(' ')
  let firstName = name[0]
  let lastName = name[1]

  let getSoals = () => {
    fetchSetSoals(user.UserId) 
  }

  useEffect(() => {
    getSoals()
  }, [])

  useEffect(() => {
    console.log('##########################masuk set useeffect sorted')
    // getSoals()
    setSortedSetsoals({data: setSoals})
    sortByNewest()
  }, [setSoals])

  const sortByNewest = () => {
    let sorted = setSoals.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt))
    setSortedSetsoals({data: sorted})
  }

  const sortByOldest = () => {
    let sorted = setSoals.sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt))    
    setSortedSetsoals({data: sorted})
  }

  const sortByAsc = () => {
    let sorted = setSoals.sort((x, y) => x.title > y.title)    
    setSortedSetsoals({data: sorted})
  }

  const sortByDesc = () => {
    let sorted = setSoals.sort((x, y) => x.title < y.title)    
    setSortedSetsoals({data: sorted})
  }

  const handleSort = (type) => {
    setSortBy({type: type, asc: !sortBy.asc})
    if(sortBy.type === 'time'){
      if(sortBy.asc){
        sortByNewest()
      }else{
        sortByOldest()
      }
    }else{
      if(sortBy.asc){
        sortByAsc()
      }else{
        sortByDesc()
      }
    }
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
        <Text style={{color: 'white'}}>You have {sortedSetsoals.data.length} Question Sets in total</Text>
      </View> 
      <View style={style.listcontainer}>
        <View style={{ flexDirection: 'row', alignItems:'center', padding: 10}}>
          <Text style={{color: 'white', marginRight: 10}}>Sort: </Text>
          <TouchableNativeFeedback onPress={() => handleSort('time')} style={{marginRight: 10}}>
            <View style={{flexDirection: 'row'}}>
              <AntDesign name="clockcircleo" size={20} color='white'/>
              { sortBy.asc && sortBy.type === 'time' ? (
                <FontAwesome name='sort-up' size={20} color='white'/>
              ) : (
                <FontAwesome name='sort-down' size={20} color='white'/>
              ) }
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => handleSort('alphabet')}>
            <View style={{flexDirection: 'row'}}>
              { sortBy.asc && sortBy.type === 'alphabet' ? (
                <FontAwesome name='sort-alpha-desc' size={20} color='white'/>
              ) : (
                <FontAwesome name='sort-alpha-asc' size={20} color='white'/>
              ) }
            </View>
          </TouchableNativeFeedback>
        </View>
        <FlatList

          keyExtractor={(item, index) => index.toString()}
          data={sortedSetsoals.data}
          renderItem={({ item }) => {
            return (
              <View>
                <Listitem master={item} getSoals={getSoals} />
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
