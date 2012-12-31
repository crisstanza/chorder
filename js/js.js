(function() {

	var main = null;

	function init() {
		var searchForm = document.getElementById('search-form');
		searchForm.addEventListener('submit', function(evt) { console.log( searchForm ); }, true);


		var x = $('#search-form');
		console.log(x);

	}

	window.addEventListener('load', init, false);	

})();