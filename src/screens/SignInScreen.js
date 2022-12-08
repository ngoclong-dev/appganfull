import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../utils/firebase";

import { doc, getDoc } from "firebase/firestore";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signIn } from "../utils/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignStyles from "../styles/SignStyles";
const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const initialState = {
    email: "",
    password: "",
  };
  const [userInfo, setuserInfo] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleChange = (e, name) => {
    setuserInfo((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };
  const submitUser = async () => {
    handleSignIn(userInfo);
  };

  const handleSignIn = (data) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (response) => {
        const userDoc = doc(db, "users", response.user.uid);
        const userRef = await getDoc(userDoc);
        if (userRef.exists()) {
          setLoading(false);
          dispatch(signIn(userRef.data()));
          submitUserToLocal({ email: data.email, password: data.password });
        }
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };

  const submitUserToLocal = async (data) => {
    const backupinfo = { ...data };
    const jsonValue = JSON.stringify(backupinfo);
    await AsyncStorage.setItem("@user", jsonValue);
  };

  return (
    <View style={SignStyles.container}>
      {loading && <ActivityIndicator size="large" style={SignStyles.loading} />}
      <Text style={SignStyles.APPtitle}>HUCE CHAT</Text>
      <Text style={SignStyles.title}>Đăng nhập</Text>

      <TextInput
        style={SignStyles.textInput}
        placeholder="Email"
        value={userInfo?.email}
        onChangeText={(e) => handleChange(e, "email")}
      />
      <TextInput
        style={SignStyles.textInput}
        placeholder="Mật khẩu"
        secureTextEntry
        value={userInfo?.password}
        onChangeText={(e) => handleChange(e, "password")}
      />

      <TouchableOpacity
        style={{
          ...SignStyles.submitbutton,
          ...(loading ? SignStyles.disableButton : SignStyles.enableButton),
        }}
        onPress={submitUser}
        disabled={loading}
      >
        <Text style={SignStyles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={SignStyles.askText}>Đăng ký tài khoản mới</Text>
      <TouchableOpacity
        disabled={loading}
        style={{
          ...SignStyles.submitbutton,
          ...(loading ? SignStyles.disableButton : SignStyles.enableButton2),
        }}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={SignStyles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
