exports.middleware = function (data){
	var INTENT_ID = "268ab743-2bec-4e7e-abc6-fc3c5e5ecedd";

	return function(req, res, next){

		if(INTENT_ID !== (req.intent || {}).id){
			return next();
		}
		
		console.log("Calendar middleware implementation");
	}
}