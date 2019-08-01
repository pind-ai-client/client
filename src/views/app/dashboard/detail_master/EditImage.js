import React, {useState, useEffect, useRef} from 'react'
import { 
    View,
    ScrollView, 
    Text, 
    Image, 
    ActivityIndicator, 
    Button,
    Modal,
    TextInput,
    Dimensions
} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

import { connect } from 'react-redux'
import { updateAnswer, createAnswer } from '../../../../../store/action'
import { FlatList } from 'react-native-gesture-handler';
import {debounce} from 'lodash'

const {width, height} = Dimensions.get('window')

const EditImage = ({navigation, isLoading, error, createdAnswer, updateAnswer}) => {
    const [Info, setInfo] = useState('Loading')
    const [modalVisible, setModalVisible] = useState(false)
    const [back, setBack] = useState(false)
    const [goBack, setGoBack] = useState(false)

    const [updatedName, setUpdatedName] = useState('')

    // const [updateN]

    let uri = navigation.getParam('uri')
    // console.log(uri);

    useEffect(() => {
        if (back) {
            setModalVisible(false)
            setGoBack(true)
        }
    }, [back])

    useEffect(() => {
        if (goBack) {
            navigation.navigate('detailmaster')
        }
    }, [goBack])

    useEffect(() => {
        if (createdAnswer.hasOwnProperty('name')) {
            console.log('ke trigger setupdated name')
            // updatedName.current.value = createdAnswer.name
            
            setUpdatedName(createdAnswer.name)
        }
    }, [createdAnswer])

    useEffect(() => {
        setTimeout(() => {
            setInfo('Uploading')
            setTimeout(() => {
                setInfo('Analyzing Image')
            }, 5000)
        }, 5000)
    }, [])

     function onChangeEditName(text){
        console.log('ini dari text ====================', text)

        setUpdatedName(text)
    }


    useEffect(() => {
        console.log('ini dari updatedName ====================', updatedName);
    }, [updatedName])


    function _renderImage() {
        return (
            <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
            <ScrollView style={{height: height}}>
                <View style={{alignItems: 'center', justifyContent: 'center', height}}>
                    <Image
                        source={{uri: uri}}
                        style={{width: width/1.5, height: height/2, resizeMode:'cover', borderRadius: 20, borderColor: 'white', borderWidth: 2}}/>
                    {
                        isLoading 
                        ? <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
                            <Text style={{color: 'white', fontFamily: 'montserrat-black', fontSize: 20}}>{Info}</Text>
                            <ActivityIndicator size="large" color="orange" />
                        </View> 
                        : createdAnswer.hasOwnProperty('answers') && error === undefined
                            ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                { !modalVisible && (setModalVisible(true)) }
                                {/* { modalVisible && setUpdatedName(createdAnswer.name) } */}
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={modalVisible}
                                >
                                    {/* {setUpdatedName(createdAnswer.name)} */}
                                    <LinearGradient colors={['#2C5364', '#203A43', '#0F2027']}>
                                        
                                            <View style={{justifyContent:'center', alignItems:'center', marginTop: 22}}>
                                                <Text style={{fontSize: 20, fontFamily: 'montserrat-black', color: 'white'}}>Answer Preview</Text>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Image
                                                        source={{uri: uri}}
                                                        style={{width: width/3, height: height/4, resizeMode:'cover', borderRadius: 20, borderColor: 'white', borderWidth: 2, margin: 20}}
                                                    />
                                                    <View>
                                                        <Text style={{fontSize: 15, fontFamily: 'montserrat-regular', color: 'white'}}>Name:  </Text>
                                                        <TextInput 
                                                        // ref={component => updatedName.current = component}
                                                        value={updatedName}
                                                        // editable={true}
                                                        onChangeText={onChangeEditName}
                                                        style={{height: 40, width:150, backgroundColor: 'white', borderRadius: 10, padding: 10}}
                                                        />
                                                        <Text style={{color: 'white', fontFamily: 'montserrat-regular', fontSize: 20}}>Temporary Score: {createdAnswer.score}</Text>
                                                    </View>
                                                </View>
                                                
                                                
                                                <Text style={{color: 'white', fontFamily: 'montserrat-regular', fontSize: 15}}>Answers:</Text>
                                                <ScrollView style={{height: ((height/4)*3) - 150, marginBottom: 20}}>
                                                    {
                                                        Object.keys(createdAnswer.answers).map((answer, i) => {
                                                            return (
                                                                <View key={i} style={{flexDirection: 'row', alignItems: 'center', height: 50, padding: 10}}>
                                                                    <Text style={{color: 'white', fontSize: 20, fontFamily: 'montserrat-regular'}}>{i+1}. </Text>
                                                                    <Text style={{color: 'white', fontSize: 20, fontFamily: 'montserrat-regular'}}>{createdAnswer.answers[answer]}</Text>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                    <Button
                                                    title='Confirm Answer'
                                                    onPress={() => {
                                                        // console.log(updatedName.current.value, 'waktu submit')
                                                        updateAnswer(createdAnswer._id, {
                                                            name: updatedName.toUpperCase()
                                                        })
                                                        setBack(true)
                                                    }}
                                                    />
                                                </ScrollView>
                                            </View>
                                    </LinearGradient>
                                </Modal>
                            </View>
                            : <View style={{marginTop:20}}>
                                <Text style={{textAlign:'center', color: 'white', fontFamily: 'montserrat-black', fontSize: 15}}>Image cannot be processed</Text>
                                <Text style={{textAlign:'center', color: 'white', fontFamily: 'montserrat-black', fontSize: 15, marginBottom: 10}}>Please take the picture according to the guide line</Text>
                                <Button title="Take another picture" onPress={() => navigation.navigate('camera')}/>
                            </View>
                    }
                    </View>
                </ScrollView>
            </LinearGradient>
        )
    }

    return (
        <View style={{flex: 1, justifyContent:'center'}}>
            {_renderImage()}
        </View>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = { updateAnswer }

export default connect(mapStateToProps, mapDispatchToProps)(EditImage)
