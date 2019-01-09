const request = require('request');

var geocodeAddress = (addressString, callback) => {
  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=CZsmVXbxt9AkjAyoSI95l3FUjDdsbhWq&location=${encodeURIComponent(addressString)}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to mapquestapi');
    }
    else if (body.info.statuscode !== 0) {
      callback('No address matching...');
    }
    else if (body.info.statuscode === 0) {
      callback(undefined, {
        address: `${body.results[0].locations[0].street}, ${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].postalCode}, ${body.results[0].locations[0].adminArea1}`,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      })
    }
  });
};

module.exports = {
  geocodeAddress
}
