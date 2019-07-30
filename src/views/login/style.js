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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: Dimensions.get('window').height
    }
})