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
    },
    avatar: {
        width: 120,
        height: 120,
        borderColor: "#e5e5e5",
        borderRadius: 100,
    },
    formInput: {
        height: 40,
        backgroundColor: "#fff",
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        borderRadius: 10,
    },
    formContainer: {
        marginBottom: 20
    }
})