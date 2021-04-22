import React from 'react'
import { View, StyleSheet, StatusBar, Image } from 'react-native'

import logo from "../assets/logo.png";
import defaultStyle from "../styles/defaultStyle"
import Button from '../components/button/button'
import { pink } from '../styles/color';

export default function iparty({navigation}) {
  return (
    <View style={[defaultStyle.background, {backgroundColor:'black'}]}>
      <StatusBar backgroundColor="black" />
      <Image
        source={logo}
        style={styles.logo}
        resizeMode={'contain'}
      />

      <View style={styles.ButtonView}>

        <Button
          text="LOGIN"
          styleButton={[styles.button, styles.buttonLogin]}
          styleText={[defaultStyle.buttonText,{color:pink}]}
          onPress={()=>navigation.navigate('login')}
        />

        <Button
          text="REGISTRE-SE"
          styleButton={styles.button}
          onPress={()=>navigation.navigate('signUp')}
        />

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: '120%'
  },

  ButtonView: {
    height:100,
    width:'95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf:'center'
  },

  button: {
    ...defaultStyle.button,
    height: '60%',
    marginBottom: 0,
    marginHorizontal: 5
  },

  buttonLogin: {
    borderWidth: 1.5,
    backgroundColor: "white",
    borderColor: pink,
  },
})

