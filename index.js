const express = require("express");
const app = express();
const PORT = 80;

app.get("/googleservices", function (req, res) {
  res.send("This is a response from node app instanced in Amazon's ec2 instance");
});

app.listen(PORT, () => {
 console.log("Server started at port " + PORT);
});