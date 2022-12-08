import { FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { HeaderBackButton } from "@react-navigation/elements";
import ContactListItem from "../components/ContactListItem";
import { useDispatch, useSelector } from "react-redux";
import { setContactList } from "../utils/store";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
const ContactListScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  // Header styles
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "orange" },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white",
      },
      headerTintColor: "#fff",
      headerShown: true,
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      ),
    });
  });

  const contactList = useSelector((state) => state?.contactList);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, `users`), where("id", "!=", user.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allItems = [];
      querySnapshot.forEach((doc) => {
        allItems.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      dispatch(setContactList(allItems));
    });

    () => unsubscribe();
  }, []);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={contactList}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <ContactListItem item={item} index={index} />
      )}
    />
  );
};

export default ContactListScreen;

const styles = StyleSheet.create({});
