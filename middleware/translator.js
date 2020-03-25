var Middleware = require("./Middleware").Middleware,
	translate = require('@vitalets/google-translate-api');

class TranslatorMiddleware extends Middleware{
	constructor(data){
		super();
		this.INTENT_NAME = "projects/services-fcf2b/agent/intents/18003fc2-b05d-4fda-8de6-70d1cbaecb47";
	}

	process(req, res){
		var text = req.queryResult.parameters.text;
		var targetLanguage = req.queryResult.parameters.target;
		var originalLanguage = req.queryResult.parameters.from;

		var self = this;
		if(originalLanguage){
			translate(text, {to: targetLanguage, from: originalLanguage})
				.then(translation => {
					res.send({
						fulfillmentText: translation.text
					});
				})
				.catch(err =>{self.error(err)});
		}else{
			translate(text, {to: targetLanguage})
				.then(translation => {
					res.send({
					followupEventInput: {
						name: "translation-response",
						parameters: {
							translatedText: translation.text,
							detectedLanguage: translation.from.language.iso
						}
					},
					outputContexts: [
						 {
					        "name": "translate",
					        "lifespanCount": 5,
					        "parameters": {
					          "translatedText": translation.text,
					          "target": targetLanguage
				        	}
				    	}
					]
					});
				})
				.catch(err =>{self.error(err)});
		}
	}
}

TranslatorMiddleware.instanceOutContextCallableMiddleware = function(data){
	var instance = new TranslatorMiddleware(data);

	return function(req, res, next){
		instance.validateAndProcess(req.body, res, next);
	};
}

TranslatorMiddleware.prototype.error = function(err){
	console.log("An error ocurred with translation api: " + err);
	this.httpresponse.send({fulfillmentText: "Im having problems with my translation skill"});
	return;
}

exports.middleware = TranslatorMiddleware.instanceOutContextCallableMiddleware