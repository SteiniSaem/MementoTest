import { ADD_TO_LIST } from "../actions/list/";
import Item from "../../models/item";
import { REMOVE_FROM_LIST } from "../actions/list";

const initialState = {
  items: []
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_LIST:
      const newItem = new Item(
        new Date().toString(),
        action.itemData.title,
        action.itemData.description
      );
      return { items: state.items.concat(newItem) };
    case REMOVE_FROM_LIST:
      const selectedItem = state.items.find(item => item.id === action.itemId);
      const updatedItems = [...state.items].filter(
        item => item != selectedItem
      );
      return {
        items: updatedItems
      };
    default:
      return state;
  }
};

export default listReducer;
