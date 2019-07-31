import React, { useEffect, useState } from "react";
import {withNavigation} from 'react-navigation'
import { View, Text, ImageBackground, Dimensions, Button, Alert } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import moment from 'moment-with-locales-es6'
import { TouchableOpacity } from "react-native-gesture-handler";
import {masters} from '../../../../../mockdata'
import Menu, { MenuItem, MenuDivider, Position } from 'react-native-enhanced-popup-menu'
import {deleteSetSoal, generateCSV } from '../../../../../store/action'
import {connect} from 'react-redux'


const HeaderView = ({navigation, id, dataSoal, question, deleteSetSoal, userid, generateCSV}) => {
    let data = masters[id-1]
    let {height, width} = Dimensions.get('window')

    let textRef = React.createRef();
    let menuRef = null;
    
    const setMenuRef = ref => menuRef = ref;
    const hideMenu = () => menuRef.hide();
    const showMenu = () => {
        menuRef.show(textRef.current, stickTo = Position.TOP_LEFT)
    };
    
    const onPress = () => showMenu();

    function clickGenerateCSV(){
        generateCSV(dataSoal._id)
    }

    function editData(){
        hideMenu()
        navigation.navigate("edit", {
            data : dataSoal
        })
    }

    function handleDelete(){
        Alert.alert(
          `Delete Item`,
          `Delete ${dataSoal.title}?`,
          [
            {
              text: 'Yes',
              onPress: () => {
                hideMenu()
                deleteSetSoal(id, userid)
                navigation.navigate('dash')
            },
            },
            {
              text: 'Cancel',
              onPress: () => console.log('cancelled'),
            },
          ],
          {cancelable: true},
        );
      }
    

    return (
        <View>
            <ImageBackground
                source={require('../../../../../assets/detail-master.jpg')}
                style={{width: width, height: height/4}}
            >
                <LinearGradient colors={['rgba(255, 255, 255, 0)', '#22424a']} 
                style={{width: width, height: height/4, padding: 20}}>
                <View style={{flexDirection : "row" , justifyContent : "space-between"}}>
                    <TouchableOpacity onPress={() => navigation.navigate('dash')}>
                        <View style={{alignItems: 'flex-start', justifyContent:'center'}}>
                        <Entypo name='chevron-left' size={30} color='white'/>
                        </View>
                    </TouchableOpacity>
                    <View style={{width : 70, alignItems : "flex-end"}}>
                        <Entypo name='menu' size={25} color='white' onPress={onPress}/>
                        <Text ref={textRef}/>
                    </View>
                </View>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 30}}>
                    <Text style={{fontSize: 35, fontFamily: 'montserrat-black', color: 'white'}}>{dataSoal.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{color: 'white', fontFamily: 'montserrat-regular', fontSize: 15}}>
                        <AntDesign size={15} color='white' name='clockcircle'/>
                        {'  '}
                        {moment(dataSoal.updatedAt).fromNow()}
                    </Text>
                    <Text>{'    '}</Text>
                    <Text style={{color: 'white', fontFamily: 'montserrat-regular', fontSize: 15}}>
                        {'#'}{question} questions
                    </Text>
                    </View>
                </View>

                <Menu ref={setMenuRef}>
                    <MenuItem onPress={editData}>Edit</MenuItem>
                    <MenuItem onPress={handleDelete}>Delete</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={clickGenerateCSV}>Download CSV</MenuItem>
                </Menu>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const mapDispatchToProps = {
    deleteSetSoal,
    generateCSV
}

export default connect(null, mapDispatchToProps)(withNavigation(HeaderView))
