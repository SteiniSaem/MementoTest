import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Thumbnail from "../components/Thumbnail";

const ListItem = props => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={props.onSelect}>
      <Thumbnail>{props.title.trim().charAt(0)}</Thumbnail>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15
  },

  itemInfo: {
    width: "80%",
    marginLeft: 10
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  }
});

export default ListItem;
