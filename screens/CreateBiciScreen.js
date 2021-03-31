import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from "../database/firebase";

const CreateBiciScreen = (props) => {
  const [biciState, setState] = useState({
    marco: "",
    marca: "",
    color: ""
  });

  const handleChangeText = (name, value) => {
    setState({ ...biciState, [name]: value });
  };

  const saveNewBici = async () => {
    if (biciState.marco === "") {
      console.log("Pon tu puto marco");
    } else {
      try {
        props.navigation.navigate(props.route.params.screen, {
          bici: biciState,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addBici = () => {
    console.log(biciState.bicis);
    setState({ ...biciState, bicis: biciState.bicis(initialBici) });
    console.log(biciState);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Número de marco"
          onChangeText={(value) => handleChangeText("marco", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Color"
          onChangeText={(value) => handleChangeText("color", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Marca"
          onChangeText={(value) => handleChangeText("marca", value)}
        />
      </View>
      <View>
        <Button title="Guardar bici" onPress={() => saveNewBici()} />
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

export default CreateBiciScreen;
