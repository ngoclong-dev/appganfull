import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import ChatListItemStyles from "../styles/ChatListItemStyles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ContactListItem = ({ item }) => {
  const navigation=useNavigation()

  const contactId=item?.data?.id
  const user = useSelector((state) => state.auth.user);
  const chat = useSelector((state) => state?.chatList).filter(m=>m?.data?.members?.includes(contactId))[0]
 
  const goToChat = () =>{
      navigation.navigate("Chat", { messageId: chat?.id, contactId });
  }


  return (
    <TouchableOpacity style={ChatListItemStyles.chatListItemWrapper}
    onPress={goToChat}
    >
      <TouchableOpacity style={ChatListItemStyles.imageContainer}>
        <Image
          alt="ProfilePhoto"
          style={ChatListItemStyles.image}
          source={{
            uri: item?.data?.photoURL
              ? item?.data?.photoURL
              : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
          }}
        />
      </TouchableOpacity>
      <View style={ChatListItemStyles.titleWrapper}>
        <Text style={ChatListItemStyles.title}>
          {item?.data && item?.data?.firstName + " " + item?.data?.lastName}
        </Text>
        <Text style={ChatListItemStyles.lastMsg}>{item?.data?.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({});
