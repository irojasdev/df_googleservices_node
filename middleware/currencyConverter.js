var Middleware = require("./Middleware").Middleware;

class CurrencyConverterMiddleware extends Middleware{
	constructor(data){
		super();
		this.INTENT_NAME = "projects/services-fcf2b/agent/intents/bbfbdd03-3708-46bd-baef-44eb9214f4a0";
		this.apikey = data.apikey;
	}

	process(req, res, next){

		var Client = require('node-rest-client').Client;
		var client = new Client();
		var URL = "https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${apikey}";

		var args = {
		    path: { "from": req.queryResult.parameters.from, "to": req.queryResult.parameters.to, "apikey": this.apikey }
		};

		var self = this;
		client.get(URL, args, function(data){
				self.convertAmount(data)
			})
			.on("error", this.error);
	}
}

CurrencyConverterMiddleware.instanceOutContextCallableMiddleware = function(data){
	var instance = new CurrencyConverterMiddleware(data);

	return function(req, res, next){
		instance.validateAndProcess(req.body, res, next);
	};
}

CurrencyConverterMiddleware.prototype.convertAmount = function(data){
	var from = this.requestData.queryResult.parameters.from;
	var to = this.requestData.queryResult.parameters.to;
	var amount = this.requestData.queryResult.parameters.amount;

	var apiResultParamName = [from,to].join("_").toUpperCase();
	var convertedAmount = data[apiResultParamName] * amount;
	convertedAmount = convertedAmount.toFixed(2);

	let response = {
		fulfillmentText: [convertedAmount, this.requestData.queryResult.parameters.to].join(" ")
	};

	this.httpresponse.send(response);
}

CurrencyConverterMiddleware.prototype.error = function(err){
	console.err("An error ocurred with currency conversion api: " + err);
	this.httpresponse.send({fulfillmentText: "Im having problems with currency conversions, sorry for that."});
	return;
}

exports.middleware = CurrencyConverterMiddleware.instanceOutContextCallableMiddleware