import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'

import defaultStyle from '../../styles/defaultStyle'

export default function loadingButton({
  onPress = async () => { },
  text = "CLIQUE AQUI",
  styleText = { color: 'white' },
  styleButton = defaultStyle.button
}) {

  const [loading, setLoading] = useState(false)

  function IsNotLoding() {
    return (
      <TouchableOpacity style={styles.button}
        onPress={() => (pressButton().then())}
      >
        <Text style={styleText}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  async function pressButton() {
    setLoading(true)
    await onPress()
    setLoading(false)
  }

  function isLoding() {
    return (
      <ActivityIndicator
        style={styles.button}
        size="large"
        color="white"
        animating={true}
      />
    )
  }
  return (
    <View style={styleButton}>
      {loading ?
        (
          isLoding()
        ) :
        (
          IsNotLoding()
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }
})