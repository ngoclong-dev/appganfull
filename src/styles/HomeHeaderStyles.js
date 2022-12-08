import { StyleSheet } from "react-native";

export default HomeHeaderStyles = StyleSheet.create({
  homeHeaderContainer: {
   
  },
  headerTop:{
    backgroundColor: "orange",
    height: 60,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  accountIcon: {
    color: "white",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2
  },
});
