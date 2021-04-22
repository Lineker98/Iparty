async function callUpdateServe(id, type) {
  let responseJson = {}

  try {
    responseJson = await sendIdToServer(id, type)
  }
  catch (error) {
    responseJson = {
      error: "callDeleteServe: " + error.message
    }
  }

  return responseJson
}

async function sendIdToServer(id, type) {
  let link;

  if (type == 'produtor') {
    link = global.URL_API + 'updateUser/' + String(id)
  }
  else {
    link = global.URL_API + 'produtor/' + String(id)
  }
  const response = await fetch(link, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let responseJson = await response.json();

  return responseJson


}

const responseApi = {
  callUpdateServe,
};

export default responseApi;