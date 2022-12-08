import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatLocationItem from "./ChatLocationItem";

const ChatItem = ({ item, contactId }) => {

  const sender = item.data.senderId;
  const msgDate = new Date(item?.data?.timestamp?.seconds * 1000);
  const time = msgDate
    ?.toLocaleTimeString()
    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");



  return (
    <View
      style={
        sender === contactId
          ? styles.bubbleContainerLeft
          : styles.bubbleContainerRight
      }
    >
      <Text
        style={
          sender === contactId ? styles.chatTextLeft : styles.chatTextRight
        }
      >
        {item?.data?.text}
      </Text>
      <Text
        style={
          sender === contactId
            ? styles.chatTextTimeLeft
            : styles.chatTextTimeRight
        }
      >
        {time && time}
      </Text>
      {
        item?.data?.location &&
        <ChatLocationItem location={item?.data?.location}/>
      }
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  bubbleContainerLeft: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    maxWidth: "70%",
    minWidth: 80,
    left: 8,
    marginBottom: 4,
    marginTop: 4,
    alignSelf: "flex-start",
    borderColor: "#e8e6e6",
  },
  chatTextLeft: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 10,
    fontSize: 16,
    marginBottom: -4,
    color: "black",
    fontWeight: "400",
  },
  chatTextRight: {
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 4,
    marginBottom: -4,
    color: "black",
    fontWeight: "400",
  },
  chatTextTimeLeft: {
    fontSize: 10,
    alignSelf: "flex-end",
    right: 8,
    top: -6,
    color: "black",
  },
  chatTextTimeRight: {
    fontSize: 10,
    alignSelf: "flex-end",
    right: 8,
    top: -6,
    color: "black",
  },
  bubbleContainerRight: {
    backgroundColor: "#f3eae8",
    borderWidth: 0.5,
    borderRadius: 8,
    maxWidth: "70%",
    minWidth: 80,
    right: 8,
    alignSelf: "flex-end",
    marginBottom: 4,
    marginTop: 4,
    borderColor: "#dbd4d3",
  },
});
