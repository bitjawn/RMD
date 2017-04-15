var group = [],
	interval = 0,
	days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	week = days,
	months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
	calendar = months;
//  ------------------------------------------------------------------------------


var msg = function(m) { alert(m); };
	
function makeProgressBar(minWidth, maxWidth, startWidth, delayedValue, object) {
	if (object) {
		var divProg = newElement('div'),
			divProgBar = newElement('div');		
		addAttribute('class','progress',divProg);
		addAttribute('class', 'progress-bar progress-bar-striped active',divProgBar);
		addAttribute('role','progressbar',divProgBar);
		addAttribute('aria-valuenow','70',divProgBar);
		addAttribute('aria-valuemin','0',divProgBar);
		addAttribute('aria-valuemax','100',divProgBar);
		addAttribute('style','width:' + minWidth + '%',divProgBar);	
		addAttribute('id','progressBar',divProgBar);
		appendElement(divProg,divProgBar);	
		appendElement(object,divProg);
		(function() {
			var width = startWidth;
			var id = doInterval(frame, delayedValue);
			function frame() {
				if (width >= maxWidth) {
					stopInterval(id);
					clearObject();
				} else {
					width++;
					addAttribute('style','width:' + width + '%',divProgBar);
					divProgBar.innerHTML = width * 1 + '%';
				}
			};
			function clearObject() {
				removeElements(object);
			}
		})();
	}
}

function showTaskProgress(minWidth, maxWidth, startWidth, delayedValue, object, task) {
	if (object && (typeof task) === 'function') {
		var divProg = newElement('div'),
			divProgBar = newElement('div');		
		addAttribute('class','progress',divProg);
		addAttribute('class', 'progress-bar progress-bar-striped active',divProgBar);
		addAttribute('role','progressbar',divProgBar);
		addAttribute('aria-valuenow','70',divProgBar);
		addAttribute('aria-valuemin','0',divProgBar);
		addAttribute('aria-valuemax','100',divProgBar);
		addAttribute('style','width:' + minWidth + '%',divProgBar);	
		addAttribute('id','progressBar',divProgBar);
		appendElement(divProg,divProgBar);	
		appendElement(object,divProg);
		(function() {
			var width = startWidth;
			var id = doInterval(frame, delayedValue);
			function frame() {
				if (width >= maxWidth) {
					stopInterval(id);
					clearObject();
				} else {				
					width++;
					// addAttribute('style','width:' + width + '%',divProgBar);
					// divProgBar.innerHTML = width * 1 + '%';
					task(divProgBar);
				}
			};
			function clearObject() {
				removeElements(object);
			}
		})();
	}
}


	
	
	
	

function element(id) { return document.getElementById(id); }

function newElement(type) { return document.createElement(type); }

function createTextNode(str) { return document.createTextNode(str); }

function createUlist(strArray) { 
	var ul = newElement('ul');
	addAttribute('id',strArray[0] + ' list',ul);
	var li;	
	for (var i = 0; i<strArray.length; i++ ) {
		li = newElement('li');
		addAttribute('id',strArray[i],li);
		appendElement(li,createTextNode(strArray[i]));
		appendElement(ul,li);	
	}	
	return ul;
}

function appendElement(parent,child) { parent.appendChild(child); }

function appendChild(parent,child) { appendElement(parent,child); }

function prependElement(parent,child,index) { parent.insertBefore(child,parent.childNodes[index]); }

function replaceElement(parent,newElement) {
	if (parent.childNodes.length === 1) {
		parent.replaceChild(newElement,parent.childNodes[0]);
	} else if (parent.childNodes.length === 0 || !parent.childNodes.length) {
		appendChild(parent,newElement);
	}
}

function removeElement(parent, child) { parent.removeChild(child); }

function removeElements(parent) {
	for (var i = 0; i<parent.childNodes.length; i++ ){
		var child = parent.childNodes[i];
		parent.removeChild(child);
	}
}

function removeElementsFrom(parent, index) {
	for (;index < (parent.childNodes.length); index++) {
		parent.removeChild(parent.childNodes[index]);
	}
}

function childCount(parent) { return parent.childNodes.length; }

function countLinks() { return document.links.length; }

function docLinks() { return document.links; }

function documentLinkHrefs() {
	var anchors = {},
		links = [];			
	if (countLinks() > 0) {
		anchors = docLinks();		
		$(anchors).each(function(index,value){
			links.push(index + "|" + value);
		});
	}
	return links;
}

function documentLinkHrefsOnly() {
	var anchors = {},
		links = [];			
	if (countLinks() > 0) {
		anchors = docLinks();		
		$(anchors).each(function(index,value){
			links.push(value);
		});
	}
	return links;
}

