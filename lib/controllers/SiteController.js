app.get('/', function(req,res) {
  exec("ulimit -a", function(err, stdout, stderr) {
    res.send("Welcome to the processing services layer!\n\n<pre>" +
      stdout + "</pre>");
  });
});
