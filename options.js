//Js pour les options de l'extension

function addTag(){
	var newTag = document.getElementById('newTag').value;
	var allTags;
	if(localStorage.getItem('tags'))
	{
		allTags=localStorage.getItem('tags')+','+newTag;
		localStorage.setItem('tags',allTags);
	}
	else
	{
		localStorage.setItem('tags',newTag);
	}
	refreshTags();
}

function clearTags() {
	localStorage.clear();
	refreshTags();
}

function refreshTags(){
	var tags;
	if(localStorage.getItem('tags'))
		tags = localStorage.getItem('tags');
	else
		tags = 'Aucun';

	document.getElementById("tags").innerHTML = tags;
}

window.onload = function(e) {

 	var tagBtn = document.getElementById("tagBtn");
	tagBtn.onclick = function () { addTag(); };

	var clearBtn = document.getElementById("clearBtn");
	clearBtn.onclick = function () { clearTags(); };

	refreshTags();
}