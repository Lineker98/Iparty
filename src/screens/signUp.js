import React, {useContext} from 'react'
import { View, Text } from 'react-native'

import { AuthContext } from '../components/context'


export default function singUp() {

  const { signIn } = useContext(AuthContext);
  return (
    <View>
      <Text>registrar</Text>
    </View>
  )
}
