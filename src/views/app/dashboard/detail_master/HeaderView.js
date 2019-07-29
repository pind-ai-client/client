import React from "react";
import {withNavigation} from 'react-navigation'
import { View, Text, ImageBackground, Dimensions, Button } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import moment from 'moment-with-locales-es6'
import { TouchableOpacity } from "react-native-gesture-handler";
import {masters} from '../../../../../mockdata'

const HeaderView = ({navigation, id, dataSoal}) => {
    let data = masters[id-1]
    let {height, width} = Dimensions.get('window')

    function editData(){
        console.log(dataSoal);
        navigation.navigate("edit", {
            data : dataSoal
        })
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
                        <Button
                        onPress={editData}
                        title="edit"
                        />
                    </View>
                </View>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 30}}>
                    <Text style={{fontSize: 35, fontFamily: 'montserrat-black', color: 'white'}}>{data.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{color: 'white', fontFamily: 'montserrat-regular', fontSize: 15}}>
                        <AntDesign size={15} color='white' name='clockcircle'/>
                        {'  '}
                        {moment(data.createdAt).fromNow()}
                    </Text>
                    <Text>{'    '}</Text>
                    <Text style={{color: 'white', fontFamily: 'montserrat-regular', fontSize: 15}}>
                        {'#'}{data.length} questions
                    </Text>
                    </View>
                </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

export default withNavigation(HeaderView)
