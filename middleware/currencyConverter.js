
function Middleware(data){
	this.httpresponse;
	this.httprequest;
	this.apikey = data.apikey

	var self = this;

	var outContextCallableMiddleware = function(req, res, next){
		self.process(req, res, next);
	};

	return outContextCallableMiddleware;
}

Middleware.prototype.INTENT_ID = "bbfbdd03-3708-46bd-baef-44eb9214f4a0";

Middleware.prototype.process = function(req, res, next){

	if(this.isValidRequest(req)){
		console.log("Currency Conversion processing");

		this.httpresponse = res;
		this.httprequest = req;

		var client = new require('node-rest-client').Client();
		var URL = "https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${apikey}";

		var args = {
		    data: { from: req.parameters.from, to: req.parameters.to, apikey: this.apikey }
		};

		client.get(URL, args, this.convertAmount)
			.on("error", this.error);

		return;
	}else{
		return next();
	}
}

Middleware.prototype.isValidRequest = function(req){
	return this.INTENT_ID == (req.intent || {}).id;
}

Middleware.prototype.convertAmount = function(data){
	let response = {
		fulfillmentText: [data[0], this.httprequest.parameters.to].join(" ")
	};

	this.httpresponse.send(response);
}

Middleware.prototype.error = function(err){
	console.err("An error ocurred with currency conversion api: " + err);
}

exports.CurrencyConverterMiddleware = Middleware