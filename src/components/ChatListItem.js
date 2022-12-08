import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../utils/store";
import { db } from "../utils/firebase";
import ChatListItemStyles from "../styles/ChatListItemStyles";
import { useNavigation } from "@react-navigation/native";

const ChatListItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // to show last message
  const chatMessagesList = useSelector((state) => state?.messages[item.id])


  const [lastMessage, setLastMessage] = useState();
  useEffect(() => {
    const lastMsgIndex =
      chatMessagesList && chatMessagesList.length > 1
        ? chatMessagesList.length - 1
        : 0;
    setLastMessage(chatMessagesList?.[lastMsgIndex]?.data);
  }, [chatMessagesList]);
 

  // Set messages of this chat according id
  useEffect(() => {
    const q = query(
      collection(db, `chats/${item?.id}/messages`),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allItems = [];
      querySnapshot.forEach((doc) => {
        allItems.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      dispatch(setMessages({ id: item.id, messages: allItems }));
    });

    () => unsubscribe();
  }, [db]);

  // Get contact info to show on list
  useEffect(() => {
    const getContactInfo = async () => {
      const docRefMembers = doc(db, "chats", item?.id);
      const docSnapMembers = await getDoc(docRefMembers);
      const contactId = docSnapMembers
        ?.data()
        .members.filter((item) => item !== user.id)[0];
      const docRefContact = doc(db, "users", contactId);
      const docSnapContact = await getDoc(docRefContact);
      setContact(docSnapContact.data());
    };
    getContactInfo();
  }, []);

  const [contact, setContact] = useState();

  const getLastMessageTime = () => {
    const lastTime = "";
    if (lastMessage?.timestamp) {
      const ToDay = new Date();
      const lastMsg = new Date(lastMessage?.timestamp?.seconds * 1000);
      const oneDayAsSeconds = 86400000;
      if (ToDay - lastMsg > oneDayAsSeconds) {
        // if last message is 24 hours ago show date
        return lastMsg.toLocaleDateString();
      } else {
        // if last message is in 24 hours show hours
        return lastMsg
          .toLocaleTimeString()
          .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
      }
    }
    return lastTime;
  };

  const goToChat = () => {
    navigation.navigate("Chat", { messageId: item.id,contactId:contact?.id });
  };

  return (
    <TouchableOpacity
      style={ChatListItemStyles.chatListItemWrapper}
      onPress={goToChat}
    >
      <TouchableOpacity style={ChatListItemStyles.imageContainer}>
        <Image
          alt="ProfilePhoto"
          style={ChatListItemStyles.image}
          source={{
            uri: contact?.photoURL
              ? contact?.photoURL
              : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
          }}
        />
      </TouchableOpacity>
      <View style={ChatListItemStyles.titleWrapper}>
        <Text style={ChatListItemStyles.title}>
          {contact && contact?.firstName + " " + contact?.lastName}
        </Text>
        <Text style={ChatListItemStyles.lastMsg}>
          {lastMessage?.text}
        </Text>
      </View>
      <View style={ChatListItemStyles.dateWrapper}>
        <Text style={ChatListItemStyles.dateText}>{getLastMessageTime()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