function documentLinkIDs() {
	var link_ids = [];	
	for (var i = 0; i<docLinks().length; i++) {
		var link = docLinks()[i];
		link_ids.push(link.id);
	}
	return link_ids;
}

function documentLinks() {
	var links = [];
	for (var i = 0; i<docLinks().length; i++) {
		var link = docLinks()[i];
		links.push(link);
	}
	return links;
}









var xmlHttpObject = function() {
	try {
		return new XMLHttpRequest();
	} catch (error){}
	
	try {
		return new ActiveXObject(Microsoft.XMLHTTP);
	} catch (error) {}
	
	try {
		return new ActiveXObject(Msxml2.XMLHTTP);
	} catch (error) {}
	
	throw new Error("Could not make AJAX request object");
};

function objectType(obj) { return (typeof obj); }

function screenWidth() { 
	var width = screen.availWidth;
	return width;
}









function hide(ele_id) {
	element(ele_id).style.display = "none";	
}

function show(ele_id) {
	element(ele_id).style.display = "visible";
}








function send_mail() {	
	var ele = event.currentTarget;
	document.location.href =('mailto:'+ele.value.trim()+'?subject=Deez Nuts');	
}

function sendMail(email_address) {
	document.location.href = ('mailto:' + email_address.trim() + '?subject=No Subject Provided');
}

function sendMailWithSubject(email_address, subject) {
	document.location.href = ('mailto:' + email_address.trim() + '?subject=' + subject);
}

function send_call() {
	var ele = event.currentTarget,
	 phone = ele.value.trim(),
	 patt = /^\d{3}-\d{3}-\d{4}$/,	
	 res = patt.exec(phone),
	 p = res.toString(),
	 num = p.split("-"),
	 phoneNum = "";	
	for(var i = 0; i<num.length; i++) {
		phoneNum += num[i];
	}
	document.location.href =('tel:'+phoneNum);
}

function sendCall(phone_number) {
	num = phone_number.trim().split('-'),
	phoneNum = "";
	if (num.length) {
		for(var i = 0; i<num.length; i++) {
			phoneNum += num[i];
		}
		document.location.href = ('tel:'+phoneNum);
	} 
	else {
		document.location.href = ('tel:' + phone_number);
	}
	var num,phoneNum;
}










function getCurrentLocation() {
	if (element('footer')) {
		if (navigator.geolocation) {
			try {
				navigator.geolocation.watchPosition(coordinates,errorHandler);
			} 
			catch (error) {
				errorHandler(error);
			}
		}
	}
}

function coordinates(position) {
	element('footer').innerHTML = 'Latitude: ' + position.coords.latitude + '&nbsp;&nbsp;&nbsp;Longitude: ' + position.coords.longitude;
	localStorage.latitude = position.coords.latitude;
	localStorage.longitude = position.coords.longitude;
}

function errorHandler(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			viewError('Geo-Location Error:&nbsp;&nbsp;Permission Denied');
		break;
		
		case error.POSITION_UNAVAILABLE:
			viewError('Geo-Location Error:&nbsp;&nbsp;Position Unavailable');
		break;
		
		case error.TIMEOUT:
			viewError('Geo-Location Error:&nbsp;&nbsp;Timed Out');
		break;
		
		case error.UNKNOWN_ERROR:
			viewError('Geo-Location Error:&nbsp;&nbsp;An Unknown Error Occurred');
		break;
		
		default:
			viewError(error);
		break;
	}
}

function viewError(e) {
	element('mapfooter').innerHTML += '<span style="color:rgba(225,220,215);margin-left:25%;font:bold 18pt "Palatino Linotype", "Book Antiqua", Palatino, serif;">' + e + '</span>';
}

function getMap() {	
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(viewMap, errorHandler);
    } 
	else { 
        errorHandler('Your browser does not support Geo-Location');
    }
}

function viewMap(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	latlon = new google.maps.LatLng(lat, lon);
	mapholder = element('mapwell');
	mapholder.style.height = '550px';
	mapholder.style.width = '1139px';

	var myOptions = {
		center:latlon,zoom:14,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		mapTypeControl:false,
		navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
	};

	var map = new google.maps.Map(element('mapwell'), myOptions);
	var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
	if (localStorage.latitude && localStorage.longitude) {
		element('footer').innerHTML = 'Latitude: ' + localStorage.latitude + ' &nbsp;&nbsp;&nbsp;&nbsp;Longitude: ' + localStorage.longitude;
	}
	else {
		element('footer').innerHTML = '&copy;2013 Quauab';
	}
}






// @param method The function to execute
// @param count The number of seconds
function doInterval(method,count) {
	return setInterval(function(){
		switch (typeof(method)) {
			case 'function':
				method();
				break;
		}
	},(count*1000));
}

