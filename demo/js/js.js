(function() {

	var ALL_LOADED = false;

	function init() {
		ALL_LOADED = true;
		var searchForm = document.getElementById('search-form');
		searchForm.addEventListener('submit', function(evt) {
			evt.preventDefault();
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
		window.addEventListener('popstate', function(evt) {
			if ( ALL_LOADED == false ) {
				init();
			} else {
				preSearch();
			}
		});
		preSearch();
	}

	function preSearch(chord) {
		if ( chord == undefined ) {
			var address = location.href;
			var parts = address.split('#');
			if ( parts.length > 1 ) {
				chord = parts[parts.length - 1];
			} else {
				chord = '';
			}
		}
		if ( chord == '' ) {
			$('#search-input').val('');
		} else if ( chord != undefined ) {
			$('#search-input').val(chord);
			search();
		}
	}

	function search() {
		var searchInput = $('#search-input');
		var searchTerm = searchInput.val();
		//
		var results = $('#main-results');
		results.find('td').each(function() {
			this.innerHTML = '';
		});
		results.removeClass('hide');
		//
		var instr = document.getElementById('instrument');
		var openStrings = document.getElementById('open-strings');
		//
		for ( var i = 0 ; i < searchTerm.length ; i++ ) {
			var number = searchTerm.charAt(i);
			if ( number == 'x' || number == '0' ) {
				var row = openStrings.rows[0]
				var cell = row.cells[i];
				cell.innerHTML = number == 'x' ? 'X' : 'O';
			} else {
				var row = instr.rows[number - 1]
				var cell = row.cells[i];
				cell.innerHTML = 'O';
			}
		}
	}

	window.addEventListener('load', init, false);	

})();