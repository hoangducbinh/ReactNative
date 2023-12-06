import { useMyContextController } from "../context";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Services from "../screens/EditServicesScreen";
import AddNewService from "../screens/AddNewServiceScreen";
import ServiceDetail from "../screens/ServiceDetailScreen";

const Stack = createStackNavigator();

const RouterServices = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate("Login");
    }
  }, [userLogin]);

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Services"
        component={Services}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddNewService"
        component={AddNewService}
        options={{
          headerStyle: { backgroundColor: 'violet' },
        }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{
          headerStyle: { backgroundColor: 'violet' },
        }}
      />
      
    </Stack.Navigator>
  );
};

export default RouterServices;
