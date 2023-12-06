import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { login, useMyContextController } from "../context";
import { TextInput } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("binhprod@gmail.com");
  const [password, setPassword] = React.useState("123456");
  const [showPassword, setShowPassword] = React.useState(false);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role == "admin") navigation.navigate("Home");
      else navigation.navigate("Customer");
    }
  }, [userLogin]);

  const onSubmit = () => {
    login(dispatch, email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logintitle}>Login</Text>

      <View style={styles.inputStyle}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Vui lòng nhập Email của bạn"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Hãy nhập mật khẩu của bạn"
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>

      <Button onPress={onSubmit} title="Đăng nhập" />

      <Image
        style={styles.imageStyle}
        source={require("../images/heart.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 12,
  },
  logintitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "violet",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    borderColor: "violet",
    borderWidth: 1,
    height: 50,
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  inputStyle: {
    marginTop: 40,
  },
  imageStyle: {
    height: 200,
    width: 300,
    padding: 40,
    marginTop: 80,
    marginLeft: 50,
  },
});

export default LoginScreen;
