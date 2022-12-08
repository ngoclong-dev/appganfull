import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MapView from "react-native-maps";

const MyShareMapViewer = ({ mapRef, toggleLocationShare }) => {
  return (
    <View style={styles.mapViewWrapper}>
      <MapView
        showsMyLocationButton
        mapType="standard"
        showsScale
        showsUserLocation
        ref={mapRef}
        style={styles.map}
        loadingEnabled={true}
        minZoomLevel={15}
      ></MapView>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={toggleLocationShare}
      >
        <Text style={styles.cancelButtonText}>CANCEL</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyShareMapViewer;

const styles = StyleSheet.create({
  mapViewWrapper: {
    position: "absolute",
    top: 64,
    left: 8,
    borderWidth: 0.4,
    borderColor: "black",
    width: Dimensions.get("screen").width - 16,
  },
  map: {
    width: "100%",
    height: 314,
  },
  cancelButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "red",
    borderRadius: 4,
    alignSelf: "center",
  },
  cancelButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
  },
});
