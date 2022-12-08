import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
const ShareStoryButton = () => {
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.cancelled) {
      navigation.navigate("UploadImage", { image: result.uri });
    }
  };

  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={pickImage}>
      <Ionicons name="ios-image" size={42} style={styles.pluscircleo} />
    </TouchableOpacity>
  );
};

export default ShareStoryButton;

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
