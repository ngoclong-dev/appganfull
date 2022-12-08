import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import UserSettingsStyles from "../styles/UserSettingsStyles";
const ProfilePhotoPicker = ({ userInfo, setuserInfo,setImageChanged }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setuserInfo({...userInfo,photoURL:result.uri});
      setImageChanged(true)
    }
  };

  return (
    <TouchableOpacity style={UserSettingsStyles.imageContainer} onPress={pickImage}>
      <Image
        alt="ProfilePhoto"
        style={UserSettingsStyles.image}
        source={{uri: userInfo.photoURL ? userInfo.photoURL: "https://cdn-icons-png.flaticon.com/512/147/147142.png"}}
      />
    </TouchableOpacity>
  );
};

export default ProfilePhotoPicker;

const styles = StyleSheet.create({});
