import React from "react";
import { View, Text, Image } from "react-native";
import { FlatList, TouchableNativeFeedback } from "react-native-gesture-handler";
import Listitem from './listItem'
import style from "./style";
import { user } from '../../../../../mockdata'
import { firebase } from '../../../../api/firebase'

let name = user.name.split(' ')
let firstName = name[0]
let lastName = name[1]

const Settings = (props) => {
  const logoutFirebase = () => {
    firebase.auth().signOut().then(function() {
      props.navigation.navigate('login')
    }).catch(function(error) {
      console.log(error)
    });
  }
  const listMenus = [
    // { id: 1, title: 'Account', onPress: () => console.log('masuk account') },
    // { id: 2, title: 'Help', onPress: () => console.log('masuk help') },
    { id: 3, title: 'Logout', onPress: logoutFirebase },
  ]

  _keyExtractor = (item, index) => String(item.id);

  _renderItem = ({item}) => (
    <View>
      <Listitem data={item}/>
    </View>
    // <TouchableWithoutFeedback onPress={item.onPress} style={[style.oneContainer, style.itemList, style.justify]}>
    //   <Text>{item.title}</Text>
    // </TouchableWithoutFeedback>
  );

  _changeProfilePicture = () => {
    console.log('change profile')
  }

  return (
    <View>
      <View style={[style.headerContainer, style.justify]}>
        <Text style={style.title}>Settings</Text>
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{
            uri: user.photoURL
          }}
          style={style.avatar}
        />
        <Text style={style.hello}>
          Hi, 
          <Text style={{fontSize: 20}}>
            {firstName}
          </Text>
            {lastName && (<Text>{lastName}</Text>)}
        </Text>
        <TouchableNativeFeedback onPress={_changeProfilePicture}>
          <Text>Edit Profile</Text>
        </TouchableNativeFeedback>
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
