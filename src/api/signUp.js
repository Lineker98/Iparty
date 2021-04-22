async function callSignUpServe(data) {
  let responseJson = {}

  try {
    responseJson = await sendUserDataToServer(data)
  }
  catch (error) {
    responseJson = {
      error: "callSignUpServe: " + error.message
    }
  }

  return responseJson
}

async function sendUserDataToServer(data) {
  let link;

  if (data.tipo == 'usuario') {
    link = global.URL_API + 'user/register'
  }
  else {
    link = global.URL_API + 'produtor/register'
  }

  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  let responseJson = await response.json();

  if (responseJson.error) {
    return responseJson
  }
  else {
    return {
      cpf: responseJson.cpf ?
        responseJson.cpf : responseJson.cnpj,
      birthday: responseJson.data_nascimento,
      email: responseJson.email,
      id: responseJson.id_usuario ?
        responseJson.id_usuario : responseJson.id_produtor,
      name: responseJson.nome,
      phone: responseJson.telefone,
      type: String(responseJson.tipo).toLowerCase(),
    }
  }
}

const responseApi = {
  callSignUpServe,
};

export default responseApi;