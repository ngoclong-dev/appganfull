import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import { updateUser } from "../utils/store";
import SignStyles from "../styles/SignStyles";
import UserSettingsStyles from "../styles/UserSettingsStyles";
import ProfilePhotoPicker from "./ProfilePhotoPicker";
import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [userInfo, setuserInfo] = useState(user);
  const [imageChanged, setImageChanged] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleChange = (e, name) => {
    setuserInfo((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    let newUrl = "";
    const oldUrl = userInfo.photoURL;
    if (imageChanged) {
      newUrl = await uploadImageAsync(userInfo.photoURL);
    }

    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, {
      ...userInfo,
      photoURL: newUrl != "" ? newUrl : oldUrl,
    })
      .then((response) => {
        dispatch(
          updateUser({ ...userInfo, photoURL: newUrl != "" ? newUrl : oldUrl })
        );
        alert("Profile Updated Successfully");
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    return await getDownloadURL(fileRef);
  }

  return (
    <View>
      <ProfilePhotoPicker
        userInfo={userInfo}
        setuserInfo={setuserInfo}
        setImageChanged={setImageChanged}
      />
      <TextInput
        style={[
          SignStyles.textInput,
          loading && UserSettingsStyles.disableButton,
        ]}
        placeholder="First Name"
        value={userInfo?.firstName}
        onChangeText={(e) => handleChange(e, "firstName")}
      />
      <TextInput
        style={[
          SignStyles.textInput,
          loading && UserSettingsStyles.disableButton,
        ]}
        placeholder="Last Name"
        value={userInfo?.lastName}
        onChangeText={(e) => handleChange(e, "lastName")}
      />
      <TouchableOpacity
        style={{
          ...SignStyles.submitbutton,
          ...(loading ? SignStyles.disableButton : SignStyles.enableButton),
        }}
        onPress={handleSaveProfile}
        disabled={loading}
      >
        <Text style={SignStyles.buttonText}>SAVE</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" style={UserSettingsStyles.indicator} />
      )}
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({});
