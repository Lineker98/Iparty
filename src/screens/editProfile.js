import React, { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Avatar } from "react-native-elements";

import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView
} from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import Card from '../components/card/card'
import BackIcon from '../components/button/backIcon'
import Calender from '../components/button/calender';

import userData from '../components/dados/userData'
import deleteApi from '../api/delete'
import updateApi from '../api/update'
import GetUserDataApi from '../api/getUserData'
import GetUserPartyApi from '../api/getUserParty'
import { AuthContext } from '../components/dados/context'

import defaultStyle from '../styles/defaultStyle'
import photo from '../assets/profile.png'
import { background, pink } from '../styles/color';
import { Dimensions } from 'react-native';
import LoadingButton from '../components/button/loadingButton';


const now = new Date(Date.now())

export default function editProfile({ route, navigation }) {

  const { getCurrentUser, signOut } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(now);
  const [parties, setParties] = useState([]);
  const [phone, setPhone] = useState('');

  useFocusEffect(
    useCallback(() => {

      let currentUser = getCurrentUser()
      let id = currentUser.id;
      let type = currentUser.type;

      navigation.setOptions({
        tabBarVisible: false,
      })

      callUserServer(id, type)
      callPartyServe(id, type)

      return () => {
        navigation.setParams({ user: undefined })
      }

    }, [])
  )

  function callUserServer(id, type) {
    GetUserDataApi
      .callGetUserServe(id, type)
      .then((snapshot) => {
        if (!snapshot.error) {
          setEmail(snapshot.email)
          setName(snapshot.name)
          setBirthday(snapshot.birthday ?
            new Date(snapshot.birthday) : null)
          setPhone(snapshot.phone)
          setPassword(snapshot.password)
        }
        else {
          alert(snapshot.error)
          setEmail(currentUser.email)
          setName(currentUser.name)
          setBirthday(new Date(currentUser.birthday))
          setPhone(currentUser.phone)
          setPassword(currentUser.password)
        }
      })
  }

  function callPartyServe(id, type) {
    GetUserPartyApi.
      callGetUserPartyServe(id, type)
      .then((snapshot) => {
        if (!snapshot.error) {
          setParties(snapshot)
        }
        else {
          alert(snapshot.error)
        }
      })
  }

  async function callDelete() {
    let info = await deleteApi
      .callDeleteServe(
        getCurrentUser().id, getCurrentUser().type
      )
    alert("Conta excluida com sucesso")
    signOut()
  }

  async function callUpdate() {
    let data = {
      "id_usuario": getCurrentUser().id,
      "nome": name,
      "cpf": getCurrentUser().cpf,
      "email": email,
      "senha": password,
      "avaliacao": "5",
      "data_nascimento": birthday,
      "telefone": phone,
    }

    let info = await updateApi
      .callUpdateServe(
        getCurrentUser().id, getCurrentUser().type, data
      )

    if (!info.error) {
      navigation.navigate('profile')
    }
    else {
      alert(info.error)
    }
  }

  return (
    <ScrollView nestedScrollEnabled={true} style={defaultStyle.scrollView}>
      <StatusBar backgroundColor={background} />
      <View style={defaultStyle.container}>
        <View style={styles.headerProfile}>
          <BackIcon
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.userInfo}>
          <Avatar
            rounded
            source={photo}
            size="xlarge"
          />

          <View style={styles.text}>
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
            />

            {
              getCurrentUser().type == 'produtor' ? null :
                <Calender
                  onChange={setBirthday}
                  text='Aniversário'
                  styleText={styles.dateText}
                  styleDate={styles.dateText}
                  styleContainer={styles.date}
                  value={new Date(getCurrentUser().birthday)}
                />
            }

            {
              getCurrentUser().type != 'produtor' ? null :
                <TextInput
                  style={defaultStyle.input}
                  placeholderTextColor={defaultStyle.input.color}
                  placeholder="Telefone"
                  value={phone}
                  onChangeText={setPhone}
                />
            }
          </View>
        </View>

        {getCurrentUser().type != 'produtor' ? null :
          <FlatList
            style={{
              flex: 2,
              width: '110%',
            }}
            data={parties}
            keyExtractor={(item) => item.id_festa}
            horizontal={true}
            renderItem={({ item }) => (
              <View style={styles.viewCard}>
                <Card
                  item={item}
                />
                <AntDesign
                  name="delete"
                  size={30}
                  color={pink}
                  onPress={() => deleteApi
                    .callDeleteServe(
                      item.id_festa, 'festa'
                    ).then(() => {
                      callPartyServe(getCurrentUser().id, getCurrentUser().type)
                    })}
                />
              </View>
            )}
          />
        }

        <LoadingButton
          text="Atualizar"
          onPress={async () => (await callUpdate())
          }
        />

        <LoadingButton
          styleButton={[defaultStyle.button, { backgroundColor: 'black' }]}
          text="Excluir conta"
          onPress={async () => (
            await callDelete()
          )
          }
        />
      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold'
  },

  userInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },

  text: {
    flex: 1,
    width: '100%',
    marginVertical: 15,
  },

  viewCard: {
    width: Dimensions.get('window').width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateText: {
    color: 'white',
    fontWeight: 'bold'
  },

  date: {
    ...defaultStyle.input,
    backgroundColor: pink,
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 20,
  },
})
