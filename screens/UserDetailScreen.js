import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  ImageBackground,
  Alert,
  Dimensions,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../database/firebase";
import bici_img from "../recursos/bici_disco.png"

const UserDetailScreen = (props) => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    bicis: {},
    id: "",
  };
  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };
  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
    const dbRef = firebase.db.collection("users").doc(user.id);
    await dbRef.delete();
    props.navigation.navigate("UsersList");
  };

  const updateUser = async () => {
    const dbRef = firebase.db.collection("users").doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
      bicis: user.bicis,
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  const addBici = () => {
    props.navigation.navigate("CreateBiciScreen", {
      screen: "UserDetailScreen",
    });
  };

  const confirmationDelete = () => {
    Alert.alert("Eliminar el usuario", "¿Estas seguro?", [
      { text: "Si", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log("Cancelado") },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }
  var listBicis = "";

  const image = {
    uri:bici_img,
      //"https://i.pinimg.com/originals/07/d4/ac/07d4acc79bd9662ded0bc75fb5fc3e3f.jpg",
  };

  if (user.bicis != null) {
    listBicis = Object.keys(user.bicis).map(function (i) {
      return (
        
        <ListItem
          key={i}
          bottomDivider
          onPress={() => {
            props.navigation.navigate("BicisDetailScreen", {
              marco: i,
              bici: user.bicis[i],
            });
          }}
          containerStyle={{ backgroundColor: "#ffeeeed9" }}//'rgba(52, 52, 52, 0.8)' otra forma de backgroud ultimo parametro opacidad
          
        >
          <ListItem.Chevron />
          <ListItem.Content>
            <ListItem.Title>{i}</ListItem.Title>
            <ListItem.Subtitle>{user.bicis[i].marca}</ListItem.Subtitle>
            <ListItem.Subtitle>{user.bicis[i].color}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        
      );
    });
    console.log(listBicis);
  }

  if (props.route.params.bici != null) {
    let marco = props.route.params.bici.marco;
    delete props.route.params.bici.marco;
    let bici = props.route.params.bici;
    let bicis = user.bicis;
    bicis[marco] = bici;
    setUser({ ...user, ["bicis"]: bicis });
    props.route.params.bici = null;
  }

  return (
    <ImageBackground source={image} style={styles.image}>
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
        style={styles.textInput} 
          placeholder="Nombre"
          value={user.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textInput} 
          placeholder="Email"
          value={user.email}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textInput} 
          placeholder="Celular"
          value={user.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View style={styles.bicis}>{listBicis}</View>
      <View style={styles.btn}>
        <Button
          style={styles.btn}
          //color="#19ac52"
          title="Actualizar Usuario"
          onPress={() => updateUser()}
        />
        <Button
          style={styles.button}
          color="#e37399"
          title="Eliminar Usuario"
          onPress={() => deleteUser()}
        />
        <Button
          style={styles.button}
          color="#506388"
          title="Añadir bici"
          onPress={() => addBici()}
        />
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 35,
    height: deviceHeight, //* percentageYouWant / 100
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  button: {
    position: "absolute",
    bottom: 0,
  },
  textInput: {
    color: 'white',
   },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  bicis: {
    flex: 2,
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





export default UserDetailScreen;
