(function() {

	var main = null;

	function init() {
		var searchForm = document.getElementById('search-form');
		searchForm.addEventListener('submit', function(evt) {
			search();
			return false;
		}, true);
		$('li > a').each(function() {
			var link = this;
			link.addEventListener('click', function() {
				var parts = this.innerHTML.split(' - ');
				var href = parts[parts.length - 1];
				link.setAttribute('href', '#'+href);
				$('li > a').each(function() {
					$(this.parentNode).removeClass('active');
				});
				$(link.parentNode).addClass('active');
				preSearch(href);
			});
		});
		preSearch();
	}

	function preSearch(chord) {
		if ( chord == undefined ) {
			var address = location.href;
			var parts = address.split('#');
			if ( parts.length > 1 ) {
				chord = parts[parts.length - 1];
			}
		}
		if ( chord != undefined ) {
			var searchInput = $('#search-input');
			searchInput.val(chord);
			search();
		}
	}

	function search() {
		var searchInput = $('#search-input');
		var searchTerm = searchInput.val();

		console.log( 'searching:', searchTerm )

	}

	window.addEventListener('load', init, false);	

})();