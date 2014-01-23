//Js pour les options de l'extension

function refreshAttributes(){
	var attributes;
	if(localStorage.getItem('attributeNamesToGetValues'))
		attributes = localStorage.getItem('attributeNamesToGetValues');
	else
		attributes = 'Aucun';

	document.getElementById("attributes").innerHTML = attributes;
}

window.onload = function(e) {
	refreshAttributes();
}