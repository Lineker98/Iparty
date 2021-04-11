import React from 'react'
import { View, Text } from 'react-native'

export default function signUp2({route}) {
  return (
    <View>
      <Text>{route.params.name}</Text>
    </View>
  )
}
