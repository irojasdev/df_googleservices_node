const express = require("express");
const app = express();
const PORT = 5000;

app.get("/googleservices", function (req, res) {
  res.send("This is a response from node app instanced in Amazon's ec2 instance");
});

app.listen(PORT, () => {
 console.log("Server started at port 5000");
});