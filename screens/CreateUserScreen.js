import React, { useEffect, useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from "../database/firebase";

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    bicis: {},
  });

  const initialBici = {
    marco: "",
    marca: "",
    color: "",
  };

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      console.log("Pon tu puto nombre");
    } else {
      try {
        await console.log(state);
        firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          phone: state.phone,
        });
        console.log("GUARDADO");
        props.navigation.navigate("UsersList");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if(props.route.params.bici != null){
    let marco = props.route.params.bici.marco;
    delete props.route.params.bici.marco;
    let bici = props.route.params.bici;
    let bicis = state.bicis;
    bicis[marco] = bici;
    setState({ ...state, ['bicis']: bicis });
    props.route.params.bici = null;
  }    

  const addBici = () => {
    // console.log(state.bicis);
    // setState({ ...state, bicis: state.bicis(initialBici) });
    // console.log(state);
    state.newBici = true;
    props.navigation.navigate("CreateBiciScreen", {
      state: state,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Teléfono"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button title="Crear Usuario" onPress={() => saveNewUser()} />
      </View>
      <View>
        <Button title="Añadir bici" onPress={() => addBici()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default CreateUserScreen;
