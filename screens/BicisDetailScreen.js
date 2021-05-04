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
  Dimensions
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../database/firebase";
import bici_img from "../recursos/bici_rueda.png"

const BicisDetailScreen = (props) => {
  const initialState = {
    marco: "",
    marca: "",
    color: "",
  };
  const [biciState, setState] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getBici = async (marco, bici) => {
    setState({
      marco: marco,
      marca: bici.marca,
      color: bici.color,
    });
    setLoading(false);
  };
  useEffect(() => {
    getBici(props.route.params.marco, props.route.params.bici);
  }, []);

  const handleChangeText = (name, value) => {
    setState({ ...biciState, [name]: value });
  };

  //   const deleteBici = async () => {
  //     const dbRef = firebase.db.collection("users").doc(user.id);
  //     await dbRef.delete();
  //     props.navigation.navigate("UsersList");
  //   };

  const updateBici = async () => {
    props.navigation.navigate("UserDetailScreen", {
      bici: biciState,
    });
  };

  const confirmationDelete = () => {
    Alert.alert("Eliminar la bici", "¿Estas seguro?", [
      { text: "Si", onPress: () => deleteBici() },
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


  const image = {
    uri:bici_img,
      //"https://i.pinimg.com/originals/07/d4/ac/07d4acc79bd9662ded0bc75fb5fc3e3f.jpg",
  };

  return (
    <ImageBackground source={image} style={styles.image}>
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          value={biciState.marca}
          onChangeText={(value) => handleChangeText("marca", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          value={biciState.color}
          onChangeText={(value) => handleChangeText("color", value)}
        />
      </View>
      <View style={styles.bottom}>
        <Button
          style={styles.button}
          color="#19ac52"
          title="Actualizar bici"
          onPress={() => updateBici()}
        />
        {/* <Button
          style={styles.button}
          color="#e37399"
          title="Eliminar Usuario"
          onPress={() => deleteBici()}
        /> */}
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
  button: {
    position: "absolute",
    bottom: 0,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  bicis: {
    flex: 2,
  },
});

export default BicisDetailScreen;
