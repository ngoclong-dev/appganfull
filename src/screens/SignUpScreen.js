import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import SignStyles from "../styles/SignStyles";
const SignUpScreen = ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
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
    handleSignUp(userInfo);
    //const jsonValue = JSON.stringify(userInfo);
    //await AsyncStorage.setItem('@user', jsonValue);
    //getUser();
  };

  const handleSignUp = (data) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      async (response) => {
        await setDoc(doc(db, `users`, response.user.uid), {
          email: response.user.email,
          photoURL: "",
          id: response.user.uid,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        setLoading(false);
        alert("Account Created");
        navigation.navigate("SignIn");
      }
    );
  };

  return (
    <View style={SignStyles.container}>
      {loading && <ActivityIndicator size="large" style={SignStyles.loading} />}
      <Text style={SignStyles.APPtitle}>HUCE CHAT</Text>
      <Text style={SignStyles.title}>Đăng ký tài khoản</Text>
      <TextInput
        style={SignStyles.textInput}
        placeholder="Họ"
        value={userInfo?.firstName}
        onChangeText={(e) => handleChange(e, "firstName")}
      />
      <TextInput
        style={SignStyles.textInput}
        placeholder="Tên"
        value={userInfo?.lastName}
        onChangeText={(e) => handleChange(e, "lastName")}
      />
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
      <TextInput
        style={SignStyles.textInput}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        value={userInfo?.confirmPassword}
        onChangeText={(e) => handleChange(e, "confirmPassword")}
      />
      <TouchableOpacity
        style={{
          ...SignStyles.submitbutton2,
          ...(loading ? SignStyles.disableButton : SignStyles.enableButton),
        }}
        onPress={submitUser}
        disabled={loading}
      >
        <Text style={SignStyles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <Text style={SignStyles.askText}>Bạn đã có tài khoản?</Text>
      <TouchableOpacity
        disabled={loading}
        style={{
          ...SignStyles.submitbutton,
          ...(loading ? SignStyles.disableButton : SignStyles.enableButton2),
        }}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={SignStyles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

