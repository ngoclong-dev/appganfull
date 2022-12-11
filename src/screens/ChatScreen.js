import { FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ChatHeaderLeft from "../components/ChatHeaderLeft";
import ChatItem from "../components/ChatItem";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import StartNewConversationArea from "../components/StartNewConversationArea";
import MessageInput from "../components/MessageInput";
import { db } from "../utils/firebase";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { setMessages } from "../utils/store";
const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const route = useRoute();
  const { contactId } = route?.params;
  const [messageId, setMessageId] = useState(route?.params?.messageId);
  const [location, setLocation] = useState("");
  const chatMessagesList = useSelector((state) => state?.messages[messageId]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#1877f2",
      },
      headerLeft: () => <ChatHeaderLeft contactId={contactId} />,
    });
  });
  const [input, setInput] = useState("");
  const sendMessage = async () => {
    if (input.trim() === "" && location === "") return;

    //xử lý tạo trò chuyện/gửi tin nhắn
    if (chatMessagesList === undefined) {
      // xử lý tạo trò chuyện + gửi tin nhắn

      const docRef = await addDoc(collection(db, `chats`), {
        members: [user.id, contactId],
      });

      const docRef2 = await addDoc(
        collection(db, `chats/${docRef?.id}/messages`),
        {
          timestamp: serverTimestamp(),
          type: "text",
          text: input,
          senderId: user.id,
        }
      );

      // Thêm tin nhắn mới vào danh sách tin nhắn và cập nhật id tin nhắn của cuộc trò chuyện này

      // Sau khi cập nhật: danh sách thông báo xuất hiện và tiêu đề thay đổi

      const docSnap = await getDoc(docRef2);
      dispatch(
        setMessages({
          messages: [{ data: docSnap?.data(), id: docRef2?.id }],
          id: docRef?.id,
        })
      );
      setMessageId(docRef?.id);
    } else {
      // xử lý gửi tin nhắn

      const docRef = await addDoc(
        collection(db, `chats/${messageId}/messages`),
        {
          timestamp: serverTimestamp(),
          type: "text",
          text: input,
          senderId: user.id,
          location: location,
        }
      );
    }
    setInput("");
    setLocation("");
    setShowMap(false);
  };

  const flatListRef = useRef();
  const [showMap, setShowMap] = useState(false);
  return (
    <>
      {chatMessagesList === undefined ? (
        <StartNewConversationArea />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: "#dbdad7" }}
          data={chatMessagesList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ChatItem item={item} index={index} contactId={contactId} />
          )}
          ref={flatListRef}
          onContentSizeChange={() => {
            flatListRef.current.scrollToEnd();
          }}
        />
      )}
      <MessageInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        location={location}
        setLocation={setLocation}
        showMap={showMap}
        setShowMap={setShowMap}
      />
    </>
  );
};

export default ChatScreen;
