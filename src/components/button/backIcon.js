import React from 'react'

import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';

export default function Close({
  onPress = () => { },
  size = 35,
  color = '#808080',
  style = styles.icon,
  name = 'back',
}) {
  return (
    <AntDesign
      name={name}
      size={size}
      color={color}
      style={style}
      onPress={() => onPress()}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 15,
  },
})