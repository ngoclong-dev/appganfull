import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const OpenContactButton = () => {
  const navigation=useNavigation()
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={()=>navigation.navigate('Contacts')}>
      <Entypo name="message" size={42} style={styles.pluscircleo} />
    </TouchableOpacity>
  );
};

export default OpenContactButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: "orange",
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  pluscircleo: {
    color: "white",
  },
});
