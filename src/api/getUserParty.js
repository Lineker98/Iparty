async function callGetUserPartyServe(id, type) {
  let responseJson = {}

  try {
    responseJson = await sendUserIdToServer(id, type)
  }
  catch (error) {
    responseJson = {
      error: "callGetUserPartyServe: " + error.message
    }
  }

  return responseJson
}

async function sendUserIdToServer(id, type) {
  let link;

  if (type = 'produtor') {
    link = global.URL_API + 'produtor/listparties/' + String(id)
  }
  else {
    link = global.URL_API + 'user/listparties/' + String(id)
  }


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