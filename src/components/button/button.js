import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import defaultStyle from '../../styles/defaultStyle'

export default function button({
  onPress = () => { },
  text = "CLIQUE AQUI",
  styleText = defaultStyle.buttonText,
  styleButton = defaultStyle.button
}) {

  return (
    <View style={styleButton}>
      <TouchableOpacity
        onPress={() => onPress()}
        style={styles.button}
      >
        <Text style={styleText}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})