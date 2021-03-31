import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        console.log(doc.data());
        let { name, email, phone } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setUsers(users);
    });
  }, []);
  return (
    <ScrollView>
      <Button
        title="Crear usuario"
        onPress={() => props.navigation.navigate("CreateUserScreen", {bici: null})}
      ></Button>
      <Button
        title="Notificaciones"
        onPress={() => props.navigation.navigate("NotificationsTest")}
      ></Button>

      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                  userId: user.id
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              rounded
              source={{
                uri:
                  "https://images.clarin.com/2020/08/16/avatar-the-last-airbender-foto___pck4_8liS_340x340__1.jpg",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UsersList;
