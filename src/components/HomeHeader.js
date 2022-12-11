import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeHeaderStyles from "../styles/HomeHeaderStyles";
import Tabs from "./Tabs";

const HomeHeader = () => {
  const navigation=useNavigation()
  const route=useRoute()
  const title="HUCE CHAT"
  return (
    <>
    <View style={HomeHeaderStyles.homeHeaderContainer}>
      <View style={HomeHeaderStyles.headerTop}>
      <Text style={HomeHeaderStyles.title}>{title}</Text>
      {/* <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
        <MaterialCommunityIcons
          name="account-settings"
          size={32}
          style={HomeHeaderStyles.accountIcon}
        />
      </TouchableOpacity> */}
      </View>
      <Tabs navigation={navigation} routeName={route?.name}/>
    </View>
    
    </>
  );
};

export default HomeHeader;
