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
	var exportJSON = "";

	for (var i = 0; i < localStorage.length; i++){
    	// do something with localStorage.getItem(localStorage.key(i));
    	if(localStorage.key(i)!="attributeNamesToGetValues")
    		exportJSON+=localStorage.getItem(localStorage.key(i));
    		exportJSON+="\r\n";
	}

	window.open('data:text/csv;charset=utf-8,' + encodeURI(exportJSON));
}

        

window.onload = function(e) {
	var button = document.getElementById("butt");
    button.onclick = function(){ exportToCsv() };
	refreshAttributes();
}