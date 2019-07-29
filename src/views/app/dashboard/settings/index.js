import React from "react";
import { View, Text } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import style from "./style";
import { withNavigation } from 'react-navigation'

const listMenus = [
  { id: 1, title: 'Account', onPress: (props) => props.navigation.navigate('acc') },
  { id: 2, title: 'Help', onPress: (props) => props.navigation.navigate('help') },
  { id: 3, title: 'Logout', onPress: () => console.log('masuk logout') },
]

const Settings = (props) => {
  _keyExtractor = (item, index) => String(item.id);

  _renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={() => item.onPress(props)} style={[style.oneContainer, style.itemList, style.justify]}>
      <Text>{item.title}</Text>
    </TouchableWithoutFeedback>
  );

  return (
    <View>
      <View style={[style.headerContainer, style.justify]}>
        <Text style={style.title}>Settings</Text>
      </View>
      <FlatList
        style={{paddingTop : 100}}
        data={listMenus}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default withNavigation(Settings);
