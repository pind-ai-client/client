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
        backgroundColor: '#1c1c26'
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
        color: "grey",
        textTransform: 'uppercase',
        letterSpacing: 4
    },
    topcontainer: {
        backgroundColor: "white",
        borderBottomEndRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.6,
        elevation: 4
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
        marginBottom: 50
    },
    hello: {
        fontFamily: 'montserrat-regular',
        textTransform: 'uppercase',
        fontSize: 20
    }
})