// Utils.js - Helper functions 

function debugPrint(debugString) {
//	return 0;
	console.log(debugString);
}

function getQRImageURLHead()
{
	return "http://chart.apis.google.com/chart?cht=qr&chl=";
}

function getQRImageURLTail()
{
	var preferedImgSize = getQRImageSize();
	return "&chs=" + preferedImgSize + "x" + preferedImgSize;;
}

function getQRImageURL(urlString)
{
	var preferedImgSize = getQRImageSize();
	var chartURLHead = "http://chart.apis.google.com/chart?cht=qr&chl=";
	var chartURLTail = "&chs=" + preferedImgSize + "x" + preferedImgSize;
	var encodedURL = encodeURIComponent(urlString);
	return (chartURLHead + encodedURL + chartURLTail);
}

function getQRImageSize()
{
	var preferedImgSize = localStorage["favorite_image_size"];	
	if (!preferedImgSize)
		preferedImgSize  = 120;
	
	return preferedImgSize;
}

function displayStatusMessage(strMessage)
{
	var pStatusMess = document.createElement("p");
	pStatusMess.innerHTML = strMessage;
	
	document.getElementById("qrCodePlaceHolder").appendChild(pStatusMess);
}

function copyit() 
{
	document.execCommand("Copy")
	var copiedtext = window.clipboardData.getData("Text");
}

function generateQRImage(urlString, placeHolderId)
{
	var preferedImgSize = getQRImageSize();
	var img = document.createElement("img");
	img.width = preferedImgSize;
	img.height = preferedImgSize;
	img.src = getQRImageURL(urlString);
	img.alt = "QR Tag for current URL open in your web browser";
	
	document.getElementById(placeHolderId).appendChild(img);
}

function displayShareInfo(curURL)
{
	// Facebook button
	var fbImg = document.createElement("img");
	var fbShareLink = document.createElement("a");
	fbShareLink.target= "_blank";
	var fbShareURLHead = "http://www.facebook.com/sharer.php?u=";
	var fbShareURLTail = "&t=" + encodeURIComponent("<Add title for QR-Code Tag Image here>");
	var fbImgSrc = fbShareURLHead + encodeURIComponent(getQRImageURL(curURL)) + fbShareURLTail;
	fbShareLink.href = fbImgSrc;
	fbImg.src = "icons/facebook.png";
	fbImg.alt = fbImgSrc;
	fbShareLink.appendChild(fbImg);
	document.getElementById('fbPlaceHolder').appendChild(fbShareLink);
	
	
	// Twitter button
	var twImg = document.createElement("img");
	var twShareURLHead = "http://twitter.com/share?url=" + encodeURIComponent(getQRImageURL(curURL));
	var twShareLink = document.createElement("a");
	twShareLink.target= "_blank";
	twShareLink.href = twShareURLHead;
	twImg.src = "icons/twitter.png";
	twImg.alt = twShareURLHead;
	twShareLink.appendChild(twImg);
	document.getElementById('twitterPlaceHolder').appendChild(twShareLink);
	

}

function doGenerateQRCode()
{

	// if url shortener is prefered, get shortened url of current tab first
	if (localStorage["shorten_url"] == "true")
	{
		$.get('http://api.bit.ly/v3/shorten?login='+localStorage["bitly_login"]+'&apiKey='+localStorage["bitly_api_key"]+'&longUrl='+encodeURIComponent(localStorage["cur_tab_url"])+'&format=json',
			function(data, textStatus) {
				var bitly = JSON.parse(data);
				if (bitly.status_code != 200)
				{
					displayStatusMessage('Failed to shorten URL with bit.ly. Please try again and verify your login and api key.');
					return;
				}
				localStorage["cur_tab_url"] = bitly.data.url; // save away for fileSave window if user choose this feature. 
				generateQRImage(bitly.data.url, 'qrCodePlaceHolder');
				displayShareInfo(bitly.data.url); 
			}, 'text');
	}
	else
	{
		generateQRImage(localStorage["cur_tab_url"], 'qrCodePlaceHolder');
		displayShareInfo(localStorage["cur_tab_url"]);
	}
}

function onLinkNewClick()
{
	chrome.windows.getCurrent(function(winInstance) 
	{ 
		chrome.tabs.getSelected(winInstance.id, function(tabInstance) 
		{
			// function called from a context menu click, need for a custom dialog displaying QR code
			chrome.tabs.create({"windowId": winInstance.id, "index": tabInstance.index+1, "url": "fileSave.html", "selected": true});
		});
	});	
}
