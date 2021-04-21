import React from 'react'
import { View, Text, ImageBackground } from 'react-native'

export default function moreInfo({ route, navigation }) {
  console.log(route.params.item)
  return (
    <View>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={background}
          style={defaultStyle.background}
        />
        
        <Text>{route.params.item.nome_festa}</Text>
      </View>

    </View>
  )
}

// "descricao": null,
//       "fim": null,
//       "id_festa": "1",
//       "inicio": "2020-05-26T20:30:34.000Z",
//       "latitude": -64.1582003,
//       "longitude": -77.1973997,
//       "nome_festa": "varius integer ac",
//       "preco": 60.95,