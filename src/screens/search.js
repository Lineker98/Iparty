import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StatusBar
} from "react-native";

import searchApi from "../api/searchUser";

import defaultStyle from "../styles/defaultStyle";
import UserBar from "../components/button/userBar";
import { background } from "../styles/color";

export default function search({ user, navigation }) {

  const [users, setUsers] = useState([]);

  const searchUser = (search) => {
    if (search == "") {
      setUsers([]);
    } else {
      searchApi
        .callUserSearchServe(search)
        .then((snapshot) => {
          let users = snapshot.users.map((user) => {
            const data = {
              picture: user.foto,
              id: user.id_usuario,
              name: user.nome,
              birthday: user.data_nascimento,
              email: user.email,
            }
            return { ...data };
          });
          setUsers(users);
        });
    }
  };

  function clickOnUser(user) {
    navigation.navigate('profile', { user })
  }

  return (
    <View style={defaultStyle.container}>
      <StatusBar backgroundColor={background} />
      <Text style={defaultStyle.title}>Pesquisar</Text>

      <TextInput
        style={defaultStyle.input}
        onChangeText={searchUser}
        placeholder="Pesquisar"
        placeholderTextColor={defaultStyle.input.color}
      />

      <FlatList
        data={users}
        key={({ item }) => item.id}
        renderItem={({ item }) => (
          <UserBar
            name={item.name}
            email={item.email}
            image={item.picture}
            styleText={{ fontSize: 18 }}
            style={{ marginTop: 30 }}
            onPress={() => clickOnUser(item)}
          />
        )}
      />
    </View>
  );
}