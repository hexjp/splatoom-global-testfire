
var ua = navigator.userAgent;
var isSP = (((ua.indexOf('Android') != -1) && (ua.indexOf('Mobile') != -1)) || (ua.indexOf('iPhone') != -1 && ua.indexOf('iPad') == -1) || (ua.indexOf('iPod') != -1) || (ua.indexOf('Nintendo 3DS') != -1));

var judgment = 'agmj';
var redirectUrl = 'http://' + location.host;
var pathArr = location.pathname.split('/');
var urlParam = location.search.substring(1);

if(pathArr[0] == '') {
	pathArr.shift();
}

if(pathArr[pathArr.length - 1] == '') {
	pathArr.pop();
	pathArr.push('index.html');
}

var siteType = 'pc';
for (var i = 0; i < pathArr.length ; i++) {
	if(pathArr[i] == 'sp') {
		siteType = 'sp';
	}
}

// PC
if((siteType == 'pc') && (isSP)) {
	for (var i = 0; i < pathArr.length ; i++) {
		redirectUrl += '/' + pathArr[i];
		if(pathArr[i] == judgment) {
			redirectUrl += '/sp';
		}
	}
	if(urlParam.indexOf('utm_') != -1 || urlParam.indexOf('_ga') != -1){
		window.location = redirectUrl + '?' + urlParam;
	} else {
		window.location = redirectUrl;
	}

// sp
} else if((siteType == 'sp') && !(isSP)) {
	for (var i = 0; i < pathArr.length ; i++) {
		if(!(pathArr[i - 1] == judgment)) {
			redirectUrl += '/' + pathArr[i];
		}
	}
	window.location = redirectUrl;
}
