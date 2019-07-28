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
import { data, user, masters } from "../../../../mockdata";

const Dashboard = ({ navigation }) => {
  return (
    <View style={style.container}>
      <View style={style.topcontainer}>
        <View style={style.navcontainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("settings")}
          >
            <AntDesign name="setting" size={25} color="#a9a9a9" />
          </TouchableWithoutFeedback>
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
        <View style={style.avatarcontainer}>
          <Image
            source={{
              uri: user.photoURL
            }}
            style={style.avatar}
          />
          <Text style={style.username}>{user.name}</Text>
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
    </View>
  );
};

export default Dashboard;
