import { StyleSheet } from "react-native";

export default SignStyles = StyleSheet.create({
    ProfileScreenContainer:{
        flex:1,
        marginTop:16
    },
    indicator:{
        position:"absolute",
        alignSelf:"center",
        top:16
    },
    disableButton:{
        backgroundColor:"#babab8",
    },
    logoutButton:{
        position:"absolute",
        backgroundColor:"red",
        bottom:32,
        alignSelf:"center",


    }, imageContainer: {
        overflow: 'hidden',
        borderRadius: 20,
        height:100,
        width:100,
        alignSelf:"center",
        marginBottom:16
      },
      image: {
        width: '100%',
        height: '100%',
      },
})