import React, {useState, useEffect} from 'react'
import { View, Text, Image, ActivityIndicator, Button, ScrollView } from 'react-native'

import { connect } from 'react-redux'

const EditImage = ({navigation, isLoading, error, createdAnswer}) => {
    const [Info, setInfo] = useState('Loading')
    let uri = navigation.getParam('uri')
    console.log(uri);

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
                    : error === undefined
                        ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text>Name: {createdAnswer.name}</Text>
                            <Text>Answers: {JSON.stringify(createdAnswer.answers, null, 4)}</Text>
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

export default connect(mapStateToProps, null)(EditImage)
