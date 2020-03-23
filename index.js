const express = require("express"),
	fs = require("fs"),
	https = require("https");

const app = express();
const PORT = 5000,
	HTTPS_PORT = 5050;

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/irojas91dev.ddns.net/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/irojas91dev.ddns.net/fullchain.pem")
}

app.get("/googleservices", function (req, res) {
  res.send("This is a response from node app instanced in Amazon's ec2 instance");
});

app.listen(PORT, () => {
 console.log("Server started at port " + PORT);
});

https.createServer(options, app).listen(HTTPS_PORT);