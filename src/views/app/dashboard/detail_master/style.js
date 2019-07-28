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
        height: Dimensions.get('window').height
    }
})