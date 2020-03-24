exports.middleware = function(apikey){
	return function(req, res){
		console.log(apikey);
		console.log("Currency Conversion middleware implementation");

		//apply logic
	}
}