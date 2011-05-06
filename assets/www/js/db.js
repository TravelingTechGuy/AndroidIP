var resultFromServer;

function saveResult() {
	if(resultFromServer) {
		var key = localStorage.length;
		localStorage[key] = resultFromServer;
	}
}

function loadResults() {
	if(localStorage.length > 0) {
		var items = [];
		for (var i = 0; i < localStorage.length; i++) {
			items.push('<li>' + localStorage.getItem(i) + '</li>');
		}
		$("ul").html(items.join('')).listview('refresh');
	}
}

function clearResults() {
	localStorage.clear();
	$("ul").listview('refresh');
}
