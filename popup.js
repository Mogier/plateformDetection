var tab;

function getTab(){
	chrome.tabs.query({active: true, currentWindow: true},
		function(tabs) {
			tab = tabs[0];
		});
}

function getTitleTab() {	
	console.log('Tab id = ' + tab.id);
	chrome.tabs.sendMessage(tab.id,{greeting: 'title'}, 
	function(response){
		document.getElementById("titre").innerHTML = response.title;
	});
}

function getURLTab(){
	var url = tab.url;
	console.log('Tab url = ' + url);
	document.getElementById("url").innerHTML = url;

}

function getClassesTab(){
	chrome.tabs.sendMessage(tab.id,{greeting: 'classes'},
		function(response){
			localStorage.setItem(tab.url,response.classes);
			var classes = localStorage.getItem(tab.url);
			alert(classes);
		});
}

window.onload = function(e) {
	if (!localStorage["attributeNamesToGetValues"])
		localStorage["attributeNamesToGetValues"]="class";	

	getTab();
	
	var priceBtn = document.getElementById("titreBtn");
	priceBtn.onclick = function () { getTitleTab(); };
	var urlBtn = document.getElementById("urlBtn");
	urlBtn.onclick = function () { getURLTab(); };
	var classesBtn = document.getElementById("classesBtn");
	classesBtn.onclick = function () { getClassesTab(); };
	
};