import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EmojiModal from "react-native-emoji-modal";
const MyEmojiModal = ({ input, setInput, setShowEmojiModal }) => {
  return (
    <View style={styles.emojiModalWrapper}>
      <EmojiModal
        emojiSize={42}
        containerStyle={styles.emojiModal}
        onEmojiSelected={(emoji) => {
          setInput(input + " " + emoji);
        }}
        onPressOutside={() => setShowEmojiModal(!showEmojiModal)}
      />
    </View>
  );
};

export default MyEmojiModal;

const styles = StyleSheet.create({
  emojiModalWrapper: {
    position: "absolute",
    bottom: 4,
    left: 8,
    width: "100%",
  },
  emojiModal: {
    borderRadius: 0,
    width: "100%",
  },
});
