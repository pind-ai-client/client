import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationEvents } from 'react-navigation'
import ActionButton from "react-native-action-button";
import { MaterialCommunityIcons, Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as ImageManipulator from 'expo-image-manipulator'
import { TouchableOpacity, TouchableNativeFeedback, TouchableHighlight } from "react-native-gesture-handler";
import { connect } from 'react-redux'
import { createAnswer } from '../../../../../store/action'

const buttonNew = ({navigation, createAnswer}) => {

  const {height, width, scale} = Dimensions.get('window')
  const maskRowHeight = Math.round((height - 533)/20)
  const maskColWidth = (width - 400) / 2

  console.log(maskColWidth, ' maskColWidth');
  console.log(maskRowHeight, ' maskRowHeight');

  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [ratio, setRatio] = useState();
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(true)

  let supportedRatio = async () => {
    let ratioNew = await camera.getSupportedRatiosAsync();
    // console.log('dari ratio====================', ratioNew);
    setRatio(ratioNew[ratioNew.length-1])
  };

  let askPermission = async () => {
    console.log('masuk ask permission')
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setCameraPermission(status === "granted");
  };

  function changeType() {
    if (type === Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front);
    } else {
      setType(Camera.Constants.Type.back);
    }
  }

  function toggleFlash() {
    if (flash === Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.on);
      console.log(Camera.Constants.FlashMode);
      console.log('flash on');
    } else {
      setFlash(Camera.Constants.FlashMode.off);
    }
  }

  async function takePicture(){
    if(camera) {
      setLoading(true)
      let photo = await camera.takePictureAsync({
        base64: true,
        quality: 0.75
      })
      // console.log('ini photo ======',photo);
      // let manipResult = await ImageManipulator.manipulateAsync(
      //   photo.uri, 
      //   [],
      //   { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
      // )
      // console.log(height, width);
      // console.log('ini result ============', manipResult);
      setLoading(false)
      const image = new File([photo.base64], 'answer.jpg', {type: 'image/jpeg'})
      console.log(image)
      let imageForm = new FormData()
      imageForm.append('image', JSON.stringify(image))
      createAnswer(photo.uri, 'tesSoalIdNich')
      navigation.navigate('postCapture', {
        uri: photo.uri
      })
    }
  }

  async function onPictureSaved(photo) {
    console.log(photo);
    navigation.navigate('postCapture', {
      uri: photo.uri
    })
  }

  useEffect(() => {
    // console.log(navigation)
    // if (navigation.state.routeName === 'camera') {
      console.log('masuk camera dari effect')
      askPermission();
    // }
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cameraView: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    maskOutter: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    maskInner: {
      width: 400,
      backgroundColor: 'transparent',
      borderColor: 'white',
      borderWidth: 1,
    },
    maskFrame: {
      backgroundColor: 'rgba(1,1,1,0.6)',
    },
    maskRow: {
      width: '100%',
    },
    maskCenter: { flexDirection: 'row' },
  });

  renderBottomBar = () => (
    <View style={{backgroundColor: 'rgba(0,0,0,0.5)', alignContent:'center', justifyContent: 'center', height: 100}}>
      <View style={{flexDirection:'row', width: '100%', alignItems: 'center', justifyContent:'space-evenly'}}>
        <TouchableOpacity onPress={() => changeType()}>
          <MaterialCommunityIcons name="rotate-3d" size={30} color="white" />
        </TouchableOpacity>  
          <TouchableOpacity onPress={() => takePicture()}>
            <Ionicons name="ios-radio-button-on" size={70} color="white" />
          </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFlash()}>
          {flash === Camera.Constants.FlashMode.off ? (
            <MaterialIcons name="flash-off" size={30} color="white" />
          ) : (
            <MaterialIcons name="flash-on" size={30} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  if(hasCameraPermission){
    return (
      
      <View
        style={{
          flex: 1
        }}
      >
        <NavigationEvents
          onWillFocus={() => {
            console.log('masuk camera dari navigation')
            setLoaded(true)
          }}
          onDidBlur={() => {
            console.log('keluar camera')
            setLoaded(false)
          }}
        />
        {loaded && (

          <Camera
            style={{
              flex: 1
            }}
            type={type}
            onCameraReady={supportedRatio}
            ratio={ratio}
            flashMode={flash}
            autoFocus='on'
            ref={ref => {camera = ref}}
          >
          
          {loading && (
            <View style={{height: height, width: width, alignItems:'center', justifyContent:'center', backgroundColor: 'rgba(0,0,0,0.8)'}}>
              <ActivityIndicator size='large' color='white'/>
            </View>
          )}
          <View style={styles.maskOutter}>
            <View style={[{ flex: maskRowHeight  }, styles.maskRow, styles.maskFrame]} />
            <View style={[{ flex: 53 }, styles.maskCenter]}>
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              <View style={styles.maskInner} />
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            </View>
            <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame, {justifyContent: 'flex-end', }]}>
            {renderBottomBar()}
            </View>
          </View>
          </Camera>
        )}
      </View>
    );
  } else{
    return (
      <Text>No permissions</Text>
    )
  }

  
};

const mapDispatchToProps = { createAnswer }

export default connect(null, mapDispatchToProps)(buttonNew);
