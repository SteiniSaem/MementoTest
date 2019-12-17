import React, { useReducer, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Dimensions
} from "react-native";
import Input from "../components/Input";
import { addToList } from "../store/actions/list";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";

const formReducer = (state, action) => {
  if (action.type === "UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const NewItemScreen = props => {
  const items = useSelector(state => state.items.items);
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      description: ""
    },
    inputValidities: {
      title: false,
      description: false
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: "UPDATE",
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const submitHandler = () => {
    if (!formState.formIsValid) {
      Alert.alert("Form is invalid!,", "Please fix the errors in the form", [
        { text: "Okay" }
      ]);
      return;
    }
    dispatch(
      addToList(formState.inputValues.title, formState.inputValues.description)
    );
    props.navigation.goBack();
  };

  const duplicationHandler = () => {
    const rand = Math.floor(Math.random() * items.length);
    const duplicate = items[rand];
    dispatch(addToList(duplicate.title, duplicate.description));
    props.navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.formContainer}>
        <Input
          style={styles.input}
          id="title"
          label="Title"
          onInputChange={inputChangeHandler}
        />
        <Input
          style={styles.input}
          id="description"
          label="Description"
          onInputChange={inputChangeHandler}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Item" onPress={submitHandler} />
        </View>
        <View style={styles.duplicationContainer}>
          <Button
            title="Duplicate random item in list"
            color={Colors.accent}
            disabled={items.length > 0 ? false : true}
            onPress={duplicationHandler}
          />
        </View>
      </View>
    </View>
  );
};

NewItemScreen.navigationOptions = navData => {
  return {
    headerTitle: "Add New Item"
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },

  formContainer: {
    width: "80%",
    alignItems: "center"
  },
  input: {
    marginVertical: 10
  },
  buttonContainer: {
    marginVertical: 10,
    width: Dimensions.get("window").width / 3
  },
  duplicationContainer: {
    marginVertical: 10
  }
});

export default NewItemScreen;
