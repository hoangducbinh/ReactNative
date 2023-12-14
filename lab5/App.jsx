import React, { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import { MyContextControllerProvider } from "./src/context";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router/Router";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const initial = async () => {
  const USERS = firestore().collection("USERS");
  const admin = {
    name: "admin",
    phone: "02022002",
    address: "Binh Duong",
    email: "binhprod@gmail.com",
    password: "123456",
    role: "admin",
  };

  try {
    const userDoc = USERS.doc(admin.email);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
      await auth().createUserWithEmailAndPassword(admin.email, admin.password);
      await userDoc.set(admin);
      console.log("Add new user admin!");
    }
  } catch (error) {
    console.error("Error during initial setup:", error);
  }
};


const App = () => {
  useEffect(() => {
    // Set StatusBar color and style
    StatusBar.setBackgroundColor("purple"); // Background color
    StatusBar.setBarStyle("light-content"); // Light text color

    // Run initial setup
    initial();

    // Cleanup when component unmounts
    return () => {
      StatusBar.setBackgroundColor("#2c3e50"); // Reset background color
      StatusBar.setBarStyle("dark-content"); // Reset text color
    };
  }, []);

  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default App;
