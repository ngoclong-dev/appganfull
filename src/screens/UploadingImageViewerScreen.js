import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatListItemStyles from "../styles/ChatListItemStyles";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db, storage } from "../utils/firebase";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import uuid from "react-native-uuid";
import { addDoc, collection } from "firebase/firestore";
const UploadingImageViewerScreen = () => {
  const user = useSelector((state) => state.auth.user);

  const navigation = useNavigation();
  const route = useRoute();
  const { image } = route?.params;
  const handleShare = () => {
    sendStory();
    navigation.navigate("Stories");
  };

  const sendStory = async () => {
    let newUrl = "";

    newUrl = await uploadImageAsync(image);

    const docRef = await addDoc(collection(db, `stories`), {
      senderId: user.id,
      url: newUrl,
      timestamp: new Date(),
      text: "",
    })
      .then((response) => {
        /*dispatch(
        updateUser({ ...userInfo, photoURL: newUrl != "" ? newUrl : oldUrl })
      );*/
        alert("Story Shared Successfully");
      })
      .catch((err) => {
        alert(err.message);
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
    <SafeAreaView style={styles.container}>
      <Image
        alt="ProfilePhoto"
        resizeMode="contain"
        style={ChatListItemStyles.image}
        source={{
          uri: image
            ? image
            : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
        }}
      />
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareText}>Share</Text>
        <Entypo name="circle-with-plus" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButon}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="cancel" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UploadingImageViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  cancelButon: {
    position: "absolute",
    top: 84,
    left: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  shareButton: {
    flexDirection: "row",
    backgroundColor: "orange",
    position: "absolute",
    bottom: 64,
    right: 32,
    width: 120,
    height: 40,
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  shareText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    marginRight: 8,
  },
});
