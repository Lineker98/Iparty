import React from 'react'
import { View, Text, ActivityIndicator, StatusBar } from 'react-native'
import { background } from '../styles/color'

export default function loading() {
  return (
    <View style={{flex:1}}>
      <StatusBar backgroundColor='black' />
      <ActivityIndicator
        color='white'
        style={{
          backgroundColor: background,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
        size='large'
      />
    </View>
  )
}
