import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AutoLoginLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Đang đăng nhập, vui lòng đợi ...</Text>
      <ActivityIndicator size="large" style={styles.loading} />
    </View>
  )
}

export default AutoLoginLoadingScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    loading:{
        marginTop:8
    }
})