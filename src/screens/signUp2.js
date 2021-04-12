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
import Calender from '../components/button/calender';

import SignUpApi from '../api/signUp'
import userData from '../components/dados/userData'
import { AuthContext } from '../components/dados/context'
import { pink } from '../styles/color'


const now = new Date(Date.now())

export default function signUp2({ route, navigation }) {
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [date, setDate] = useState(now)

  const { signIn } = useContext(AuthContext);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    var newDate = new Date(currentDate)
    setDate(newDate)
  };

  async function callSignUpServe() {

    let data = {
      nome: name,
      email: email,
      senha: password,
      data_nascimento: date,
      telefone: telefone
    }

    if(cpf.length == 11){
      data.cpf = cpf
    }
    else{
      data.cnpj = cpf
    }

    console.log(data)

    // if (isPasswordRight() != 'red') {
    //   const currentUser = await SignUpApi
    //     .callSignUpServe(data);

    //   if (!currentUser.error) {
    //     await userData.set(currentUser);
    //     signIn()
    //   }
    //   else {
    //     alert(currentUser.error)
    //   }
    // }
    // else {
    //   alert("Erro no preenchimento da senha")
    // }
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

          <TextInput
            style={defaultStyle.input}
            placeholderTextColor={defaultStyle.input.color}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />

          <TextInput
            style={defaultStyle.input}
            placeholderTextColor={defaultStyle.input.color}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />

          {
            route.params && route.params.name != 'Produtor' ?
              <Calender
                onChange={onChangeDate}
                text='Data de aniversário'
                styleText={styles.dateText}
                styleDate={styles.dateText}
                styleContainer={styles.date}
              />
              :
              <TextInput
                style={defaultStyle.input}
                placeholderTextColor={defaultStyle.input.color}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
              />
          }

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
  },

  dateText: {
    color: 'white',
    fontWeight: 'bold'
  },

  date: {
    ...defaultStyle.input,
    backgroundColor:pink,
    opacity:0.85,
    justifyContent: 'center',
    width:'50%',
    alignSelf:'center',
    alignItems: 'center',
  },
})