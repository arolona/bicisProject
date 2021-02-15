import React, { useEffect, useState } from "react";
import {} from "react-native";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    id: "",
  }
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
    const dbRef = firebase.db
      .collection("users")
      .doc(user.id);
    await dbRef.delete();
    props.navigation.navigate("UsersList");
  };

  const updateUser = async () => {
    const dbRef = firebase.db.collection('users').doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    })
    setUser(initialState);
    props.navigation.navigate('UsersList');
  }

  const confirmationDelete = () => {
    Alert.alert('Eliminar el usuario', '¿Estas seguro?', [
      {text: 'Si', onPress: () => deleteUser()},
      {text: 'No', onPress: () => console.log("Cancelado")}
    ])
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          value={user.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          value={user.email}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Celular"
          value={user.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button
          color="#19ac52"
          title="Editar Usuario"
          onPress={() => updateUser()}
        />
      </View>
      <View>
        <Button
          color="#e37399"
          title="Eliminar Usuario"
          onPress={() => deleteUser()}
        />
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

export default UserDetailScreen;
