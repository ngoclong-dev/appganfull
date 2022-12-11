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

   // veryemail
   const[email1,onChangEmail] = useState('');
   const[isValidEmail,setValidEmail] = useState(true);
   const verifyEmail = (email) =>{
     if(!email) return true
     let regex = new RegExp(/([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/);
 
     if(regex.test(email)){  // todo
       return true;
 
     }
     return false
     
   }


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
        Alert.alert(
          "Đăng ký thành công",
          "Vui lòng đăng nhập",
          [
            {
              text: "Đăng nhập",
             
            }
           
          ]
        );
        navigation.navigate("SignIn");
      }
    );
  };
  const checkTextInput = () => {
    if(userInfo.email==""&&userInfo.password==""&&userInfo.lastName==""&&userInfo.firstName==""&&userInfo.password==""&&userInfo.confirmPassword=="")
      {
        Alert.alert(
          "Cảnh báo !",
          "Vui lòng không để trống",
          [
            {
              text: "Đồng ý",

            }
          
          ]
        );  
        return;
      }
      else if (userInfo.email=="") {
        Alert.alert(
          "Cảnh báo !",
          "Vui lòng nhập Email",
          [
            {
              text: "Đồng ý",
            }
          ]
        );

        return;
      }
      //Check for the Email TextInput
      else if (userInfo.password=="") {
  
        Alert.alert(
          "Cảnh báo !",
          "Nhập mật khẩu",
          [
            {
              text: "Đồng ý",

            }
          
          ]
        );
  
        return;
      }
  
      else if (userInfo.password!=userInfo.confirmPassword) {
  
        Alert.alert(
          "Cảnh báo !",
          "Xác nhận mật khẩu không đúng",
          [
            {
              text: "Đồng ý",

            }
          
          ]
        );
  
        return;
      }
  
      else if (userInfo.password.length<8) {
  
        Alert.alert(
          "Cảnh báo !",
          "Mật khẩu phải trên 8 ký tự",
          [
            {
              text: "Đồng ý",

            }
          
          ]
        );
        return;
      }
      else if (userInfo.lastName.length<2 || userInfo.firstName.length<2) {
  
        Alert.alert(
          "Cảnh báo !",
          "Tên hoặc Họ phải trên 2 ký tự",
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
        handleChange()

      }
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
        onPress={checkTextInput}
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

