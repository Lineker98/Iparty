import * as SecureStore from "expo-secure-store";
import _ from "lodash";

async function set(data) {
  try {
    let userData = JSON.stringify(data)
    await SecureStore.setItemAsync('userData', userData);
    return await get()
  }
  catch (error) {
    return { error: "It was not possible to store userData" }
  }
}

async function get() {
  try {
    const dados = await SecureStore.getItemAsync('userData');
    return JSON.parse(dados)
  }
  catch (error) {
    return { error: "It was not possible to get userData" }
  }
}

async function delet() {
  try {
    await SecureStore.deleteItemAsync('userData')
  }
  catch (error) {
    return { error: "It was not possible to delet userData" }
  }
}

const responseApi = {
  set, get, delet,
};

export default responseApi;