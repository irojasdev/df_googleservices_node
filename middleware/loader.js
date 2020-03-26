const fs = require("fs");

const keys = JSON.parse(fs.readFileSync(global._projectpath + "/middleware/keys.json"));

exports.pool = [
	require("./currencyConverter").middleware({apikey: keys.currencyConverterAPIKey}),
	require("./translator").middleware({projectId: keys.projectId}),
];














