var cheapoMation = (function(){
	var pages = [],
			currentPage = null,
			failures = 0;
	return {
		runTests: function(linkSelector){
			this.reset();
			pages = $(linkSelector).map(function(i, el){
				return $(this).attr('href');
			}).toArray();
			this.runNext();
		},

		runNext: function(){
			if(pages.length > 0) {
				currentPage = pages.shift();
				$('#iframe-runner').attr('src', currentPage);
			} else {
				$(document.body).addClass((failures > 0) ? 'failed' : 'passed'); 
			}
		},
	
		testReceived: function(event, data){
			var lnk = $('a[href="' + currentPage +'"]');
			lnk.after(function(){
				return '<div class="result '+ (data.result.failed !== 0 ? 'failed' : 'passed' ) +'">' + data.resultHtml + '</div>';
			});
			failures += data.result.failed;
			this.runNext();
		},
	
		reset: function(){
			currentPage = null;
			failures = 0;
			$('#iframe-runner').attr('src', '');
			$('div.result').remove();
			$(document.body).removeClass('failed passed');
		}
	};
}());

$(document).ready(function(){
	$('a#cheapomate').bind('click', function(e){
		e.preventDefault();
		e.stopPropagation();
		cheapoMation.runTests('ul > li > a');
	});

	$(document).bind('tests-done', $.proxy(cheapoMation,'testReceived'));
	
});
