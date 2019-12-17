import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Thumbnail from "../components/Thumbnail";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { removeFromList } from "../store/actions/list";

const ItemDetailScreen = props => {
  const items = useSelector(state => state.items.items);
  const itemId = props.navigation.getParam("itemId");
  const selectedItem = items.find(item => item.id === itemId);
  const dispatch = useDispatch();

  const deleteHandler = useCallback(() => {
    props.navigation.goBack();
    dispatch(removeFromList(itemId));
  }, [dispatch, itemId]);

  useEffect(() => {
    props.navigation.setParams({ delete: deleteHandler });
  }, [deleteHandler]);

  if (!selectedItem) {
    return <View></View>;
  }

  return (
    <View style={styles.screen}>
      <Thumbnail style={styles.thumbnail}>
        {selectedItem.title.trim().charAt(0)}
      </Thumbnail>
      <Text style={styles.title}>{selectedItem.title}</Text>
      <View style={styles.desciptionContainer}>
        <Text style={styles.desciptionTitle}>Description</Text>
        <Text>{selectedItem.description}</Text>
      </View>
    </View>
  );
};

ItemDetailScreen.navigationOptions = navData => {
  const deleteFn = navData.navigation.getParam("delete");
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Delete" onPress={deleteFn} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  thumbnail: {
    marginVertical: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  desciptionContainer: {
    marginTop: 30,
    marginBottom: 50,
    width: "90%"
  },

  desciptionTitle: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16
  }
});

export default ItemDetailScreen;
