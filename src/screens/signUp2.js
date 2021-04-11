import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native'

import background from "../assets/background2.png"
import defaultStyle from '../styles/defaultStyle'

import BackIcon from '../components/button/backIcon'
import LoadingButton from '../components/button/loadingButton'

import SignUpApi from '../api/signUp'
import userData from '../components/dados/userData'
import { AuthContext } from '../components/dados/context'

export default function signUp2({ route }) {
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { signIn } = useContext(AuthContext);

  async function callSignUpServe() {

    let data = {
      nome: name,
      cpf: cpf,
      email: email,
      senha: password,
      data_nascimento: "2020-08-27"
    }

    if (isPasswordRight() != 'red') {
      const currentUser = await SignUpApi
        .callSignUpServe(data);

      if (!currentUser.error) {
        await userData.set(currentUser);
        signIn()
      }
      else {
        alert(currentUser.error)
      }
    }
    else {
      alert("Erro no preenchimento da senha")
    }
  }

  const isPasswordRight = () => (
    password == password2 ? defaultStyle.input.color : 'red'
  )

  return (
    <ImageBackground
      source={background}
      style={defaultStyle.background}
    >
      <ScrollView style={{ flexGrow: 1 }}>

        <StatusBar backgroundColor="black" />

        <View style={styles.container}>
          <BackIcon
            onPress={() => navigation.goBack()}
          />

          <Text style={defaultStyle.title}>Registrar-se</Text>

          {/* {
            route.params && route.params.name != 'Produtor' ? null : */}
          <TextInput
            style={defaultStyle.input}
            placeholderTextColor={defaultStyle.input.color}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />
          {/* } */}

          <TextInput
            style={defaultStyle.input}
            placeholderTextColor={defaultStyle.input.color}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={defaultStyle.input}
            placeholderTextColor={defaultStyle.input.color}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={defaultStyle.input}
            placeholderTextColor={defaultStyle.input.color}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <TextInput
            style={[defaultStyle.input, { color: isPasswordRight() }]}
            placeholderTextColor={defaultStyle.input.color}
            placeholder="Senha"
            value={password2}
            onChangeText={setPassword2}
            secureTextEntry={true}
          />

          <LoadingButton
            styleButton={styles.button}
            text="REGISTRAR"
            onPress={async () => (
              await callSignUpServe()
            )
            }
          />

        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  button: {
    ...defaultStyle.button,
    maxHeight: 60,
  },

  container: {
    ...defaultStyle.container,
    backgroundColor: 'transparent',
  }
})