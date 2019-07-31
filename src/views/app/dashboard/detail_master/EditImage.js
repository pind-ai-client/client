import React, {useState, useEffect, useRef} from 'react'
import { 
    View,
    ScrollView, 
    Text, 
    Image, 
    ActivityIndicator, 
    Button,
    Modal,
    TextInput 
} from 'react-native'

import { connect } from 'react-redux'
import { updateAnswer, createAnswer } from '../../../../../store/action'

const EditImage = ({navigation, isLoading, error, createdAnswer, updateAnswer}) => {
    const [Info, setInfo] = useState('Loading')
    const [modalVisible, setModalVisible] = useState(false)
    const [back, setBack] = useState(false)
    const [goBack, setGoBack] = useState(false)

    const [updatedName, setUpdatedName] = useState('')

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

    function _renderImage() {
        return (
            <View style={{marginVertical: 20, alignItems: 'center', justifyContent: 'center'}}>
                <ScrollView>

                <Image
                    source={{uri: uri}}
                    style={{width: 280, height: 373.1, resizeMode:'contain', borderRadius: 20}}/>
                {
                    isLoading 
                    ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text>{Info}</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
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
                                <ScrollView>

                                    <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop: 22}}>
                                        <Text>Answer Preview</Text>
                                        <Image
                                            source={{uri: uri}}
                                            style={{width: 280, height: 373.1, resizeMode:'contain', borderRadius: 20}}
                                        />
                                        <View style={{flex:1, flexDirection:'row', justifyContent:'center', height: 25}}>
                                            <Text>Name:  </Text>
                                            <TextInput 
                                                value={updatedName}
                                                editable={true}
                                                onChangeText={text => setUpdatedName(text.toUpperCase())}
                                                style={{height: 20, width:150, borderColor: 'gray', borderWidth: 1}}
                                            />
                                        </View>
                                        <Text>Score: {createdAnswer.score}</Text>
                                        <Text>Answers:</Text>
                                        {
                                            Object.keys(createdAnswer.answers).map((answer, i) => {
                                                return (
                                                    <Text key={i}>{i+1}: {createdAnswer.answers[answer]}</Text>
                                                )
                                            })
                                        }
                                        <Button
                                        title='Confirm Answer'
                                        onPress={() => {
                                            console.log(updatedName)
                                            updateAnswer(createdAnswer._id, {
                                                name: updatedName
                                            })
                                            setBack(true)
                                        }}
                                        />
                                    </View>
                                </ScrollView>
                            </Modal>
                        </View>
                        : <View>
                            <Text>Image cannot be processed</Text>
                            <Text>Please take the picture according to the guide line</Text>
                            <Button title="Take another picture" onPress={() => navigation.navigate('camera')}/>
                        </View>
                }
                </ScrollView>
                
            </View>
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
