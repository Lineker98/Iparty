async function callUserSearchServe(name) {
  let responseJson = {}

  try {
    responseJson = await sendUserNameToServer(name)
  }
  catch (error) {
    responseJson = {
      error: "callGetUserPartyServe: " + error.message
    }
  }

  return responseJson
}

async function sendUserNameToServer(name) {

  let link = global.URL_API + 'user/listusers/' + String(name)

  const response = await fetch(link, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let responseJson = await response.json();

  return responseJson
}

const responseApi = {
  callUserSearchServe,
};

export default responseApi;