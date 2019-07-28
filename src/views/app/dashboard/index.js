import React from "react";
import { View, Text, Image, Button } from "react-native";
import style from "./style";
import Listitem from "./listitem";
import { AntDesign } from "@expo/vector-icons";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList
} from "react-native-gesture-handler";
import {LinearGradient} from 'expo-linear-gradient'
import { data, user, masters } from "../../../../mockdata";

let name = user.name.split(' ')
let firstName = name[0]
let lastName = name[1]

const Dashboard = ({ navigation }) => {
  return (
    
    <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
      <View style={style.topcontainer}>
        <View style={style.navcontainer}>
          
          <View style={style.logocontainer}>
            <Text style={style.logo}>pindai</Text>
          </View>
        </View>
        <View style={[style.avatarcontainer, {marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('settings')}>
              <Image
                source={{
                  uri: user.photoURL
                }}
                style={style.avatar}
              />
            </TouchableWithoutFeedback>
            <View>
              <Text style={style.hello}>Hi, <Text style={{fontFamily: 'montserrat-black', fontSize: 20}}>{firstName}</Text>{lastName && (<Text>{lastName}</Text>)}</Text>
              <Text>yomann</Text>
            </View>
          </View>
          <View>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("newmaster")}
            >
              <AntDesign name="plus" size={20} color="#a9a9a9" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={style.categories}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Text style={{color: 'white', marginRight: 5}}>Sort: </Text>
          <View style={{marginRight: 5, padding: 5, borderColor: 'white', borderRadius: 25, borderWidth: 1}}>
            <Text style={{color: 'white', fontSize: 10}}>Ascending</Text>
          </View>
          <View style={{marginRight: 5, padding: 5, borderColor: 'white', borderRadius: 25, borderWidth: 1}}>
            <Text style={{color: 'white', fontSize: 10}}>Descending</Text>
          </View>
        </View>
      </View>
      <View style={style.listcontainer}>
        <View style={{height: 165}}/>
        <FlatList
          style={{paddingTop: 65}}
          keyExtractor={(item, index) => index.toString()}
          data={masters}
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

// <Text style={style.username}>{user.name}</Text>
export default Dashboard;
