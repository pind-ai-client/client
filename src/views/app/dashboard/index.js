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

const Dashboard = ({ navigation }) => {
  return (
    <LinearGradient colors={['#0F2027', '#203A43', '#2C5364']}>
      <View style={style.topcontainer}>
        <View style={style.navcontainer}>
          
          <View style={style.logocontainer}>
            <Text style={style.logo}>pind.ai</Text>
          </View>
          <View>
            <Button
            title="New"
            onPress={()=> navigation.navigate("newmaster")}
            />
          </View>
        </View>
        <View style={[style.avatarcontainer, {marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image
                source={{
                  uri: user.photoURL
                }}
                style={style.avatar}
              />
            </View>
            <View>
              <Text style={style.hello}>{user.name}</Text>
              <Text>yomann</Text>
            </View>
          </View>
          <View>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("settings")}
            >
              <AntDesign name="setting" size={30} color="#a9a9a9" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={style.listcontainer}>
        <FlatList
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
