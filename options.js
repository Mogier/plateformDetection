//Js pour les options de l'extension

function refreshAttributes(){
	var attributes;
	if(localStorage.getItem('attributeNamesToGetValues'))
		attributes = localStorage.getItem('attributeNamesToGetValues');
	else
		attributes = 'Aucun';

	document.getElementById("attributes").innerHTML = attributes;
}

function exportToCsv() {
	var exportJSON = localStorage.getItem("developer.mozilla.org");

	window.open('data:text/csv;charset=utf-8,' + encodeURI(exportJSON));
}

        

window.onload = function(e) {
	var button = document.getElementById("butt");
    button.onclick = function(){ exportToCsv() };
	refreshAttributes();
}