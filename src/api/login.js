async function callLoginServe(email,password) {
  let responseJson = {}

  try {
    responseJson = await sendEmailPassToServer(email,password)
  }
  catch (error) {
    responseJson = {
      error: "callLoginServe: " + error.message
    }
  }

  return responseJson
}

async function sendEmailPassToServer(email,password) {

  let link = global.URL_API + 'general/authenticate'
  

  const dados = {
    email: email,
    senha: password,
  };

  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  let responseJson = await response.json();

  if (responseJson.error) {
    return responseJson
  }
  else {
    return {
      cpf: responseJson.cpf,
      birthday: responseJson.data_nascimento,
      email: responseJson.email,
      id: responseJson.id_usuario,
      name: responseJson.nome,
      type: responseJson.tipo,
    }
  }
 }

const responseApi = {
  callLoginServe,
};

export default responseApi;