import React from 'react'
import { View, Text, Image, ActivityIndicator, Button } from 'react-native'

import { connect } from 'react-redux'

const EditImage = ({navigation, isLoading, error}) => {
    let uri = navigation.getParam('uri')
    console.log(uri);

    function _renderImage() {
        return (
            <View style={{marginVertical: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    source={{uri: uri}}
                    style={{width: 280, height: 373.1, resizeMode:'contain', borderRadius: 20}}/>
                {
                    isLoading 
                    ? <View>
                        <Text>Loading...</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View> 
                    : error === undefined
                        ? <Text>Image Is Ok</Text>
                        : <View>
                            <Text>Image cannot be processed</Text>
                            <Text>Please take the picture according to the guide line</Text>
                            <Button title="Take another picture" onPress={() => navigation.navigate('camera')}/>
                        </View>
                }
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
