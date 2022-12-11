import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../utils/firebase";

import { doc, getDoc } from "firebase/firestore";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signIn } from "../utils/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignStyles from "../styles/SignStyles";
import UserInfo from "../components/UserInfo";
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

    // veryemail
    const[email1,onChangEmail] = useState('');
    const[isValidEmail,setValidEmail] = useState(true);
    const[check,setCheck] = useState(true);

    const verifyEmail = (email) =>{
      if(!email) return true
      let regex = new RegExp(/([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/);
  
      if(regex.test(email)){  // todo
        return true;
  
      }
      return false
    }


    const checkTextInput = () => {
      
      if(!userInfo.email&&!userInfo.password)
      {
        Alert.alert(
          "Vui lòng nhập email và mật khẩu !",
          "Email và mật khẩu đang trống",
          [
            {
              text: "Đồng ý",
            }
          ]
        );
   
        return;
  
      }
      else
      {
        submitUser()
      }

    }
   
  

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
        Alert.alert(
          "Cảnh báo",
          "Email hoặc mật khẩu sai",
          [
            {
              text: "Thoát",
              style: "cancel"
            }
          ]
        );
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

        style={SignStyles.textInput1}
        placeholder="Email"
        // value={userInfo?.email}
        // onChangeText={(e) => handleChange(e, "email")}

        onChangeText={(text)=>
          {
            onChangEmail(text);
            const isvalid = verifyEmail(text);
            isvalid? setValidEmail(true):setValidEmail(false)
            handleChange(text,"email")


          }
    
        }

        // value={userInfo?.email}
        value={email1}


      />

      <Text style={{fontSize:10,color:'red',marginLeft: 32,}}>{isValidEmail?'':'Email không hợp lệ!'} </Text>

      <TextInput
        style={SignStyles.textInput}
        placeholder="Mật khẩu"
        secureTextEntry
        value={userInfo?.password}
        
        onChangeText={(e) => handleChange(e, "password")}

        // onBlur={() => emailValidator()}

      />
          {/* <Text style={styles.error}>{state.emailError}</Text> */}

      <TouchableOpacity
        style={{
          ...SignStyles.submitbutton,
          ...(loading ? SignStyles.disableButton : SignStyles.enableButton),
        }}
        onPress={checkTextInput}
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
