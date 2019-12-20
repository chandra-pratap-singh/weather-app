const request = require("request");
const getgrid = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    adress
  )}.json?access_token=pk.eyJ1IjoiY2hhbmRyYXByYXRhcCIsImEiOiJjazQ4Mnd3ZTYwMjN5M2xwajh5bGZ2ZGNuIn0.0EaN4hDIpvl142GJ45uqhw`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      return callback(true, error);
    } else {
      const data = {
        longitude: response.body.features[0].center[1],
        lattitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      };
      return callback(false, data);
    }
  });
};

module.exports = getgrid;
