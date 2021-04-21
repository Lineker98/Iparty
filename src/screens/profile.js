import React, { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Avatar } from "react-native-elements";

import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList
} from 'react-native'

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Card from '../components/card/card'
import BackIcon from '../components/button/backIcon'

import userData from '../components/dados/userData'
import GetUserDataApi from '../api/getUserData'
import GetUserPartyApi from '../api/getUserParty'
import { AuthContext } from '../components/dados/context'

import defaultStyle from '../styles/defaultStyle'
import photo from '../assets/profile.png'
import { pink } from '../styles/color';

const now = new Date(Date.now())

export default function profile({ route, navigation }) {

  const { getCurrentUser, signOut } = useContext(AuthContext);

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(now);
  const [parties, setParties] = useState([]);

  useFocusEffect(
    useCallback(() => {

      let currentUser = getCurrentUser()
      let id = currentUser.id;

      navigation.setOptions({
        tabBarVisible: true,
      })

      if (route.params && route.params.user) {
        if (route.params.user.id != id) {
          id = route.params.user.id;
          navigation.setOptions({
            tabBarVisible: false,
          })
        }
      }

      callUserServer(id)
      callPartyServe(id)

      return () => {
        navigation.setParams({ user: undefined })
      }

    }, [route.params && route.params.user])
  )

  function callUserServer(id) {
    GetUserDataApi
      .callGetUserServe(id)
      .then((snapshot) => {
        if (!snapshot.error) {
          setEmail(snapshot.email)
          setName(snapshot.name)
          setBirthday(new Date(snapshot.birthday))
          setId(id)
        }
        else {
          alert(snapshot.error)
          setEmail(currentUser.email)
          setName(currentUser.name)
          setBirthday(new Date(currentUser.birthday))
          setId(currentUser.id)
        }
      })
  }

  async function callPartyServe(id) {
    GetUserPartyApi.
      callGetUserPartyServe(id)
      .then((snapshot) => {
        if (!snapshot.error) {
          setParties(snapshot)
        }
        else {
          alert(snapshot.error)
        }
      })


  }

  return (
    <View style={defaultStyle.container}>
      <StatusBar backgroundColor='black' />

      <View style={styles.headerProfile}>
        {getCurrentUser().id != id ?
          <BackIcon
            onPress={() => navigation.goBack()}
          />
          :
          <>
            <FontAwesome
              name="cog"
              size={35}
              color={pink}
              onPress={() => (alert("Config"))}
            />
            <MaterialCommunityIcons
              name="exit-run"
              size={35}
              color={pink}
              onPress={() => signOut()}
            />
          </>
        }
      </View>

      <View style={styles.userInfo}>
        <Avatar
          rounded
          source={photo}
          size="xlarge"
        />

        <View style={styles.text}>
          <Text style={styles.name}>
            {name}
          </Text>

          <Text style={{ color: 'white' }}>
            {email}
          </Text>

          <Text style={{ color: 'white' }}>
            Data de nascimento: {birthday.toLocaleDateString('pt-Br')}
          </Text>
        </View>
      </View>

      <FlatList
        style={{
          flex: 2,
          marginTop: 20,
          height:'100%',
          
        }}
        data={parties}
        keyExtractor={(item) => item.id_festa}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPostPress={(post) => {
              navigation.navigate('moreinfo', { item })
            }
            }
          />
        )}
      />
    </View>
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
  }
})
