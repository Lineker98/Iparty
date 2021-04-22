async function callFrequentaServe(data) {
  let responseJson = {}

  try {
    responseJson = await sendPartyDataToServer(data)
  }
  catch (error) {
    responseJson = {
      error: "callPartyServe: " + error.message
    }
  }

  return responseJson
}

async function sendPartyDataToServer(data) {

  let link = global.URL_API + 'user/UserInParty'

  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  let responseJson = await response.json();
  return responseJson
}

const responseApi = {
  callFrequentaServe,
};

export default responseApi;