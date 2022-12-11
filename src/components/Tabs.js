import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

const Tabs = ({ navigation, routeName }) => {
  const [selected, setselected] = useState(routeName);
  const tabs = ["Home", "Stories"];

  return (
    <View style={styles.container}>
      {tabs &&
        tabs.map((tab, i) => (
          <TouchableOpacity
         
            key={i}
            onPress={() => {
              navigation.navigate(tab);
            }}
          >
            <Text style={tab == selected ? styles.selectedTab : styles.tab}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingBottom: 8,
  },
  tab: {
    color: "#5f6771",
    fontWeight: "800",
    fontSize: 14,
    textAlign: "center",
    width:100,
    
  },
  selectedTab: {
    color: "#1877f2",
    fontWeight: "800",
    fontSize: 14,
    borderBottomColor: "#1877f2",
    borderBottomWidth: 2,
    textAlign: "center",
    width:100,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
    //paddingBottom:8
  },
});
