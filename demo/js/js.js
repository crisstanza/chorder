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
		document.getElementById('search-button').removeAttribute('disabled');
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
		var searchTerm = $.trim(searchInput.val());
		var results = $('#main-results');
		results.find('td').each(function() {
			this.innerHTML = '';
		});
		results.addClass('hide');
		if ( searchTerm == '' ) {
			$('#validation-highlight').addClass('error');
			searchInput.focus();
		} else {
			if ( ! validInput(searchTerm) ) {
				$('#validation-highlight').addClass('error');
				searchInput.focus();
				$('#validation-message').removeClass('hide');
			} else {
				$('#validation-highlight').removeClass('error');
				$('#validation-message').addClass('hide');
				results.removeClass('hide');
				var instr = document.getElementById('instrument');
				var openStrings = document.getElementById('open-strings');
				for ( var i = 0 ; i < searchTerm.length ; i++ ) {
					var number = searchTerm.charAt(i);
					if ( number == 'x' ) {
						number = 'X';
					}
					if ( number == 'X' || number == '0' ) {
						var row = openStrings.rows[0]
						var cell = row.cells[i];
						cell.innerHTML = number == 'X' ? 'X' : 'O';
					} else {
						var row = instr.rows[number - 1]
						var cell = row.cells[i];
						cell.innerHTML = 'O';
					}
				}
				$('html, body').animate( { scrollTop: $("#main-search-box").offset().top - 20 }, 200);
				$('li > a').each(function() {
					var parts = this.innerHTML.split(' - ');
					var chord = parts[parts.length - 1];
					if ( searchTerm == chord ) {
						$(this.parentNode).addClass('active');
					} else {
						$(this.parentNode).removeClass('active');
					}
				});
			}
		}
	}

	function validInput(chord) {
		if ( chord.length == 6 ) {
			return /^[\d|x]{6}$/i.test(chord);
		} else if ( chord.length == 12 ) {
			return /^[\d|x]{12}$/i.test(chord);
		} else {
			return false;
		}
	}

	window.addEventListener('load', init, false);	

})();