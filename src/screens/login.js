import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  StyleSheet,
  TextInput
} from 'react-native'

import background from "../assets/background2.png"
import defaultStyle from '../styles/defaultStyle'

import BackIcon from '../components/button/backIcon'
import LoadingButton from '../components/button/loadingButton'

import LoginApi from '../api/login'
import userData from '../components/dados/userData'
import { AuthContext } from '../components/dados/context'

export default function login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  async function callLoginServe() {

    const currentUser = await LoginApi
      .callLoginServe(email, password);

    if (!currentUser.error) {
      signIn(currentUser)
    }
    else {
      alert(currentUser.error)
    }
  }

  return (
    <ImageBackground
      source={background}
      style={defaultStyle.background}
    >
      <StatusBar backgroundColor="black" />

      <View style={styles.container}>
        <BackIcon
          onPress={() => navigation.goBack()}
        />

        <Text style={defaultStyle.title}>Login</Text>

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

        <LoadingButton
          styleButton={styles.button}
          text="Login"
          onPress={async () => (
            await callLoginServe()
          )
          }
        />

      </View>

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

