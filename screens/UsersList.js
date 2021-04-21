import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Button,
  StyleSheet,
} from "react-native";
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

  var listItems = users.map((user) => {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => {
          props.navigation.navigate("UserDetailScreen", {
            userId: user.id,
          });
        }}
        containerStyle={{ backgroundColor: "#ffeeeed9" }}
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
  });

  const image = {
    uri:
      "https://i.pinimg.com/originals/07/d4/ac/07d4acc79bd9662ded0bc75fb5fc3e3f.jpg",
  };
  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 5 }}>
          <ScrollView>{listItems}</ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={styles.btn}
              onPress={() =>
                props.navigation.navigate("CreateUserScreen", { bici: null })
              }
            >
              Crear usuario
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={styles.btn}
              onPress={() => props.navigation.navigate("NotificationsTest")}
            >
              Notificaciones
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    flexDirection: "column",
    height: "100%",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  btn: {
    marginTop: 5,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#20232a66",
    borderRadius: 25,
    backgroundColor: "#fb6161f2",
    color: "#dcdde0",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default UsersList;
