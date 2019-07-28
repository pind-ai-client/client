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
        height: Dimensions.get('window').height,
        backgroundColor: '#e5e5e5'
    },
    btn: {
        margin: 20
    },
    logocontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: -35
    },
    logo: {
        fontSize: 20,
        fontFamily: "montserrat-regular",
        color: "grey",
        textTransform: 'uppercase',
        letterSpacing: 4
    },
    topcontainer: {
        backgroundColor: "#f2f2f2",
    },
    navcontainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    avatar: {
        width: 120,
        height: 120,
        borderColor: "#a9a9a9",
        borderWidth: 10,
        borderRadius: 100
    },
    username: {
        marginVertical: 5,
        textTransform: 'capitalize',
        fontSize: 20,
        fontFamily: 'montserrat-regular'
    },
    avatarcontainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    listcontainer: {
        padding: 20
    }
})