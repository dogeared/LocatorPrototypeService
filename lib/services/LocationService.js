var LocationService = exports;

LocationService.setLocation = function(req, callback) {
  var name = req.body.name;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var response = { result: '', message: ''};

  if (nil(name) || nil(latitude) || nil(longitude)) {
    response.result = "Error";
    response.message = "Must pass in name, latitude and longitude parameters."
  }
  else {
    locations[name] = { latitude: latitude, longitude: longitude };
    response.result = "Success";
    response.message = "Set location for " + name;
  }
  callback(response);
};

LocationService.getLocation = function(req, callback) {
  var name = req.body.name;
  var response = { result: '', message: ''};

  if (nil(name)) {
    response.result = "Error";
    response.message = "Must pass in name parameter.";
  }
  else {
    var location = locations[name];
    if (nil(location)) {
      response.result = "Error";
      response.message = name + " not found";
    }
    else {
      response.result = "Success";
      response.message = "Got location for " + name;
      response.latitude = location.latitude;
      response.longitude = location.longitude;
    }
  }
  callback(response);
}