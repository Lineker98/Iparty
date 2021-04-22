async function callGetUserServe(id, type) {
  let responseJson = {}

  try {
    responseJson = await sendIdToServer(id, type)
  }
  catch (error) {
    responseJson = {
      error: "callGetUserServe: " + error.message
    }
  }

  return responseJson
}

async function sendIdToServer(id, type) {
  let link;

  if (type == 'usuario') {
    link = global.URL_API + 'user/listuser/' + String(id)
  }
  else {
    link = global.URL_API + 'produtor/' + String(id)
  }
  const response = await fetch(link, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let responseJson = await response.json();

  if (responseJson.error) {
    return responseJson
  }
  else {
    return {
      cpf: responseJson.cpf,
      password: responseJson.senha,
      birthday: responseJson.data_nascimento,
      email: responseJson.email,
      id: responseJson.id_usuario ? 
      responseJson.id_usuario: responseJson.id_produtor,
      name: responseJson.nome,
      phone: responseJson.telefone,
      type: responseJson.tipo,
    }
  }
}

const responseApi = {
  callGetUserServe,
};

export default responseApi;