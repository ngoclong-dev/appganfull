import { Button, FlatList, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../components/HomeHeader";
import { useDispatch, useSelector } from "react-redux";
import { setChatList } from "../utils/store";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import ChatListItem from "../components/ChatListItem";
import OpenContactButton from "../components/OpenContactButton";
const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const chatList = useSelector((state) => state?.chatList);

  const dispatch = useDispatch();

  useEffect(() => {
  
    const q = query(collection(db, `chats`),where('members','array-contains-any',[user.id]));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allItems = [];
    
      querySnapshot.forEach((doc) => {
        allItems.push({
          id: doc.id,
          data: doc.data(),
        });
      });
     
      dispatch(setChatList(allItems));
    });

    () => unsubscribe();
  }, [user]);
  
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <FlatList
      showsHorizontalScrollIndicator={false}
      data={chatList}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => <ChatListItem item={item} index={index} />}
    />
    <OpenContactButton/>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  }
});