function stopInterval(object) {
	clearInterval(object);
	object = 0;
}










function attachHandler(objId, theEvent, theHandler) {
	try {
		element(objId).addEventListener(theEvent,theHandler,true);
	} catch (error) {
		alert("Error attaching event handler to element " + objId
			+ "\n" + error);
	}
}

function addHandler(theElement, theEvent, theHandler) {
	try {
		theElement.addEventListener(theEvent,theHandler,true);
	} catch (error) {
		alert("Error adding event handler to element " + theElement.id 
			+ "\n" + error);
	}
}

function attachAttribute(theProperty, theValue, elementId) {
	try {
		element(elementId).setAttribute(theProperty,theValue);
	} catch (error) {
		alert("Error attaching attribute to element " + element(elementId) 
			+ "\n" + error);
	}
}

function addAttribute(theProperty, theValue, theElement) {
	try {
		theElement.setAttribute(theProperty,theValue);
	} catch(error) {
		alert("Error adding attribute to element " + theElement.id
			+ "\n" + error);
	}
}









function capitalizeFirstCharacter(word) {
	var word_split = null,
		line = "";
	if (word.trim().toLowerCase() === 'id' ||
		word.trim().toLowerCase() === 'ssn' ||
		word.trim().toLowerCase() === 'sku' ||
		word.trim().toLowerCase() === 'vm' ||
		word.trim().toLowerCase() === 'mac' ||
		word.trim().toLowerCase() === 'imei' ||
		word.trim().toLowerCase() === 'os' ||
		word.trim().toLowerCase() === 'atm' ||
		word.trim().toLowerCase() === 'pa') {
		word = word.toUpperCase();
	} else if (word.match(/[-]/)) {
		if (null !== (word_split = word.split(['-'])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + '-';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else if (word.match(/[ ]/)) {
		if (null !== (word_split = word.split([' '])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + ' ';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else {
		return word.substring(0,1).toUpperCase() + word.substring(1);
	}
	return word;
}

function cfc(word) {
	return capitalizeFirstCharacter(word);
}

function cap(str) { return str.substring(0,1).toUpperCase() + str.substring(1); }








//  ------------------------------------------------------------------------------
function size(object) {
	if (isArray(object)) {
		return arraySize(object);
	}
	else if (isObject(object)) {
		return objectSize(object);
	}
	else {
		return 0;
	}
}

function objectSize(o) { return Object.keys(o).length; }

function arraySize(a) { return a.length; }

function isObject(obj) {
	return ((obj instanceof Object) && !(obj instanceof Array));
}

function isArray(obj) {
	return (obj instanceof Array);
}
//  ------------------------------------------------------------------------------










var degrees_to_radians = function (degrees) { return degrees * Math.PI / 180; };

var dtr = function(degrees) { return degrees_to_radians(degrees); };

var radians_to_degrees = function (radians) { return radians * 180 / Math.PI; };

var rtd = function(radians) { return radians_to_degrees(radians); };

var kilometers_to_miles = function (km) {
	if(!isNaN(parseFloat(km)) &&
		isFinite(parseFloat(km))) {
		return number(km*(0.621371));
	}
	else {
		return -1;
	}
};

var ktm = function(km) { return kilometers_to_miles(km); };











function suffix(input) {
	var temp = [],
		string = new String(input).trim();
		
	for (var i = 0; i < string.length; i++) {
		temp.push(string.charAt(i));
	}
	
	switch (temp.length) {
		case 1:
			return input + '' + checkChar(input);
			
		case 2:
			return checkChars(temp);
	}
	
}

function checkChar(input) {
	switch (input) {
		case 1:
			return 'st';
			
		case 2:
			return 'nd';
			
		case 3:
			return 'rd';
			
		default:
			return 'th';
	}
}

function checkChars(an_array) {	
	switch (an_array[0]) {
		case '1':
			return an_array[0] + '' + an_array[1] + 'th';
			
		default:
			return an_array[0] + '' + an_array[1] + checkSecondChar(an_array[1]);
	}
}

function checkSecondChar(input) {
	switch (input) {		
		case '1':
			return 'st';
			
		case '2':
			return 'nd';
			
		case '3':
			return 'rd';
			
		default:
			return 'th';
	}
}

function dateTimeStamp() {	
	return '<b class="datetimestamp">' + date() + '  ' + time() + '</b>';
}

function stamp() {
	return '<b class="datetimestamp">' + date() + '  ' + time() + '</b>';
}

function time() {
	var d = new Date(),
		seconds = null,
		minutes = null,
		hours = null;
	
	switch (d.getSeconds()) {
		case 0:
			seconds = '00';
			break;
		case 1:
			seconds = '01';
			break;
		
		case 2:
			seconds = '02';
			break;
			
		case 3:
			seconds = '03';
			break;
			
		case 4:
			seconds = '04';
			break;
			
		case 5:
			seconds = '05';
			break;
			
		case 6:
			seconds = '06';
			break;
			
		case 7:
			seconds = '07';
			break;
			
		case 8:
			seconds = '08';
			break;
			
		case 9:
			seconds = '09';
			break;
			
		default:
			seconds = d.getSeconds();
			break;
	}
	
	switch (d.getMinutes()) {
		
		case 0:
			minutes = '00';
			break;
		case 1:
			minutes = '01';
			break;
		
		case 2:
			minutes = '02';
			break;
			
		case 3:
			minutes = '03';
			break;
			
		case 4:
			minutes = '04';
			break;
			
		case 5:
			minutes = '05';
			break;
			
		case 6:
			minutes = '06';
			break;
			
		case 7:
			minutes = '07';
			break;
			
		case 8:
			minutes = '08';
			break;
			
		case 9:
			minutes = '09';
			break;
			
		default:
			minutes = d.getMinutes();
			break;
	}
	
	switch (d.getHours()) {
		
		case 0:
			hours = '00';
			break;
		case 1:
			hours = '01';
			break;
		
		case 2:
			hours = '02';
			break;
			
		case 3:
			hours = '03';
			break;
			
		case 4:
			hours = '04';
			break;
			
		case 5:
			hours = '05';
			break;
			
		case 6:
			hours = '06';
			break;
			
		case 7:
			hours = '07';
			break;
			
		case 8:
			hours = '08';
			break;
			
		case 9:
			hours = '09';
			break;
			
		default:
			hours = d.getHours();
			break;
	}
	
	var time = hours + '\:' + minutes + '\:' + seconds;
	return time;
}

function date() {
	var d = new Date();
	var date = days[d.getDay()] +  ' ' + months[d.getMonth()] + ' ' + suffix(d.getDate('Greenwich Mean Time')) + ' ' + d.getFullYear();
	return date;
}

function timeObjects() {
	var d = null,
		seconds = null,
		minutes = null,
		hours = null;	
	
	if (null !== (d = new Date())) {
		switch (d.getSeconds()) {
			case 0:
				seconds = '00';
				break;
			case 1:
				seconds = '01';
				break;
			
			case 2:
				seconds = '02';
				break;
				
			case 3:
				seconds = '03';
				break;
				
			case 4:
				seconds = '04';
				break;
				
			case 5:
				seconds = '05';
				break;
				
			case 6:
				seconds = '06';
				break;
				
			case 7:
				seconds = '07';
				break;
				
			case 8:
				seconds = '08';
				break;
				
			case 9:
				seconds = '09';
				break;
				
			default:
				seconds = d.getSeconds();
				break;
		}
		
		switch (d.getMinutes()) {
			
			case 0:
				minutes = '00';
				break;
			case 1:
				minutes = '01';
				break;
			
			case 2:
				minutes = '02';
				break;
				
			case 3:
				minutes = '03';
				break;
				
			case 4:
				minutes = '04';
				break;
				
			case 5:
				minutes = '05';
				break;
				
			case 6:
				minutes = '06';
				break;
				
			case 7:
				minutes = '07';
				break;
				
			case 8:
				minutes = '08';
				break;
				
			case 9:
				minutes = '09';
				break;
				
			default:
				minutes = d.getMinutes();
				break;
		}
		
		switch (d.getHours()) {
			
			case 0:
				hours = '00';
				break;
			case 1:
				hours = '01';
				break;
			
			case 2:
				hours = '02';
				break;
				
			case 3:
				hours = '03';
				break;
				
			case 4:
				hours = '04';
				break;
				
			case 5:
				hours = '05';
				break;
				
			case 6:
				hours = '06';
				break;
				
			case 7:
				hours = '07';
				break;
				
			case 8:
				hours = '08';
				break;
				
			case 9:
				hours = '09';
				break;
				
			default:
				hours = d.getHours();
				break;
		}
		
		return {
			second:seconds,
			minute:minutes,
			hour:hours,
			sec:d.getSeconds(),
			min:d.getMinutes(),
			hou:d.getHours()
		};
	}
	return null;
}

function dateObjects() {	
	var d = null;
	if (null !== (d = new Date()))
		return {
			strDay:days[d.getDay()],
			intDay:d.getDay(),
			strMonth:months[d.getMonth()],
			intMonth:d.getMonth(),
			intYear:d.getFullYear(),
			day:suffix(d.getDate('Greenwich Mean Time'))
		};
	return null;
}