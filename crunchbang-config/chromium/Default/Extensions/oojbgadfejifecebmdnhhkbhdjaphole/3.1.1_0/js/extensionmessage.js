function useGA(){window._gaq=window._gaq||[];_gaq.push(["_setAccount","UA-295754-32"]);_gaq.push(["_trackPageview"]);(function(){var a=document.createElement("script");a.type="text/javascript";a.async=true;a.src="https://ssl.google-analytics.com/ga.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})()}D.config.dontUseGA||useGA();function gaq_push(a){window._gaq&&_gaq.push(a)}
var RLF_ID="decdfngdidijkdjgbknlnepdljfaepji",AW_ID="alelhddbbhepgpmgidjdcjakblofbmce",QN_ID="mijlebbfndhelmdpmllgcfadlkankhok",DIIGO_ID="oojbgadfejifecebmdnhhkbhdjaphole";chrome.extension.onRequestExternal.addListener(function(a,b,c){switch(a.action){case "getoption":a=Prefs.get("prefs.SearchO");c({key:a});break;case "setoption":a=a.key;Prefs.set({"prefs.SearchO":a});c({message:"Diigo is Done"});break}});
function sendsettingtoother(a){chrome.extension.sendRequest(AW_ID,{action:"setoption",key:a},function(b){console.log(b.message)});chrome.extension.sendRequest(QN_ID,{action:"setoption",key:a},function(b){console.log(b.message)});chrome.extension.sendRequest(RLF_ID,{action:"setoption",key:a},function(b){console.log(b.message)})}
function getsettingformother(){chrome.extension.sendRequest(AW_ID,{action:"getoption"},function(a){a.key=="false"&&Prefs.set({"prefs.SearchO":false})});chrome.extension.sendRequest(QN_ID,{action:"getoption"},function(a){a.key=="false"&&Prefs.set({"prefs.SearchO":false})});chrome.extension.sendRequest(RLF_ID,{action:"getoption"},function(a){a.key=="false"&&Prefs.set({"prefs.SearchO":false})})};
