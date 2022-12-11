import { StyleSheet } from "react-native";

export default HomeHeaderStyles = StyleSheet.create({
  homeHeaderContainer: {
   
  },
  headerTop:{
    backgroundColor:"white",
    height: 60,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#1877f2",
    fontWeight: "700",
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  accountIcon: {
    color: "#1877f2",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2
  },
});
