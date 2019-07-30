import {
    StyleSheet,
    Dimensions
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#fff'
    },
    btn: {
        margin: 20
    },
    logocontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        fontSize: 20,
        fontFamily: "montserrat-regular",
        color: "white",
        textTransform: 'uppercase',
        letterSpacing: 4
    },
    topcontainer: {
        borderBottomEndRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 1,
        shadowRadius: 4.5,
        elevation: 7,
        left: -20,
        height: 125
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 1,
        shadowRadius: 4.5,
        elevation: 7,
    },
    navcontainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: 'flex-start',
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderColor: "#e5e5e5",
        borderRadius: 100,
    },
    username: {
        marginVertical: 5,
        textTransform: 'capitalize',
        fontSize: 20,
        fontFamily: 'montserrat-regular'
    },
    avatarcontainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    listcontainer: {
        height:height-245
        // marginBottom: 130,
        // marginTop: -220,
    },
    hello: {
        fontFamily: 'montserrat-regular',
        textTransform: 'uppercase',
        fontSize: 20,
        color: 'white'
    },
    categories: {
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        borderBottomEndRadius: 50, 
        backgroundColor: 'orange', 
        marginTop: -125, 
        height: 165,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 1,
        shadowRadius: 4.5,
        elevation: 5,
    }
})