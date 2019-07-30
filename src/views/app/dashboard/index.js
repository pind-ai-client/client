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
import { fetchSetSoals } from '../../../../store/action'

const Dashboard = ({ navigation, user, fetchSetSoals, setSoals }) => {
  // console.log(user);
  let name = user.userName.split(' ')
  let firstName = name[0]
  let lastName = name[1]

  useEffect(() => {
    fetchSetSoals('5d3fed23232d881d8a2ef962') // ini ngefetch set soal based user id nya
  }, [])

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
        <Text style={{color: 'white'}}>You have {masters.length} Answer Keys in total</Text>
      </View> 
      <View style={style.listcontainer}>
        
        <FlatList

          keyExtractor={(item, index) => index.toString()}
          data={setSoals}
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
  fetchSetSoals
}

// <Text style={style.username}>{user.name}</Text>
export default connect(MapStateToProps,mapDispatchtoProps)(Dashboard);
