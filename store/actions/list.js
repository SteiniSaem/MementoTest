export const ADD_TO_LIST = "ADD_TO_LIST";
export const REMOVE_FROM_LIST = "REMOVE_FROM_LIST";

export const addToList = (title, description) => {
  return {
    type: ADD_TO_LIST,
    itemData: { title: title, description: description }
  };
};

export const removeFromList = id => {
  return {
    type: REMOVE_FROM_LIST,
    itemId: id
  };
};
