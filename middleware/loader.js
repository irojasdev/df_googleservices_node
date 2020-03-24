const fs = require("fs"),
	CurrencyConverterMiddleware = require("./currencyConverter").CurrencyConverterMiddleware;

const keys = JSON.parse(fs.readFileSync(global._projectpath + "/middleware/keys.json"));

exports.pool = [
	new CurrencyConverterMiddleware({"apikey": keys.currencyConverterAPIKey}),
	require("./calendar").middleware(),
	require("./translator").middleware(),
];














