import { StyleSheet } from "react-native";

export default ChatListItemStyles = StyleSheet.create({
  chatListItemWrapper: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor:"gray",
    borderBottomWidth:0.6
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 30,
    height: 60,
    width: 60,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 30,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  titleWrapper: {
    marginLeft: 16,
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: -0.2,

  },
  lastMsg: {
    color: "gray",
    fontSize: 12,
    fontWeight: "400",
  },
  dateWrapper: {
    flex: 1,
    alignItems: "flex-end",
  },
  dateText: {
    color: "gray",
    paddingRight: 8,
    fontSize: 12,
    fontWeight: "600",
  },
});
