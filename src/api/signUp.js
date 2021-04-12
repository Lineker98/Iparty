async function callSignUpServe(data) {
  let responseJson = {}

  try {
    responseJson = await sendUserDataToServer(data)
  }
  catch (error) {
    responseJson = {
      error: "callLoginServe: " + error.message
    }
  }

  return responseJson
}

async function sendUserDataToServer(data) {

  let link = global.URL_API + 'user/register'
  
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
      cpf: responseJson.newUser.cpf,
      birthday: responseJson.newUser.data_nascimento,
      email: responseJson.newUser.email,
      id: responseJson.newUser.id_usuario,
      name: responseJson.newUser.nome,
    }
  }
 }

const responseApi = {
  callSignUpServe,
};

export default responseApi;