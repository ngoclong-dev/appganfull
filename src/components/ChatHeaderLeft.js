import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ChatListItemStyles from "../styles/ChatListItemStyles";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const ChatHeaderLeft = ({ contactId }) => {
  const [chatContact, setChatContact] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const setMyContact = async () => {
      const docRefContact = doc(db, "users", contactId);
      const docSnapContact = await getDoc(docRefContact);
      setChatContact(docSnapContact?.data());
    };

    setMyContact();
  }, []);

  // contact avatar ekle
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="md-arrow-back" size={32} color="black" />
      </TouchableOpacity>
      {
        <View style={styles.chatHeaderContainer}>
          <TouchableOpacity
            style={[
              ChatListItemStyles.imageContainer,
              styles.headerImageWrapper,
            ]}
          >
            <Image
              alt="ProfilePhoto"
              style={ChatListItemStyles.image}
              source={{
                uri: chatContact?.photoURL
                  ? chatContact?.photoURL
                  : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
              }}
            />
          </TouchableOpacity>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>
              {chatContact && chatContact?.firstName + " " + chatContact?.lastName}
            </Text>
          </View>
        </View>
      }
    </>
  );
};

export default ChatHeaderLeft;

const styles = StyleSheet.create({
  chatHeaderContainer: {
    height: 60,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  headerImageWrapper: {
    borderRadius: 25,
    height: 50,
    width: 50,
    marginLeft: 8,
  },
  nameWrapper: {
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "black",
    letterSpacing: 0.6,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
});
