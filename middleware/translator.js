exports.middleware = function (data){
	var INTENT_ID = "18003fc2-b05d-4fda-8de6-70d1cbaecb47";

	return function(req, res, next){

		if(INTENT_ID !== (req.intent || {}).id){
			return next();
		}

		console.log("Translator middleware implementation");
	}

}