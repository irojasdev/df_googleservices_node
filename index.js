const express = require("express"),
	fs = require("fs"),
	https = require("https");
	//middlewares = require("./middleware/loader");

const app = express();
const config = fs.readFileSync("./app_config.json");

const ssh_options = new Object();
ssh_options.key = fs.readFileSync(config.ssh.key_file);
ssh_options.cert = fs.readFileSync(config.ssh.cert_file);
ssh_options.passphrase = config.ssh.passphrase;

app.post("/googleservices", function (req, res) {
	var response = {
		fulfillmentText: "This is a response from node app instanced in Amazon's ec2 instance"
	};

	res.send(response);
});

https.createServer(ssh_options, app).listen(config.https_port);