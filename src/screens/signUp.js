import React from 'react'
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import background from "../assets/background2.png"
import defaultStyle from '../styles/defaultStyle'

import BackIcon from '../components/button/backIcon'

import userImg from '../assets/user.png'
import produtorImg from '../assets/produtor.png'
import { pink } from '../styles/color'
const IMGDATA = [
  {
    img: userImg,
    name: 'Usuário'
  },
  {
    img: produtorImg,
    name: 'Produtor'
  },
]

export default function singUp({ navigation }) {

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

        <Text style={defaultStyle.title}>Registrar-se</Text>


        <FlatList
          data={IMGDATA}
          horizontal={true}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigation.navigate('signUp2',{name:item.name})}
            >
              <Text style={styles.imgText}>{item.name}</Text>
              <Image
                source={item.img}
                resizeMode="contain"
                style={styles.img}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => String(item.name)}
        />
      </View>

    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: Dimensions.get('window').width * 0.9,
    margin: 5,
    borderRadius: 30,
  },

  imgText: {
    color: pink,
    alignSelf: 'center',
    fontSize: 40
  },

  container: {
    ...defaultStyle.container,
    marginBottom: 10,
    backgroundColor: 'transparent',
  }
})