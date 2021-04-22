import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons';
import BackIcon from '../components/button/backIcon'

import LoadingButton from '../components/button/loadingButton'

import partyImg from '../assets/party.png'
import { background, lightGrey, pink } from '../styles/color'
import defaultStyle from '../styles/defaultStyle'

import { AuthContext } from '../components/dados/context'

import frequentaApi from '../api/frequenta'

export default function moreInfo({ route, navigation }) {
  const { getCurrentUser } = useContext(AuthContext);

  const [address, setAddress] = useState({
    road: "Reino unido",
    town: "Curvelo",
    neighbourhood: "São Geraldo",
    state: "Minas Gerais",
    country: "br".toUpperCase()
  });

  async function frequenta(id) {
    let currentUser = getCurrentUser()

    let data = {
      "id_usuario": currentUser.id,
      "id_festa": id
    }

    let snapshot = await frequentaApi
      .callFrequentaServe(data)

    if (!snapshot.error) {
      navigation.navigate('map')
    }
    else{
      alert(snapshot.error)
    }

  }

  // useFocusEffect(
  //   useCallback(() => {
  //     if (route.params && route.params.item) {
  //       let lat = route.params.item.latitude
  //       let lon = route.params.item.longitude
  //       console.log(lat, lon)

  //       streetApi
  //         .callGetAddressByLatLon(lat, lon)
  //         .then((snapshot) => {
  //           if (!snapshot.error)
  //             setAddress(snapshot);
  //             console.log(snapshot)
  //         })
  //     }

  //     return () => {
  //       //navigation.setParams({ item: undefined })
  //     }

  //   }, [route.params && route.params.item && route.params.item.id_festa])
  // )

  return (
    <ScrollView style={defaultStyle.scrollView}>
      <StatusBar backgroundColor={background} />

      <View style={styles.imgView}>
        <ImageBackground
          source={partyImg}
          imageStyle={styles.img}
          style={[defaultStyle.background, { paddingLeft: 10 }]}
        >
          <BackIcon
            onPress={() => navigation.goBack()}
          />
        </ImageBackground>
      </View>

      <View style={styles.container}>
        <Text style={styles.name} >
          {route.params.item.nome_festa}
        </Text>

        <View style={styles.dateView}>
          <Text style={styles.textPink} >
            {new Date(route.params.item.inicio).toLocaleDateString()}
          </Text>

          <Text style={styles.textPink} >
            {route.params.item.fim && new Date(route.params.item.fim).toLocaleDateString()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => alert("Vai para o mapa")}
          style={styles.addressView}
        >
          <View style={styles.addressText}>
            <Text style={{ color: 'white' }} >
              Lat: {route.params.item.latitude}
            </Text>

            <Text style={{ color: 'white' }} >
              Lon: {route.params.item.longitude}
            </Text>
          </View>

          <FontAwesome
            name="map-marker"
            size={50}
            color="red"
          />
        </TouchableOpacity>

        <Text style={styles.descritionText} >
          {route.params.item.descricao}
        </Text>

        <Text style={[styles.textPink, { fontSize: 25 }]} >
          R$ {route.params.item.preco}
        </Text>

        {
          !route.params.item.fim || new Date(route.params.item.fim).getTime() >=
            new Date(Date.now()).getTime() ?
            getCurrentUser().type == 'produtor' ? null :
              <LoadingButton
                styleButton={styles.button}
                text="Participar"
                onPress={async () => (
                  await frequenta(route.params.item.id_festa)
                )
                }
              />
            : null
        }

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...defaultStyle.container,
    justifyContent: 'space-between',
    minHeight: Dimensions.get('window').height * 0.45,
  },

  imgView: {
    width: '100%',
    height: Dimensions.get('window').height * 0.45,
  },

  img: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },

  name: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold'
  },

  dateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addressView: {
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  addressText: {
    flex: 1
  },

  textPink: {
    color: pink,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  descritionText: {
    color: lightGrey,
    textAlign: 'justify'
  },

  button: {
    ...defaultStyle.button,
    marginVertical: 20,

  },
})
