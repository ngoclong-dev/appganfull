import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ChatListItemStyles from "../styles/ChatListItemStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
const StoryDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contact, data } = route?.params;

  return (
    <SafeAreaView style={styles.storyDetailContainer}>
      <View style={[ChatListItemStyles.chatListItemWrapper, styles.header]}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="md-arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View style={ChatListItemStyles.imageContainer}>
          <Image
            alt="ProfilePhoto"
            style={ChatListItemStyles.image}
            source={{
              uri: contact?.photoURL
                ? contact?.photoURL
                : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
            }}
          />
        </View>
        <View style={ChatListItemStyles.titleWrapper}>
          <Text style={[ChatListItemStyles.title, styles.storyDetailOwnerName]}>
            {contact?.firstName + " " + contact?.lastName}
          </Text>
        </View>
      </View>
      <View style={styles.storyImageArea}>
          <Image
            alt="ProfilePhoto"
            resizeMode="contain"
            style={ChatListItemStyles.image}
            source={{
              uri: data?.url
                ? data?.url
                : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
            }}
          />
      </View>
    </SafeAreaView>
  );
};

export default StoryDetailScreen;

const styles = StyleSheet.create({
  storyDetailContainer: {
    backgroundColor: "black",
    flex: 1,
  },
  backIcon: {
    alignSelf: "center",
  },
  storyDetailOwnerName: {
    color: "white",
  },
  header: {
    backgroundColor: "black",
  },
  storyImageArea: {
    backgroundColor: "black",
    flex: 1,
  
  },
});
