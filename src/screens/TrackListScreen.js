import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const TrackListScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>TrackList Screen</Text>
      <Button
        title="Go to Track details screen"
        onPress={() => {
          navigation.navigate("TrackDetails");
        }}
      ></Button>
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
