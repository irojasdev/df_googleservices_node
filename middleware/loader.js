const fs = require("fs");

const keys = JSON.parse(fs.readFileSync(global._projectpath + "/middleware/keys.json"));

exports.middlewaresPool = [
	require("./currencyConverter").middleware(keys.currencyConverterAPIKey),
	require("./calendar").middleware,
	require("./translator").middleware,
];














