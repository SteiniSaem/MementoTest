import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import ListItem from "../components/ListItem";
import { useSelector } from "react-redux";

const ListScreen = props => {
  const items = useSelector(state => state.items.items);
  if (items.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          No items in the list yet, start adding items by pressing the plus sign
          in the top right corner
        </Text>
      </View>
    );
  }
  const renderListItem = itemData => {
    return (
      <ListItem
        title={itemData.item.title}
        description={itemData.item.description}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Details",
            params: {
              itemId: itemData.item.id
            }
          });
        }}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderListItem}
      />
    </View>
  );
};

ListScreen.navigationOptions = navData => {
  return {
    headerTitle: "List",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName="ios-add"
          onPress={() => {
            navData.navigation.navigate({
              routeName: "NewItem"
            });
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  messageContainer: {
    alignItems: "center",
    margin: 20
  },
  message: {
    textAlign: "center"
  }
});

export default ListScreen;
