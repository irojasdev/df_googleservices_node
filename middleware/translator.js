var Middleware = require("./Middleware").Middleware,
	translate = require('@vitalets/google-translate-api');

class TranslatorMiddleware extends Middleware{
	constructor(data){
		super();
		this.INTENT_NAME = ["projects/services-fcf2b/agent/intents/18003fc2-b05d-4fda-8de6-70d1cbaecb47",
							"projects/services-fcf2b/agent/intents/2969c989-9f85-4ee5-a2b2-bc59d70c80a2"];
		this.projectId = data.projectId;
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
					
					var CONTEXT_NAME = "translate";
					var context = req.queryResult.outputContexts.find(context => {return context.name.includes(CONTEXT_NAME)});

					context.parameters = {
						"translatedText": translation.text,
			            "target": targetLanguage
					};

					res.send({
					followupEventInput: {
						name: "translation",
						parameters: {
							translatedText: translation.text,
							detectedLanguage: translation.from.language.iso
						}
					},
					outputContexts: [
						 context
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