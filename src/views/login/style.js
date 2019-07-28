import {
    StyleSheet,
    Dimensions
} from 'react-native'

export default StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height
    }
})