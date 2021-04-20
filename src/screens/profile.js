import React, { useCallback, useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { View, Text, StatusBar } from 'react-native'

import userData from '../components/dados/userData'
import GetUserDataApi from '../api/getUserData'
import { AuthContext } from '../components/dados/context'

const now = new Date(Date.now())

export default function profile({ route, navigation }) {

  const { getCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(now);

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
      
      GetUserDataApi.callGetUserServe(id).then((snapshot) => {
        if (!snapshot.error) {
          setEmail(snapshot.email)
          setName(snapshot.name)
          setBirthday(new Date(snapshot.birthday))
        }
        else {
          alert(snapshot.error)
          setEmail(currentUser.email)
          setName(currentUser.name)
          setBirthday(new Date(currentUser.birthday))
        }
      })

      return () => {
        navigation.setParams({ user: undefined })
      }

    }, [route.params && route.params.user])
  )

  return (
    <View>
      <StatusBar backgroundColor='black' />

      
        <View>
          <Text style={{ color: 'white' }}>
            {
              name
            }
          </Text>

          <Text style={{ color: 'white' }}>
            {
              email
            }
          </Text>

          <Text style={{ color: 'white' }}>
            {
              birthday.toLocaleDateString('pt-Br')
            }
          </Text>

        </View>
      

    </View>
  )
}
