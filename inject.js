chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == 'title')
  	sendResponse({title : window.document.title});
  else if(request.greeting == 'classes')
  	sendResponse({classes : getClasses()});
});

function getClasses() {
	var allTags = document.body.getElementsByTagName('*');
	var classNames = {};
	for (var tg = 0; tg< allTags.length; tg++) {
		var tag = allTags[tg];
		if (tag.className) {
			var classes = tag.className.split(" "); //A garder ?
			for (var cn = 0; cn < classes.length; cn++){
				var cName = classes[cn];
				if (! classNames[cName]) {
					classNames[cName] = 1;
				}
				else {
					classNames[cName]++;
				}
			}
		}   
	}
	var classList = [];
	for (var name in classNames) classList.push([name,classNames[name]]);
	return classList;
}