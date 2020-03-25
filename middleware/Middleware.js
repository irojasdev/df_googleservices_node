var Middleware = class{
	constructor(){
		this.httpresponse = null;
		this.requestData = null;
		this.INTENT_NAME = "TBD";
	}

	process(req, res){
		console.err("Implement process function in your Middleware implementation");
	}
}

Middleware.prototype.validateAndProcess = function(req, res, next){
	this.requestData = req;
	this.httpresponse = res;

	if(!this.isValidRequest(req)){
		return next();
	}else{
		return this.process(req, res);
	}
}

Middleware.prototype.isValidRequest = function(req){
	return this.INTENT_NAME == (req.queryResult.intent || {}).name;
}

exports.Middleware = Middleware;