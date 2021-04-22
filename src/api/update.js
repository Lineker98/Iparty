async function callUpdateServe(id, type, data) {
  let responseJson = {}

  try {
    responseJson = await sendIdToServer(id, type, data)
  }
  catch (error) {
    responseJson = {
      error: "callUpdateServe: " + error.message
    }
  }

  return responseJson
}

async function sendIdToServer(id, type, data) {
  let link;

  if (type != 'produtor') {
    link = global.URL_API + 'user/updateUser/' + String(id)
  }
  else {
    link = global.URL_API + 'produtor/' + String(id)
  }
  const response = await fetch(link, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  let responseJson = await response.json();

  return responseJson
}

const responseApi = {
  callUpdateServe,
};

export default responseApi;