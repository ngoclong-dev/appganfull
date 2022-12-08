import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import ContactListScreen from "../screens/ContactListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StoriesScreen from "../screens/StoriesScreen";
import StoryDetailScreen from "../screens/StoryDetailScreen";
import UploadingImageViewerScreen from "../screens/UploadingImageViewerScreen";

const Stack = createNativeStackNavigator();
const HomeNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Contacts" component={ContactListScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Stories"
          component={StoriesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StoryDetail"
          component={StoryDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UploadImage"
          component={UploadingImageViewerScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNav;

const styles = StyleSheet.create({});
