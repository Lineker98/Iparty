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

  let link = global.URL_API + 'user/authenticate'
  

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
      cpf: responseJson.user.cpf,
      birthday: responseJson.user.data_nascimento,
      email: responseJson.user.email,
      id: responseJson.user.id_usuario,
      name: responseJson.user.nome,
    }
  }
 }

const responseApi = {
  callLoginServe,
};

export default responseApi;