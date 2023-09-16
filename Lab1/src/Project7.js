import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    marginTop: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 10,
    borderRadius: 5,
  },
});

const Project7 = () => {
  const [name, setName] = useState(""); // Use useState to manage the name state

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is your name?</Text>
      <TextInput
        style={styles.input}
        placeholder="Hoang Duc Binh"
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={(text) => setName(text)} // Update the name state on input change
        value={name} // Bind the value of the input to the name state
      />
      <Button
        title="Say Hello"
        onPress={() => {
          alert(`Hello, ${name}!`);
          setName(""); // Clear the name input after saying hello
        }}
      />
    </View>
  );
};

export default Project7;
