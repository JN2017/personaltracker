import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Spacer from "./Spacer";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

styles = StyleSheet.create({
  link: {
    color: "blue",
    justifyContent: "center",
  },
});

export default withNavigation(NavLink);
