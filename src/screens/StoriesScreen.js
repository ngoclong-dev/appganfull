import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../components/HomeHeader";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setStoryList } from "../utils/store";
import StoryListItem from "../components/StoryListItem";
import ShareStoryButton from "../components/ShareStoryButton";

const StoriesScreen = () => {
  const storyList = useSelector((state) => state.storyList);
  const dispatch = useDispatch();
  const twentyFourHoursAgo = new Date(new Date() - 86400000);

  useEffect(() => {
    const q = query(
      collection(db, `stories`),
      where("timestamp", ">=", twentyFourHoursAgo),
      orderBy("timestamp","desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allItems = [];
      querySnapshot.forEach((doc) => {
        allItems.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      dispatch(setStoryList(allItems));
    });

    () => unsubscribe();
  }, []);

  // theme
  // deploy pazar
  // readme pazar

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={storyList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <StoryListItem item={item} index={index} />
        )}
      />
      <ShareStoryButton />
    </SafeAreaView>
  );
};

export default StoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
