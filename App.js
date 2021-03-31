import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import UsersList from "./screens/UsersList";
import CreateUserScreen from "./screens/CreateUserScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import CreateBiciScreen from "./screens/CreateBiciScreen";
import BicisDetailScreen from "./screens/BicisDetailScreen";
import NotificationsTest from "./screens/NotificationsTest";

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UsersList"
        component={UsersList}
        options={{ title: "Lista de usuarios" }}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{ title: "Nuevo usuario" }}
      />
      <Stack.Screen
        name="CreateBiciScreen"
        component={CreateBiciScreen}
        options={{ title: "Nueva bicicleta" }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: "Detalle de usuario" }}
      />
      <Stack.Screen
        name="BicisDetailScreen"
        component={BicisDetailScreen}
        options={{ title: "Detalle de bici" }}
      />
      <Stack.Screen
        name="NotificationsTest"
        component={NotificationsTest}
        options={{ title: "Notificaciones" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>HOLIII!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
