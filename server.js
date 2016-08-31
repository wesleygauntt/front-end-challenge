/*
	Task: This challenge must be hosted on a web server of some kind, 
	because the Javascript code does make some AJAX calls.

	Solution: Node + Express! Be sure to run 'npm install' before running the server.
*/

//Require express dependencies and declare port. Example from instructions shows the use of port 8888.
var express = require("express");
var app = express();
var port = process.env.PORT || 8888;

//Serve the base directory as static files. Can be refactored into a public folder for larger projects.
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

//Get route to retrieve products.
app.get("/products", function (req, res) {
  res.json(require('./data.json'));
});

//Start the server.
app.listen(port, function() {
  console.log("Server spinning on port " + port);
});

/*
	Task: Give any thoughts or commentary on your solution. 
	What things would you optimize? If you could use libraries, 
	what libraries would you use?

	Answer:
		I think that this is a great challenge. Typically, coding challenges have you build something
	from scratch. That's great, but it's not terribly likely in a real-world scenario (when joining a 
	team) that you will be build the application fromt the ground up. Moreoften than not, you'll find 
	yourself working on an existing project. This challenge exemplifies that -- jumping into existing 
	code and making chages accordingly.

		If I were to optimize this my solution with the use of a library, I would hands down use ejs
	(embedded JavaScript) templating. It effectivly eliminates functions such as productobj.updatehtml, 
	and uses basic Javascript to perform the same functionality with more clarity and less coding. 
	Additionally, there were spots that could have been broken out into separate folders for a more clear
	directory flow (for example, breaking out the routes into their own folder), but for a project/exmaple
	of this size, it is probably more hassle than it's worth. I did take some personal liberties as far 
	as additional styling goes, while being careful to include all instructions that were detailed in the 
	readme. I do hope that this does not count against me, but am honestly please with the final result. 
	I'm no designer, but I took being 'visually elegant' to heart!

		Lastly, as an overall review -- this challenge has helped me become a better developer. Each time
	a developer jumps into another's code, it can bring light to new methods and strategies to achieve the
	same goal. If whoever is evaluating this has the chance, I would love the opportunity to receive feedback.
	Every opportunity is a new learning experience -- Thank you for selecting me to attempt this challenge!

	Best,
	Wesley Gauntt
	wesleygauntt92@gmail.com
*/