const express = require("express"),
	fs = require("fs"),
	https = require("https");

const app = express();
const PORT = 5000,
	HTTPS_PORT = 5050;

const options = {
  key: fs.readFileSync("/home/ec2-user/sshCertificates/privkey.pem"),
  cert: fs.readFileSync("/home/ec2-user/sshCertificates/fullchain.pem"),
  passphrase: "Zizu2015"
}

app.all("/googleservices", function (req, res, next) {
  res.send("This is a response from node app instanced in Amazon's ec2 instance");
  next();
});

app.listen(PORT, () => {
 console.log("Server started at port " + PORT);
});

https.createServer(options, app).listen(HTTPS_PORT);