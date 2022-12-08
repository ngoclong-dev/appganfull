import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SignStyles from "../styles/SignStyles";
import { useDispatch } from "react-redux";
import { logOut } from "../utils/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserSettingsStyles from "../styles/UserSettingsStyles";
const LogoutButton = () => {
  const dispatch = useDispatch();
  const logout = async () => {
    dispatch(logOut());
    await AsyncStorage.removeItem("@user");
  };
  return (
    <TouchableOpacity onPress={logout}
    style={[SignStyles.submitbutton,UserSettingsStyles.logoutButton]}
    >
      <Text style={SignStyles.buttonText}>LOGOUT</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({});
