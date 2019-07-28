import React from 'react'
import { View, Image } from 'react-native'

const EditImage = ({navigation}) => {
    let uri = navigation.getParam('uri')
    console.log(uri);

    function _renderImage() {
        return (
            <View style={{marginVertical: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    source={{uri: uri}}
                    style={{width: 400, height: 533, resizeMode:'contain', borderRadius: 20}}/>
            </View>
        )
    }

    return (
        <View style={{flex: 1, justifyContent:'center'}}>
            {_renderImage()}
        </View>
    )
}

export default EditImage
