import { StyleSheet, Text, View } from "react-native";
import React from "react";

const StartNewConversationArea = () => {
  return (
    <View style={styles.bg}>
      <Text style={styles.text}>You are creating a new conversation</Text>
    </View>
  );
};

export default StartNewConversationArea;

const styles = StyleSheet.create({
    bg:{
        flex:1
      },
      text:{
        backgroundColor:"black",
        textAlign:"center",
        color:"white",
        padding:8,
        margin:16,
        borderRadius:16
      }
});
