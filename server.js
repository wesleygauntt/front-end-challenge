/*
	Directions: This challenge must be hosted on a web server of some kind, 
	because the Javascript code does make some AJAX calls.
*/

//Require express dependencies and declare port. Example from instructions shows the use of port 8888.
var express = require("express");
var app = express();
var port = process.env.PORT || 8888;

//Serve the base directory as static files.
app.use(express.static(__dirname + "/"));

//Declare views. Could be refactored to specify a 'views' directory.
app.set("views", __dirname + "/");

//Declare the view engine to parse HTML files.
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//Set routes. Can be refactored to get routes from a 'routes' directory.
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/products", function (req, res) {
  res.json(require('./data.json'));
});

//Start the server.
app.listen(port, function() {
  console.log("Server spinning on port " + port);
});
