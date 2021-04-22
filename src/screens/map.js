import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Callout } from 'react-native-maps';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Animated
} from 'react-native';

import { Slider } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';

import { mapStyle } from '../components/dados/map'
import Button from '../components/button/button'
import { background, lightGrey, pink } from '../styles/color';
import defaultStyle from '../styles/defaultStyle';

import partiesApi from '../api/getParties'

export default function App({ navigation }) {
  const [permission, askForPermission] = Permissions
    .usePermissions(
      Permissions.LOCATION,
      { ask: true }
    );

  const [parties, setParties] = useState([]);
  const [days, setDays] = useState(200);

  useFocusEffect(
    useCallback(() => {
      callPartyServe()
      return () => {
        //navigation.setParams({ item: undefined })
      }

    }, [])
  )

  async function callPartyServe() {
    partiesApi
      .callGetPartyServe(days)
      .then((snapshot) => {
        if (!snapshot.error) {
          setParties(snapshot);
        }
        else {
          alert(snapshot.error)
        }
      })
  }

  if (!permission || permission.status !== 'granted') {
    return (
      <View style={styles.alertView}>
        <Text style={styles.alertText}>
          Você precisa permitir acesso a sua localização
        </Text>
        <Button
          styleButton={[defaultStyle.button, { maxHeight: 100 }]}
          text="Fornecer permissão"
          onPress={askForPermission}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'black'}
      />

      <View style={styles.slider}>
        <View>
          <Slider
            value={days}
            onValueChange={(days) => {
              setDays(days)

            }}
            thumbStyle={{ flex: 1, backgroundColor: pink }}
            trackStyle={{
              width: Dimensions.get('window').width * 0.75,
              backgroundColor: 'transparent',
            }}
            maximumValue={200}
            minimumValue={0}
          />
          <Text style={styles.name}>Dias: {days.toFixed(0)}</Text>
        </View>
        <FontAwesome
          name="search"
          size={35}
          color={pink}
          onPress={() => callPartyServe()}
        />
      </View>

      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
      //onUserLocationChange={(position) => this.onUserLocationChange(position)}
      >
        {
          parties.map((party, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: party.latitude,
                  longitude: party.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                key={party.id_festa}
                pinColor='red'
                style={{ backgroundColor: 'black' }}
              >
                <Callout tooltip
                  onPress={
                    () => navigation.navigate(
                      'moreinfo',
                      { item: party }
                    )
                  }
                >
                  <View>
                    <View style={styles.bubble}>
                      <Text style={styles.text} numberOfLines={2}>
                        {party.nome_festa}
                      </Text>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.name}>
                          {new Date(party.inicio).toLocaleDateString()}
                        </Text>
                        <Text style={styles.name}>
                          {party.fim && new Date(party.fim).toLocaleDateString()}
                        </Text>
                      </View>

                      <Button
                        text="Mais informação"
                      />
                    </View>

                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </Callout>
              </Marker>
            )
          })
        }

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },

  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },

  name: {
    fontSize: 12,
    color: lightGrey,
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },

  alertText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },

  alertView: {
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    width: "94%",
  },

  image: {
    width: "100%",
    height: 80,
  },

  slider: {
    position: 'absolute',
    top: '80%',
    zIndex: 2,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});