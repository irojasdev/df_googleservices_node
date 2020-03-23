const express = require("express"),
	fs = require("fs"),
	https = require("https");
	//middlewares = require("./middleware/loader");

const app = express();
const config = fs.readFileSync("./app_config.json");

app.post("/googleservices", function (req, res) {
	var response = {
		fulfillmentText: "This is a response from node app instanced in Amazon's ec2 instance"
	};

	res.send(response);
});

https.createServer(config.ssh_options, app).listen(config.https_port);