import React, { useState } from "react";
import { TextInput, View, Text, Image, Alert, Modal, Button } from "react-native";
import { FlatList, TouchableNativeFeedback } from "react-native-gesture-handler";
import Listitem from './listItem'
import style from "./style";
import { user } from '../../../../../mockdata'
import firebase from '../../../../api/firebase'

const Settings = (props) => {
  const [userLogin, setUserLogin] = useState({
    username: "robbycp",
    name: "Robby Caesar",
    email: "robbycaesar@gmail.com",
    photoURL: user.photoURL
  })
  let name = userLogin.name.split(' ')
  let firstName = name[0]
  let lastName = name[1]
  const [modalVisible, setModalVisible] = useState(false)

  const logoutFirebase = () => {
    firebase.auth().signOut().then(function() {
      props.navigation.navigate('login')
    }).catch(function(error) {
      console.log(error)
    });
  }

  const pressLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: logoutFirebase},
      ],
      {cancelable: false},
    )
  }

  _editProfile = () => {
    setModalVisible(!modalVisible)
  }

  const listMenus = [
    { id: 1, title: 'Edit Profile', onPress: _editProfile },
    // { id: 2, title: 'Help', onPress: () => console.log('masuk help') },
    { id: 3, title: 'Logout', onPress: pressLogout },
  ]

  _keyExtractor = (item, index) => String(item.id);

  _renderItem = ({item}) => (
    <View>
      <Listitem data={item}/>
    </View>
  );

  const sendUpdateProfile = () => {
    console.log('ini user send', userLogin)
    setModalVisible(!modalVisible)
  }

  return (
    <View style={{ flexDirection: 'column' }}>
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
      </View>
      <FlatList
        style={{paddingTop : 100}}
        data={listMenus}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        >
        <View style={{marginTop: 22}}>
          <View style={{ flexDirection: 'column' }}>
            <View style={style.formContainer}>
              <Text>Full Name</Text>
              <TextInput
                style={style.formInput}
                placeholder="Full Name"
                onChangeText={(text) => setUserLogin({ ...userLogin, name: text })}
                value={userLogin.name}
              />
            </View>
            <View style={style.formContainer}>
              <Text>Username</Text>
              <TextInput
                style={style.formInput}
                placeholder="Username"
                onChangeText={(text) => setUserLogin({ ...userLogin, username: text })}
                value={userLogin.username}
              />
            </View>
            <View style={style.formContainer}>
              <Text>Email</Text>
              <TextInput
                style={style.formInput}
                placeholder="Email"
                onChangeText={(text) => setUserLogin({ ...userLogin, email: text })}
                value={userLogin.email}
              />
            </View>
            <View style={style.formContainer}>
              <Text>Photo</Text>
              <TextInput
                style={style.formInput}
                placeholder="File Photo"
                onChangeText={(text) => setUserLogin({ ...userLogin, photoURL: text })}
                value={userLogin.photoURL}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Button title="Cancel" onPress={() => setModalVisible(!modalVisible)}/>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button title="Update" onPress={sendUpdateProfile}/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default withNavigation(Settings);
