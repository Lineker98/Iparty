import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";

import { background, lightGrey } from "../../styles/color";
import defaultStyle from "../../styles/defaultStyle";

export default function card({
  item = {},
  onPostPress = () => { },
}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.info} 
      onPress={() => onPostPress(item)}>
        <Image
          source={{
            uri: "https://picsum.photos/seed/" + Math.random() + "/500/500",
          }}
          resizeMode={"cover"}
          style={styles.imagenView}
        />
        <View style={{flex:3}}>
          <Text style={styles.title}>{item.nome_festa}</Text>
          <Text style={styles.text}>
            R$ {item.preco}
          </Text>
          <Text style={styles.text}>
            Data de inicio = {new Date(item.inicio).toLocaleDateString('pt-br')}
          </Text>
          <Text style={styles.text}>
            Data de fim = {
              item.fim ?
                new Date(item.fim).toLocaleDateString('pt-br')
                :
                "xx/xx/xxxx"
            }
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
    alignSelf: "center",
    width: "100%",
    height: 130,
    justifyContent: "space-between",
  },

  info:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  title: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 15
  },

  text: {
    color: lightGrey,
  },

  imagenView: {
    flex: 1.5,
    width: "100%",
    height:"100%",
    overflow: "hidden",
    marginRight:10
    
  },
});