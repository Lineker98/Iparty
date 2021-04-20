async function callGetUserPartyServe(id) {
  let responseJson = {}

  try {
    responseJson = await sendUserIdToServer(id)
  }
  catch (error) {
    responseJson = {
      error: "callGetUserPartyServe: " + error.message
    }
  }

  return responseJson
}

async function sendUserIdToServer(id) {

  let link = global.URL_API + 'user/listparties/' + String(id)

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
  callGetUserPartyServe,
};

export default responseApi;