import React from "react";
import { View, Text } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import style from "./style";

const listMenus = [
  { id: 1, title: 'Account', onPress: () => console.log('masuk account') },
  { id: 2, title: 'Help', onPress: () => console.log('masuk help') },
  { id: 3, title: 'Logout', onPress: () => console.log('masuk logout') },
]

const Settings = () => {
  _keyExtractor = (item, index) => String(item.id);

  _renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={item.onPress} style={[style.oneContainer, style.itemList, style.justify]}>
      <Text>{item.title}</Text>
    </TouchableWithoutFeedback>
  );

  return (
    <View>
      <View style={[style.headerContainer, style.justify]}>
        <Text style={style.title}>Settings</Text>
      </View>
      <FlatList
        data={listMenus}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default Settings;
