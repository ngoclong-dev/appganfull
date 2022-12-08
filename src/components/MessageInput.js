import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons, Octicons, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import MyEmojiModal from "./MyEmojiModal";
import MyShareMapViewer from "./MyShareMapViewer";

const MessageInput = ({
  input,
  setInput,
  sendMessage,
  setLocation,
  showMap,
  setShowMap,
}) => {
  const [showEmojiModal, setShowEmojiModal] = useState(false);

  const toggleLocationShare = () => {
    setShowEmojiModal(false);
    Keyboard.dismiss();
    if (showMap) {
      setShowMap(!showMap);
      setLocation("");
    } else {
      setShowMap(!showMap);
    }
  };

  // MapView methods starts
  const mapRef = useRef();
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.watchPositionAsync(
      {
        distanceInterval: 10,
      },
      (location) => {
        mapRef?.current?.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          longitudeDelta: 0.004,
          latitudeDelta: 0,
        });
        setLocation({
          Latitude: location?.coords?.latitude,
          Longitude: location?.coords?.longitude,
        });
      }
    );
  };
  useEffect(() => {
    if (showMap) getCurrentLocation();
  }, [showMap]);
  // MapView methods end

  return (
    <>
      <View
        style={
          showEmojiModal | showMap ? styles.emojiShowFooter : styles.footer
        }
      >
        {showEmojiModal && (
          <MyEmojiModal
            input={input}
            setInput={setInput}
            setShowEmojiModal={setShowEmojiModal}
          />
        )}

        {showMap && (
          <MyShareMapViewer
            mapRef={mapRef}
            toggleLocationShare={toggleLocationShare}
          />
        )}
        <View style={styles.textAreaWrapper}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setShowEmojiModal(!showEmojiModal);
              setShowMap(false);
            }}
            activeOpacity={0.5}
            style={[
              styles.smileybutton,
              { backgroundColor: showEmojiModal ? "orange" : "gray" },
            ]}
          >
            <Octicons name="smiley" size={24} color="white" />
          </TouchableOpacity>
          <TextInput
            placeholder="Message..."
            style={styles.textInput}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <TouchableOpacity
            onPress={toggleLocationShare}
            activeOpacity={0.5}
            style={styles.locationbutton}
          >
            <MaterialIcons name="location-on" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            sendMessage();
            setShowEmojiModal(false);
          }}
          style={styles.button}
        >
          <Ionicons name="ios-send-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 8,
    backgroundColor: "#dbdad7",
    borderTopColor: "white",
    borderTopWidth: 1,
  },
  emojiShowFooter: {
    flexDirection: "row",
    width: "100%",
    padding: 8,
    backgroundColor: "#dbdad7",
    borderTopColor: "white",
    borderTopWidth: 1,
    height: 386,
    alignItems: "flex-start",
  },

  textInput: {
    color: "black",
    fontSize: 20,
    flex: 1,

    alignItems: "center",
  },
  textAreaWrapper: {
    flexDirection: "row",
    bottom: 0,
    height: 50,
    flex: 1,
    marginRight: 5,
    borderColor: "transparent",
    backgroundColor: "white",
    padding: 10,
    color: "black",
    borderRadius: 25,
    fontSize: 16,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 25,
  },
  smileybutton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    top: 3,
  },
  locationbutton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 8,
    top: 2,
  },
});
