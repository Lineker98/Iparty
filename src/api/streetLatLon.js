async function callGetAddressByLatLon(lat, lon) {
  let responseJson = {}

  try {
    responseJson = await sendLatLonToServer(lat, lon)
  }
  catch (error) {
    responseJson = {
      error: "callGetUserServe: " + error.message
    }
  }

  return responseJson
}

async function sendLatLonToServer(lat, lon) {

  let link = `https://us1.locationiq.com/v1/reverse.php?key=pk.5ddfe856f9346bbb99d3b3ecb1d292b0&lat=${lat}&lon=${lon}&zoom=16&accept-language=pt-br&format=json`

  const response = await fetch(link, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let responseJson = await response.json();

  if (responseJson.error) {
    return responseJson
  }
  else {
    return {
      road: responseJson.address.road,
      town: responseJson.address.town,
      neighbourhood: responseJson.address.neighbourhood,
      state: responseJson.address.state,
      country: String(responseJson.address.country_code).toUpperCase(),
    }
  }
}

const responseApi = {
  callGetAddressByLatLon,
};

export default responseApi;
