// Publish results to CheapAutomation.js when done.
QUnit.done = function(result) { 
	if(window !== window.top){
		window.top.$(window.top.document).trigger('tests-done', { result: result, resultHtml: $("#qunit-testresult").html() });
	}
};
