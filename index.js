global._projectpath = __dirname;

const express = require("express"),
	fs = require("fs"),
	https = require("https")
	middlewares = require("./middleware/loader");

const app = express();
const router = express.Router();
const config = JSON.parse(fs.readFileSync("./app_config.json", "utf8"));

const ssh_options = new Object();
ssh_options.key = fs.readFileSync(config.ssh.key_file);
ssh_options.cert = fs.readFileSync(config.ssh.cert_file);
ssh_options.passphrase = config.ssh.passphrase;

router.post("/googleservices", middlewares.pool, function (req, res){res.send({fulfillmentText: "Amazon ec2 webhook response"})});

https.createServer(ssh_options, app).listen(config.https_port);