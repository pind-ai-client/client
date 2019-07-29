import {
    StyleSheet
} from 'react-native'

export default StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop : 50
        
    },
    headerContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 5
    },
    justify: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    oneContainer: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',  
    },
    itemList: {
        height: 100
    }
})