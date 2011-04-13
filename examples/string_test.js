$(document).ready(function(){

	module("String");
	
	test("supplant", function(){
		equal("C{we}ford is cool".supplant({we:'rock'}), "Crockford is cool", 
			"Should replace objects with single arguments.");
		equal("Cr{oh}ckford is c{oh}{oh}l".supplant({oh:'o'}), "Crockford is cool", 
			"Should make multiple replacements with a single property.");
		equal("{name} is {adjective}".supplant({name: 'Crockford', adjective:'grumpy'}), 
			"Crockford is grumpy", "Should replace multiple properties.");
		
		var obj = {
				name: 'Crockford'
			, adjective: 'grumpy and cool'
			, unused: function(){}
			, empty: true
			, multiplyer: 3
		}
		
		equal("{name} is {adjective} times {multiplyer}.{empty}{unused}".supplant(obj), "Crockford is grumpy and cool times 3.{empty}{unused}", 
			"Should ignore properties that are not strings or numbers.");

		equal("{name} is \n{adjective}\n.".supplant(obj), 
				"Crockford is \ngrumpy and cool\n.", 
				"Should work with multiple line strings.");

	});
	

});
