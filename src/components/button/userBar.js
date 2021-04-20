import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { lightGrey } from "../../styles/color";

import photo from '../../assets/profile.png'

export default function userBar({
  name,
  email,
  image,
  style = { height: 40 },
  styleText,
  size = 'medium',
  onPress = () => { },
}) {
  return (
    <View style={[styles.viewUser, style]}>
      <TouchableOpacity onPress={() => onPress()}>
        <Avatar rounded source={image ? { uri: image } : photo} size={size} />
      </TouchableOpacity>
      <View style={styles.viewText}>
        <Text style={[styles.userName, styleText]}>{name}</Text>
        <Text style={styles.email}> {email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUser: {
    alignItems: "center",
    flexDirection: "row",
  },

  viewText:{
    justifyContent:'center',
    marginLeft: 10,
  },

  userName: {
    fontWeight: "bold",
    color: 'white',
  },

  email: {
    color: lightGrey,
  },
});