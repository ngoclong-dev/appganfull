import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ChatListItemStyles from "../styles/ChatListItemStyles";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const StoryListItem = ({ item }) => {
  const navigation = useNavigation();
  const [contact, setContact] = useState();

  useEffect(() => {
    const getContact = async () => {
      const docRefContact = doc(db, "users", item.data.senderId);
      const docSnapContact = await getDoc(docRefContact);
      setContact(docSnapContact.data());
    };
    getContact();
  }, []);

  const getStoryTime = () => {
    const lastTime = "";
    if (item.data?.timestamp) {
      const lastMsg = new Date(item.data?.timestamp?.seconds * 1000);
      return lastMsg
        .toLocaleTimeString()
        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    }
    return lastTime;
  };

  return (
    <TouchableOpacity
      style={ChatListItemStyles.chatListItemWrapper}
      onPress={() =>
        navigation.navigate("StoryDetail", {
          contact: contact,
          data: item?.data,
        })
      }
    >
      <TouchableOpacity style={ChatListItemStyles.imageContainer}
      onPress={() =>
        navigation.navigate("StoryDetail", {
          contact: contact,
          data: item?.data,
        })
      }
      >
        <Image
          alt="ProfilePhoto"
          style={ChatListItemStyles.image}
          source={{
            uri: item?.data?.url
              ? item?.data?.url
              : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
          }}
        />
      </TouchableOpacity>
      <View style={ChatListItemStyles.titleWrapper}>
        <Text style={ChatListItemStyles.title}>
          {contact && contact?.firstName + " " + contact?.lastName}
        </Text>
      </View>
      <View style={ChatListItemStyles.dateWrapper}>
        <Text style={ChatListItemStyles.dateText}>{getStoryTime()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoryListItem;

const styles = StyleSheet.create({});
