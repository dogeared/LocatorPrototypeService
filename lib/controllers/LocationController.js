app.post('/setLocation', function(req,res) {
  LocationService.setLocation(req, function(result) {
    console.log(result);
    res.send(result);
  });
});

app.post('/getLocation', function(req, res) {
  LocationService.getLocation(req, function(result) {
    console.log(result);
    res.send(result);
  });
});
