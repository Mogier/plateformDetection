var tab;

//Get current tab 
function getTab(elem){
	chrome.tabs.query({active: true, currentWindow: true},
		function(tabs) {
			tab = tabs[0];
			createJSON(elem);
		});
}

function getURLTab(){
	return tab.url;
}

function getClassesTab(){
	chrome.tabs.sendMessage(tab.id,{greeting: 'classes'},
		function(response){
			return response.classes;
		});
}

function getDomainTab() {
	chrome.tabs.sendMessage(tab.id,{greeting: 'domain'},
		function(response){
			 return response.domain;
		});
}

function testJSON() {
	var testObject = { 'one': 1, 'two': 2, 'three': 3 };
	// Put the object into storage
	localStorage.setItem('testObject', JSON.stringify(testObject));
}


function createJSON(elem) {
	chrome.tabs.sendMessage(tab.id,{greeting: 'domain'},
		function(response){
			var domJSON;

			if(localStorage[response.domain])
				domJSON = JSON.parse(localStorage.getItem(response.domain));
			else {
				domJSON = {}				
				//Init
				domJSON.URLDomain = response.domain;
				domJSON.pages = [];
			}
				
			var pages = domJSON.pages;
			var currentPageJSON = {};

			//URL 
			currentPageJSON.pageURL = getURLTab();

			//IP User
			//>>>>>>>>>>>TODO !!
			
			//Timestamp
			currentPageJSON.timestamp = new Date().getTime();

			//Attributes
			var listAttributes = localStorage.getItem("attributeNamesToGetValues").split(",");

			var attributes = [];
			var j = 0;
			//for (var j = 0; j<listAttributes.length; j++) {
				chrome.tabs.sendMessage(tab.id,{greeting: listAttributes[j]},
					function(response){
						var attributeJSON = {};
						attributeJSON.name = listAttributes[j];
						var values = [];
						for (var i = 0;i<response.classes.length-1;i++) {
							var label = response.classes[i];
							var currentValue = {};
							currentValue[label[0]] = label[1];

							values.push(currentValue);
						}
						attributeJSON.values = values;
						attributes.push(attributeJSON);	
						
						currentPageJSON.attributes = attributes;

						//detectionChoice
						//>>>> TODO

						//userChoice
						currentPageJSON.userChoice=elem.innerHTML;

						pages.push(currentPageJSON);
						domJSON.pages = pages;

						localStorage.setItem(domJSON.URLDomain, JSON.stringify(domJSON));
					}
				);				
			//} 
		}
	);
}

window.onload = function(e) {

	var shopsBtn=document.getElementsByTagName("button");
	for (var i=0;i<shopsBtn.length;i++){
		shopsBtn[i].onclick=function(){getTab(this)};
	}
	//shops.addEventListener("click",alert('tutu'),false);

	//Default attribute
	if (!localStorage["attributeNamesToGetValues"]) {
		localStorage["attributeNamesToGetValues"]="class";	
	}	
	
	/*var priceBtn = document.getElementById("titreBtn");
	priceBtn.onclick = function () { getDomainTab(); };
	var urlBtn = document.getElementById("urlBtn");
	urlBtn.onclick = function () { getURLTab(); };
	var classesBtn = document.getElementById("classesBtn");
	classesBtn.onclick = function () { getClassesTab(); };*/
	
};