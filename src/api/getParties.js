async function callGetPartyServe(number) {
  let responseJson = {}

  try {
    responseJson = await sendNumberToServer(number)
  }
  catch (error) {
    responseJson = {
      error: "callGetUserPartyServe: " + error.message
    }
  }

  return responseJson
}

async function sendNumberToServer(number) {
  let link = global.URL_API + 'user/dataParties/' + String(number)
  
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
  callGetPartyServe,
};

export default responseApi;