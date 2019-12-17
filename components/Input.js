import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = props => {
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");

  const { onInputChange, id } = props;

  useEffect(() => {
    if (touched) {
      onInputChange(id, enteredValue, isValid);
    }
  }, [touched, enteredValue, isValid, onInputChange]);

  const textChangeHandler = text => {
    setEnteredValue(text);
    if (text.trim().length === 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <View style={{ ...props.style, ...styles.formControl }}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={enteredValue}
        onChangeText={textChangeHandler}
        onBlur={() => {
          setTouched(true);
        }}
      />
      {!isValid && touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Invalid input</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%"
  },
  label: {
    fontWeight: "bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: "red",
    fontSize: 13
  }
});

export default Input;
