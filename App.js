import React from "react";
import ListNavigator from "./navigation/ListNavigator";
import { Provider } from "react-redux";
import listReducer from "./store/reducers/list";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  items: listReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ListNavigator />
    </Provider>
  );
}
