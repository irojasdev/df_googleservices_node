
function Middleware(data){
	this.httpresponse;
	this.httprequest;
	this.apikey = data.apikey

	var self = this;

	var outContextCallableMiddleware = function(req, res, next){
		self.process(req.body, res, next);
	};

	return outContextCallableMiddleware;
}

Middleware.prototype.INTENT_NAME = "projects/services-fcf2b/agent/intents/bbfbdd03-3708-46bd-baef-44eb9214f4a0";

Middleware.prototype.process = function(req, res, next){

	var self = this;

	if(this.isValidRequest(req)){

		this.httpresponse = res;
		this.httprequest = req;

		var Client = require('node-rest-client').Client;
		var client = new Client();
		var URL = "https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${apikey}";

		var args = {
		    path: { "from": req.queryResult.parameters.from, "to": req.queryResult.parameters.to, "apikey": this.apikey }
		};

		client.get(URL, args, function(data){
				self.convertAmount(data)
			})
			.on("error", this.error);

		return;
	}else{
		return next();
	}
}

Middleware.prototype.isValidRequest = function(req){
	return this.INTENT_NAME == (req.queryResult.intent || {}).name;
}

Middleware.prototype.convertAmount = function(data){
	var from = this.httprequest.queryResult.parameters.from;
	var to = this.httprequest.queryResult.parameters.to;
	var amount = this.httprequest.queryResult.parameters.amount;

	var apiResultParamName = [from,to].join("_").toUpperCase();
	var convertedAmount = data[apiResultParamName] * amount;
	convertedAmount = convertedAmount.toFixed(2);

	let response = {
		fulfillmentText: [convertedAmount, this.httprequest.queryResult.parameters.to].join(" ")
	};

	this.httpresponse.send(response);
}

Middleware.prototype.error = function(err){
	console.err("An error ocurred with currency conversion api: " + err);
}

exports.CurrencyConverterMiddleware = Middleware