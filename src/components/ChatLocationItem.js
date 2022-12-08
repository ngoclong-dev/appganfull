import { View, Text, StyleSheet } from "react-native";
import React, { useRef } from "react";
import MapView, { Marker } from "react-native-maps";

const ChatLocationItem = ({ location }) => {
  const mapRef = useRef();
  return (
    <View>
      <View style={styles.mapViewWrapper} pointerEvents="none">
        <MapView
          showsMyLocationButton={false}
          mapType="standard"
          initialRegion={{
            latitude: location?.Latitude,
            longitude: location?.Longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={mapRef}
          style={styles.map}
          loadingEnabled={true}
          minZoomLevel={15}
        >
          <Marker
            coordinate={{
              latitude: location?.Latitude,
              longitude: location?.Longitude,
            }}
          />
        </MapView>
      </View>
    </View>
  );
};

export default ChatLocationItem;

const styles = StyleSheet.create({
  mapViewWrapper: {
    height: 200,
    width: "100%",
    minWidth:200
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
