import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Thumbnail = props => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: Colors.primary,
    borderRadius: 10
  },

  number: {
    margin: 10,
    fontSize: 40,
    color: Colors.primary
  }
});

export default Thumbnail;
