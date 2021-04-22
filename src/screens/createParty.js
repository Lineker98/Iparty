import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native'

import BackIcon from '../components/button/backIcon'
import { FontAwesome } from '@expo/vector-icons';
import LoadingButton from '../components/button/loadingButton'
import Calender from '../components/button/calender';

import partyImg from '../assets/party.png'
import { background, darkBlue, lightGrey, pink } from '../styles/color'
import defaultStyle from '../styles/defaultStyle'

import streetApi from '../api/streetLatLon'
import createPartyApi from '../api/createParty'
import { AuthContext } from '../components/dados/context'

const now = new Date(Date.now())

export default function createParty({ route, navigation }) {

  const { getCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [start, setStart] = useState(now);
  const [end, setEnd] = useState(now);
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [listAddress, setListAddress] = useState([]);
  const [descrition, setDescrition] = useState("");
  const [price, setPrice] = useState("");

  const onChangeAddress = (text) => {
    setAddress(text)
    text != '' ?
      streetApi
        .callGetAddress(text)
        .then((positions) => {
          if (!positions.error) {
            setListAddress(positions);
          }
          else {
            setListAddress([]);
          }
        })
      : null
  };

  function onPressCard(item) {
    setAddress(item.address);
    setLon(item.lon);
    setLat(item.lat);
    setListAddress([]);
  }

  async function onPressCreateButton() {
    let data = {
      "preco": price,
      "inicio": start,
      "fim": end,
      "descricao": descrition,
      "longitude": lon,
      "latitude": lat,
      "nome_festa": name,
      "id_produtor": getCurrentUser().id
    }

    let party = await createPartyApi.callPartyServe(data);

    if (party.error) {
      alert(party.error)
    }
    else {
      setName("");
      setStart(now);
      setEnd(now);
      setAddress("");
      setLat("");
      setLon("");
      setListAddress([]);
      setDescrition("");
      setPrice("");
      navigation.navigate('map', { lat, lon })
    }
  }


  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || start;

    var newDate = new Date(currentDate)
    setStart(newDate)
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || end;

    var newDate = new Date(currentDate)
    setEnd(newDate)
  };

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
        <TextInput
          style={defaultStyle.input}
          placeholderTextColor={defaultStyle.input.color}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.dateView}>
          <Calender
            onChange={onChangeStart}
            text='Início'
            styleText={styles.dateText}
            styleDate={styles.dateText}
            styleContainer={styles.date}
          />

          <Calender
            onChange={onChangeEnd}
            text='Fim'
            styleText={styles.dateText}
            styleDate={styles.dateText}
            styleContainer={styles.date}
          />
        </View>

        <View style={styles.addressView}>
          <TextInput
            style={[defaultStyle.input, { flex: 1, marginBottom: 0 }]}
            placeholderTextColor={defaultStyle.input.color}
            placeholder="Endereço"
            value={address}
            onChangeText={setAddress}
          />
          <FontAwesome
            name="search"
            size={35}
            color={pink}
            onPress={() => onChangeAddress(address)}
          />
        </View>

        <FlatList
          data={listAddress}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => onPressCard(item)}
            >
              <Text style={{ color: 'white', textAlign: 'justify' }}>
                {item.address}
              </Text>
              <FontAwesome
                name="map-marker"
                size={50}
                color="white"
              />
            </TouchableOpacity>
          )}
          horizontal={true}
        />

        <TextInput
          style={[defaultStyle.inputHorizontal, { marginTop: 15 }]}
          placeholderTextColor={defaultStyle.input.color}
          placeholder="Descrição"
          value={descrition}
          onChangeText={setDescrition}
        />

        <TextInput
          style={defaultStyle.input}
          placeholderTextColor={defaultStyle.input.color}
          placeholder="R$ Preço"
          value={price}
          onChangeText={setPrice}
          keyboardType='numeric'
        />

        <LoadingButton
          styleButton={styles.button}
          text="Criar"
          onPress={async () => await onPressCreateButton()
          }
        />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...defaultStyle.container,
    justifyContent: 'space-between',
    minHeight: Dimensions.get('window').height * 0.45,
    marginTop: 20,
  },

  imgView: {
    width: '100%',
    height: Dimensions.get('window').height * 0.45,
  },

  img: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },

  dateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addressView: {
    borderRadius: defaultStyle.input.borderRadius,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkBlue,
    paddingRight: 10,
  },

  button: {
    ...defaultStyle.button,
    marginVertical: 20,

  },

  card: {
    backgroundColor: pink,
    flex: 1,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    maxWidth: 200,
    borderRadius: 20,
    marginRight: 20,
    marginVertical: 20
  },

  dateText: {
    color: 'white',
    fontWeight: 'bold'
  },

  date: {
    ...defaultStyle.input,
    backgroundColor: pink,
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 20,
  },
})
