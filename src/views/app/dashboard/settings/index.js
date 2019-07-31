import React, { useState } from "react";
import { TextInput, View, Text, Image, Alert, Modal, Button } from "react-native";
import { FlatList, TouchableNativeFeedback } from "react-native-gesture-handler";
import Listitem from './listItem'
import style from "./style";
import { connect } from 'react-redux'
import firebase from '../../../../api/firebase'
import Axios from "axios";
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library';


const Settings = (props) => {
  const { user } = props
  const [userLogin, setUserLogin] = useState(user)
  let name = userLogin.userName.split(' ')
  let firstName = name[0]
  let lastName = name[1]
  const [modalVisible, setModalVisible] = useState(false)
  const [csv, setCsv] = useState('')

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
    console.log('ini user sens', userLogin)
    setModalVisible(!modalVisible)
  }

  const generateReport = () => {
    // Axios({
    //   url: 'http://192.168.43.39:3000/setSoal',
    //   method: 'GET'
    // }).then(({data}) => {
    //   console.log(data);
    //   setCsv(data)
    // }).catch(err => {
    //   console.log(err);
    // })

    // console.log(FileSystem.documentDirectory);
    FileSystem.downloadAsync(
      'http://localhost:3000/setSoal',
      FileSystem.documentDirectory + 'small.xls'
    )
      .then(async ({uri}) => {
        console.log(uri);
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log(asset)
      })
      .catch(error => {
        console.error(error)
      })
}

  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{
            uri: user.photoUrl
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
      <Button title='generate report' onPress={generateReport}/>
      <Text>{csv}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  //
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
