
var trup=null;var init=null;var fire=null;var lfgs=null;
var sycl=null;var cfgo=null;var uris=null;var clip=null;
var dast=null;var perm=null;var D=false;var V=false;
var T=false;var EV=false;var MV=false;var UV=false;
var SV=false;var YV=false;var CV=false;var NV=false;
var RV=false;var TV=false;Registry.require("statistics");
Registry.require("convert");Registry.require("xmlhttprequest");
Registry.require("cache");Registry.require("storage");
Registry.require("uri");Registry.require("compat");
Registry.require("parser");Registry.require("helper");
Registry.require("syncinfo");Registry.require("notify");
Registry.require("i18n");Registry.require("native");
(function(){var G=function(aF){D|=(aF>=60);YV|=(aF>=60);
TV|=(aF>=60);RV|=(aF>=80);EV|=(aF>=80);NV|=(aF>=80);
CV|=(aF>=100);UV|=(aF>=100);MV|=(aF>=100);V|=(aF>=100);
SV|=(aF>=100);a.debug(!!YV);j.debug(D,SV);ar.debug(D)
};const g=-2;const i=-1;const z=0;const X=1;const o="uso:hash";
const e="uso:timestamp";const ah="uso:script";var al=Registry.prepare(true);
var l=(function(){var aF=true;var aH=function(aI,aM,aJ){var aK={title:aI.join("\n\n")};
console.warn(aI.join("\n"));chrome.browserAction.setIcon(aM);
chrome.browserAction.setTitle(aK);var aL=function(aQ,aP,aN){var aO=[];
aO.push({name:"1",section:true,pos:"left"});aO.push({name:aI[0],image:"info"});
if(aI.length>1){aO.push({name:aI[1],})}aN({items:aO,options:{enabled:false}})
};if(!aJ){chrome.extension.onMessage.addListener(aL)
}};var aG=function(){try{var aJ=Registry.verify("3737.80");
if(aJ.length){var aI=["Tampermonkey detected that Chrome is caching some outdated code parts.","In order to avoid unexpected behavior TM will be kept paused until Chrome was restarted."];
var aK={path:chrome.extension.getURL("images/icon_grey_paused.png")};
aF=false;aH(aI,aK)}else{if(chrome.extension.inIncognitoContext&&al.RUNTIME.CHROME&&al.RUNTIME.BROWSER_VERSION<28){var aI=["Tampermonkey detected that it can not work in incognito mode with your browser version.","Please update your browser to version 28 or higher."];
var aK={path:chrome.extension.getURL("images/icon_grey_paused.png")};
aF=false;aH(aI,aK)}}}catch(aL){aF=false;console.error(aL.message)
}if(al.DB.USE=="chromeStorage"&&!al.DB.NO_WARNING){window.setTimeout(function(){j.isWorking(function(aN){if(!aN){if(confirm("Tampermonkey detected that your Chrome profile is broken!\n\nUnfortunately all extension data including your settings and userscripts is stored at the profile.\n\nDo you want to visit the FAQ entry that explains how to recover from that?")){var aP={url:"http://tampermonkey.net/faq#Q206"};
chrome.tabs.create(aP,function(){})}var aM=["Tampermonkey detected that your Chrome profile is broken!"];
var aO={path:chrome.extension.getURL("images/icon_grey_paused.png")};
aH(aM,aO,true)}})},1000)}return aF};return{run:aG,pause:aH}
})();if(!l.run()){return}var aD=al.WEBREQUEST;var aC=al.HTML5.LOCALSTORAGE;
var C=(new Date()).getTime()+Math.floor(Math.random()*61283+1);
var ai={};var aE={};var av=null;if(D||V){console.debug("Starting background fred @"+C)
}var U=Registry.get("helper");var K=Registry.get("cache");
var ak=Registry.get("statistics");var j=Registry.get("storage");
var ar=Registry.get("notify");var aB=Registry.get("native");
var S=Registry.get("icon");dast=j;K.create("requires").setOptions({timeout:30*60,check_interval:5*60}).init();
K.create("resources").setOptions({timeout:30*60,check_interval:5*60}).init();
K.create("rundata").setOptions({timeout:3*60,check_interval:2*60,retimeout_on_get:true}).init();
var M=function(aK,aJ){if(V){console.log("versionCmp: "+aK+" : "+aJ)
}var aG=function(aO){return U.filter(aO.replace(/-/g,"."),/[\.0-9]/g)
};var aN=aG(aK);var aM=aG(aJ);var aH=aN.split(".");
var aF=aM.split(".");var aL=aH.length<aF.length?aH.length:aF.length;
for(var aI=0;aI<aL;aI++){if(aH.length<aL){aH[aI]=0}if(aF.length<aL){aF[aI]=0
}if(Number(aH[aI])>Number(aF[aI])){return X}else{if(Number(aH[aI])<Number(aF[aI])){return i
}}}if(aF.length<aH.length){return X}return z};chrome.extension.manifest=(function(){var aF=chrome.extension.getURL("manifest.json");
var aG;try{if(aF&&aF.search("{")!=-1){aG=JSON.parse(aF)
}else{var aI=new XMLHttpRequest();aI.open("GET",aF,false);
aI.send(null);aG=JSON.parse(aI.responseText)}}catch(aH){console.log("getVersion"+aH.message);
aG={version:"0.0.0.0",name:"Tampermonkey"}}return aG
})();chrome.extension.getVersion=function(){return chrome.extension.manifest.version
};chrome.extension.getName=function(){return chrome.extension.manifest.name
};var ap=function(aI){var aH="0.0.0.0";var aJ=chrome.extension.getVersion();
var aG=null;var aF=function(aL){var aP=M(aJ,aL)==X;
var aO=[];var aK=0;var aM=false;var aN=function(){if(aK<aO.length){var aR=function(){window.setTimeout(aN,al.MISC.TIMEOUT)
};if(aO[aK].cond()){aO[aK].fn(aR)}else{aR()}aK++}};
var aQ=function(){console.warn("Incognito mode detected. Database conversion can only be done in non-incognito mode! Stopping now...");
var aR=["Tampermonkey needs to convert its database but this can't be done in incogonito mode!","Please open a non-incognito mode window and/or restart your browser."];
var aS={path:chrome.extension.getURL("images/icon_grey_paused.png")};
l.pause(aR,aS)};aO=[{cond:function(){return aP&&al.DB.USE=="chromeStorage"&&M("3.5.3603",aL)==X
},fn:function(aR){if(chrome.extension.inIncognitoContext){return aQ()
}console.log("Update config...");j.migrate("sql","chromeStorage",function(){console.log("Copied config for default usage of chrome.storage");
window.setTimeout(aR,al.MISC.TIMEOUT)})}},{cond:function(){return aP&&M("3.6.3650",j.getDbVersion())==X&&M("3.5.3650",aL)==X
},fn:function(aS){if(chrome.extension.inIncognitoContext){return aQ()
}console.log("Convert config from "+aL+" to 3.6.3650");
[{o:"TM_config",n:al.CONSTANTS.STORAGE.CONFIG},{o:"TM_update_check",n:al.CONSTANTS.STORAGE.UPDATE},{o:"TM_version"},{o:"TM_unload_ts"}].forEach(function(aW){if(aW.n){var aX=j.getValue(aW.o);
j.setValue(aW.n,aX)}j.deleteValue(aW.o)});var aV=new RegExp("@re$");
var aR=[];j.listValues().forEach(function(aW){if(aW.search(aV)==-1){return
}var aX=aW.replace(aV,"");aR.push(aX)});var aT=function(){if(--aU==0){aS()
}};var aU=1;aR.forEach(function(aZ){var aW=j.getValue(aZ+"@st");
var a1=j.getValue(aZ);var aY=j.getValue(aZ+"@re");var a0=j.getValue(aZ+"@source");
var aX=s.getUidByName(aZ)||U.createUUID();aU+=4;j.deleteValue(aZ+"@st",aT);
j.deleteValue(aZ,aT);j.deleteValue(aZ+"@re",aT);j.deleteValue(aZ+"@source",aT);
if(!a1||!aY||!a0){console.warn("invalid script entry",{source:a0,meta:a1,cond:aY});
return}aU+=5;j.setValue(al.CONSTANTS.PREFIX.SCRIPT_UID+aX,aZ,aT);
j.setValue(al.CONSTANTS.PREFIX.COND+aX,aY,aT);j.setValue(al.CONSTANTS.PREFIX.STORE+aX,aW,aT);
j.setValue(al.CONSTANTS.PREFIX.SCRIPT+aX,a0,aT);j.setValue(al.CONSTANTS.PREFIX.META+aX,a1,aT)
});aV=new RegExp("@st$");aR=[];j.listValues().forEach(function(aW){if(aW.search(aV)==-1){return
}aU++;j.deleteValue(aW,aT)});window.setTimeout(aT,1)
}},{cond:function(){return aP&&M("3.6.3737.77",aL)==X
},fn:function(aS){if(chrome.extension.inIncognitoContext){return aQ()
}console.log("Convert config from "+aL+" to 3.6.3737.77");
var aY=function(a2,a0){var a1=1;var a3=function(){if(--a1==0&&a0){a0()
}};a1++;j.deleteValue(al.CONSTANTS.PREFIX.SCRIPT_UID+a2,a3);
a1++;j.deleteValue(al.CONSTANTS.PREFIX.COND+a2,a3);
a1++;j.deleteValue(al.CONSTANTS.PREFIX.STORE+a2,a3);
a1++;j.deleteValue(al.CONSTANTS.PREFIX.SCRIPT+a2,a3);
a1++;j.deleteValue(al.CONSTANTS.PREFIX.META+a2,a3);
a3()};var aX=function(a0){var a2=null;var a0=encodeURI(a0);
var a1=a0.match(/[a-zA-Z0-9]/g);if(a1){a2=a1.join("")
}else{a2=U.filter(F.Base64.encode(a0),/[a-zA-Z0-9]/g)
}return a2};var aV=function(a3,a4,a1){var a6=j.getValue(al.CONSTANTS.PREFIX.SCRIPT_UID+a3);
var a0=j.getValue(al.CONSTANTS.PREFIX.META+a3);a6=a4+a6;
a0.name=a6;a0.id=aX(a6);var a2=1;var a5=function(){if(--a2==0&&a1){a1()
}};a2++;j.setValue(al.CONSTANTS.PREFIX.SCRIPT_UID+a3,a6,a5);
a2++;j.setValue(al.CONSTANTS.PREFIX.META+a3,a0,a5);
a5()};var aT=function(a2,a0){var a3=j.getValue(al.CONSTANTS.PREFIX.SCRIPT+a2);
var a1=j.getValue(al.CONSTANTS.PREFIX.SCRIPT+a0);return a3===a1
};var aW={};var aZ=[];j.listValues().forEach(function(a2){if(a2.match("^"+al.CONSTANTS.PREFIX.META)){var a1=j.getValue(a2);
var a0=a2.replace(/[^#]*#/,"");(aW[a1.name]=(aW[a1.name]||[])).push(a0);
console.log("found uid",a0,"name",a1.name);if(aW[a1.name].length>1){console.warn("    doublette ^^");
aZ.push(aW[a1.name])}}});var aU=1;var aR=function(){if(--aU==0&&aS){aS()
}};aZ.forEach(function(a0){if(!a0){return}if(!a0.length==1){console.warn("double handling routine found single script -> should not happen!");
return}if(a0.length>2){console.warn("unable to handle multi copy script! UUIDs:",a0);
return}if(aT(a0[0],a0[1])){aU++;aY(a0[1],aR)}else{aU++;
aV(a0[0],"<Modified Copy> ",aR)}});aR()}},{cond:function(){return aP
},fn:function(aR){console.log("First run of version "+aJ+"!");
var aU=null,aV=null,aY=null;var aT=al.MISC.UNLOAD_TIMEOUT,aW=aC.getItem(al.CONSTANTS.STORAGE.UNLOAD,null);
try{if(aW!==null){aT=Math.floor(((new Date()).getTime()-Number(aW))/1000)
}aV=(aT<al.MISC.UNLOAD_TIMEOUT)}catch(aX){}var aS=function(a0){if(!aY){return
}if(a0||aU!==null){if(!a0){window.clearTimeout(aY)}aY=null;
var aZ=(aU||!aV);if(D){console.log("convert: inactive:",aU,"reload:",aV,"force:",a0,"focus:",aZ)
}av={newV:aJ,oldV:aL,first_run:(aL==aH),active:aZ};
j.setVersion(aJ);window.setTimeout(aR,al.MISC.TIMEOUT)
}};chrome.idle.queryState(al.MISC.IDLE_TIMEOUT,function(aZ){aU=(aZ!="active");
aS()});aY=window.setTimeout(function(){aS(true)},300)
}},{cond:function(){return true},fn:function(aR){if(aI){window.setTimeout(aI,1)
}window.setTimeout(aR,al.MISC.TIMEOUT)}}];aN()};j.getVersion(aH,aF)
};var W=(function(){var aF={get:function(aM,aG){var aH=(aM==0)+"#"+aG;
var aN=K.items.rundata.getj(aH);if(aN){aN.oldret.user_agent[aM]=aN.oldret.user_agent[aN.frameId];
aN=aN.oldret}else{var aK=t.determineScriptsToRun(aG);
var aP=[];var aL=0;var aI={};var aQ={};for(var aJ=0;
aJ<aK.length;aJ++){var aO=aK[aJ];if(V){console.log("check "+aO.name+" for enabled:"+aO.enabled)
}if(!aO.enabled){aL++;continue}if(aM!=0&&(aO.options.noframes===true||(aO.options.noframes===null&&aO.options.override.orig_noframes===true))){continue
}if(aO.options.user_agent&&aO.options.user_agent!=""){aQ[aM]=aO.options.user_agent
}aI[aO.name]=true;aP.push(aO)}aN={runners:aP,disabled:aL,script_map:aI,user_agent:aQ};
if(TV){console.log("tv: getScriptRunInfo("+aM+") run:"+aN.runners.length+" disabled:"+aN.disabled+" au:"+JSON.stringify(aN.user_agent))
}K.items.rundata.setj(aH,{frameId:aM,oldret:aN})}return aN
},getUserAgent:function(aH,aG){return aF.get(aH,aG).user_agent
}};return aF})();var aj=(function(){var aI={};var aO=1;
var aJ=aO++;var aR=aO++;var aQ=aO++;var aF=aO++;var aP=aO++;
var aK=aO++;var aS=aO++;var aN=aO++;var aG=aO++;var aL=aO++;
var aH=function(){var aU={frames:{0:{state:aJ}},tabs:{reset_ts:(new Date()).getTime()},scripts:{},urls:{},maps:{},contexts:{onUnload:{}},stats:{running:0,disabled:0,},extra:{}};
var aV={length:{value:0,enumerable:false,writable:true,configurable:true}};
Object.defineProperties(aU.urls,aV);return aU};var aM=function(aU){delete aI[aU]
};var aT={_info:function(){return aI},listeners:{_onReset:[],_onCommited:[],_onCompleted:[],add:{onReset:function(aU){aT.listeners._onReset.push(aU);
return aT.listeners._onReset.length-1},onCommited:function(aU){aT.listeners._onCommited.push(aU);
return aT.listeners._onCommited.length-1},onCompleted:function(aU){aT.listeners._onCompleted.push(aU);
return aT.listeners._onCompleted.length-1}},remove:{onReset:function(aU){aT.listeners._onReset[aU]=null
},onCommited:function(aU){aT.listeners._onCommited[aU]=null
},onCompleted:function(aU){aT.listeners._onCompleted[aU]=null
}}},events:{reset:function(aU,aV){if(TV){console.log("tv: events.reset("+aU+", "+aV+")")
}aI[aU]=aH();aI[aU].frames[0].state=aJ;U.forEach(aT.listeners._onReset,function(aX,aW){if(aX){aX(aU,aV)
}})},request:function(aV,aY,aX){if(TV){console.log("tv: events.request("+aV+", "+aY+", "+aX+")")
}if(!ao.values.enabled){return}aI[aV]=aI[aV]||aH();
aI[aV].frames[aY]=aI[aV].frames[aY]||{};aI[aV].frames[aY].state=aR;
var aU=B.woHash(aX);var aW=W.getUserAgent(aY,aU);if(aW[aY]){aT.set.extra(aV,aY,"user_agent",aW[aY])
}},response:function(aV,aX,aW){if(TV){console.log("tv: events.response("+aV+", "+aX+", "+aW+")")
}if(!ao.values.enabled){return}aI[aV]=aI[aV]||aH();
aI[aV].frames[aX]=aI[aV].frames[aX]||{};var aY=aI[aV].frames[aX].state||aJ;
aI[aV].frames[aX].state=aQ;if(aX===0){aI[aV].tabs.response_ts=(new Date()).getTime()
}if(aY<aQ){var aU=B.woHash(aW);aT.scripts.determine(aV,aX,aU)
}},commited:function(aW,aY,aX){if(!ao.values.enabled){return
}var aU=B.parse(aX);if(aU.protocol!=="http:"&&aU.protocol!=="https:"&&aU.protocol!=="file:"){return
}if(TV){console.log("tv: events.commited("+aW+", "+aY+", "+aX+")")
}aI[aW]=aI[aW]||aH();aI[aW].frames[aY]=aI[aW].frames[aY]||{};
var aZ=aI[aW].frames[aY].state||aJ;aI[aW].frames[aY].state=aF;
if(aZ<aQ){var aV=B.woHash(aX);aT.scripts.determine(aW,aY,aV)
}U.forEach(aT.listeners._onCommited,function(a1,a0){if(a1){a1(aW)
}})},loading:function(aW,aY,aX){if(!ao.values.enabled){return
}var aU=B.parse(aX);if(aU.protocol!=="http:"&&aU.protocol!=="https:"&&aU.protocol!=="file:"){return
}if(aY===0&&aU.protocol==="file:"){if(TV){console.log("tv: events.loading("+aW+", "+aY+", "+aX+")")
}aI[aW]=aI[aW]||aH();aI[aW].frames[aY]=aI[aW].frames[aY]||{};
var aZ=aI[aW].frames[aY].state||aJ;aI[aW].frames[aY].state=aP;
if(aZ<aQ){var aV=B.woHash(aX);aT.scripts.determine(aW,aY,aV)
}}},prepare:function(aY,a0,aU,aZ){if(TV){console.log("tv: events.prepare("+aY+", "+a0+", "+aU+", "+aZ+")")
}if(!ao.values.enabled){return}var a1=a0===0?a0:aU;
aI[aY]=aI[aY]||aH();aI[aY].frames[a1]=aI[aY].frames[a1]||{};
var aX=B.woHash(aZ);aI[aY].frames[a1].state=aK;var aW,aV=aI[aY].scripts[aX];
if(!aV){if(TV){console.warn("tv: lazy init @ events.prepare("+aY+", "+a0+", "+aU+", "+aZ+")")
}aT.scripts.determine(aY,a0,aX);aV=aI[aY].scripts[aX]
}aW=aV.runners.length;aT.scripts.updateMaps(aY,aU,aV.script_map);
aT.scripts.updateUrls(aY,aU,aX);return aW},run:function(aW,a1,a0,aX,aY){if(TV){console.log("tv: events.run("+aW+", "+a1+", "+a0+", "+aX+")")
}if(!ao.values.enabled){return}var aV=a1===0?a1:a0;
aI[aW]=aI[aW]||aH();aI[aW].frames[aV]=aI[aW].frames[aV]||{};
aI[aW].frames[aV].state=aS;var aU=B.woHash(aX);var a3=aI[aW].scripts[aU];
if(!a3){var a2;if(D){a2=aI[aW].scripts}console.warn("tv: no script run info for tab "+aW+" @ "+aU,a2);
return}var aZ=function(){delete aI[aW].scripts[aU];
if(aY){aY()}};aT.scripts.updateStats(aW,a0,a3.runners.length,a3.disabled);
aT.scripts.run(aW,a1,a0,aU,a3.runners,aZ)},complete:function(aV,aX,aW){var aU=B.parse(aW);
if(!ao.values.enabled){return}if(aU.protocol!=="http:"&&aU.protocol!=="https:"&&aU.protocol!=="file:"){return
}if(TV){console.log("tv: events.complete("+aV+", "+aX+", "+aW+")")
}if(aX===0){aI[aV]=aI[aV]||aH();aI[aV].frames[aX]=aI[aV].frames[aX]||{};
var aZ=aI[aV].frames[aX].state||aJ;aI[aV].frames[aX].state=aN;
if(!aj.get.empty(aV)&&aj.get.stats(aV).running){if(aZ<aS){console.warn("tv: no script run info!");
return}if(aU.protocol==="file:"){var aY=function(){chrome.tabs.sendMessage(aV,{method:"onLoad",frameId:aX},function(a0){})
};window.setTimeout(aY,500)}else{chrome.tabs.sendMessage(aV,{method:"onLoad",frameId:aX},function(a0){});
if(ab.runCheck){if(V||EV||UV){console.log("contentSettings: ("+(new Date()).getTime()+") javascript.clear({})")
}chrome.contentSettings.javascript.clear({})}}}}U.forEach(aT.listeners._onCompleted,function(a1,a0){if(a1){a1(aV)
}})},unload:function(aV,aX,aU){if(TV){console.log("tv: events.unload("+aV+", "+aX+", "+aU+")")
}var aY=aX===0?aX:aU;aI[aV]=aI[aV]||aH();aI[aV].frames[aY]=aI[aV].frames[aY]||{};
aI[aV].frames[aY].state=aG;if(aI[aV]){if(aI[aV].contexts.onUnload[aU]){for(var aW=0;
aW<aI[aV].contexts.onUnload[aU].length;aW++){aI[aV].contexts.onUnload[aU][aW]()
}aI[aV].contexts.onUnload[aU]=[]}}},remove:function(aU){if(TV){console.log("tv: events.remove("+aU+")")
}aM(aU)}},scripts:{updateStats:function(aV,aU,aW,aX){aI[aV].stats.running+=aW;
aI[aV].stats.disabled+=aX;aI[aV].contexts.onUnload[aU]=aI[aV].contexts.onUnload[aU]||[];
aI[aV].contexts.onUnload[aU].push(function(){aI[aV].stats.running-=aW;
aI[aV].stats.disabled-=aX});aI[aV].tabs.ts=(new Date()).getTime()
},updateMaps:function(aV,aU,aX){var aY=1;var aW=function(a0,aZ){if(aI[aV].maps[aZ]===undefined){if(aY===1){aI[aV].maps[aZ]=0
}}aI[aV].maps[aZ]+=aY};U.forEach(aX,aW);aI[aV].contexts.onUnload[aU]=aI[aV].contexts.onUnload[aU]||[];
aI[aV].contexts.onUnload[aU].push(function(){if(!aI[aV]){return
}aY=-1;U.forEach(aX,aW)})},updateUrls:function(aW,aU,aV){var aY=1;
var aX=function(){if(aI[aW].urls[aV]===undefined){if(aY===1){aI[aW].urls[aV]=0
}}aI[aW].urls[aV]+=aY;aI[aW].urls.length=-1};aX();aI[aW].contexts.onUnload[aU]=aI[aW].contexts.onUnload[aU]||[];
aI[aW].contexts.onUnload[aU].push(function(){if(!aI[aW]){return
}aY=-1;aX()})},determine:function(aW,aX,aV){var aU=W.get(aX,aV);
aI[aW].scripts[aV]=aU;return aU.runners.length},run:function(aY,a6,a4,aV,a9,a0){var a7=[];
var a5=1;var aW=function(){if(--a5===0&&a0){a0()}};
var ba=al.RUNTIME.ALLOWS_FAST_DOCUMENT_START&&ao.values.runtime_fastDocumentStart;
for(var a1=0;a1<a9.length;a1++){var a8=a9[a1];if(!a8.options.user_agent){var a3=ba&&a8.options.run_at=="document-start";
var aZ=new ag(a3);a5++;var aU=aZ.contentLoad({tabId:aY,frameId:a6,contextId:a4,url:aV},a8,aW);
if(aU){a7.push(aU)}}}for(var a2=0,aX=null;aX=a7[a2];
a2++){chrome.tabs.sendMessage(aY,aX,function(){})}aW()
}},set:{extra:function(aU,aX,aV,aW){aI[aU]=aI[aU]||aH();
if(aX===null){aI[aU].extra[aV]=aW}else{aI[aU].extra[aV]=aI[aU].extra[aV]||{};
aI[aU].extra[aV][aX]=aW}},blocker:function(aV,aU){aT.set.extra(aV,null,"blocker",true)
},forbidden:function(aV,aW,aU){if(aW===0){aT.set.extra(aV,null,"forbidden",true)
}},fire:{count:function(aU,aV){aT.set.extra(aU,null,"fire_count",aV)
}}},get:{extra:function(aU,aY,aV,aX){if(aX===undefined){aX=null
}var aW=null;aW=(aI[aU]?aI[aU].extra:{})[aV];if(aY!==null&&aW){aW=aW[aY]
}return aW||aX},empty:function(aV){var aU=true;if(aI[aV]){if(aI[aV].urls.length==0){}else{if(aI[aV].urls.length==-1){aI[aV].urls.length=0;
var aW=function(aY,aX){if(aX!=="length"&&aY>0){aI[aV].urls.length++
}};U.forEach(aI[aV].urls,aW);return aT.get.empty(aV)
}else{aU=false}}}return aU},fire:{count:function(aU){return aT.get.extra(aU,null,"fire_count")
}},urls:function(aU){return aI[aU]?aI[aU].urls:{}},stats:function(aW,aX){var aV={};
if(aI[aW]){aV.running=aI[aW].stats.running;aV.disabled=aI[aW].stats.disabled;
if(aX){aV.unique=0;for(var aU in aI[aW].maps){if(!aI[aW].maps.hasOwnProperty(aU)){continue
}if(aI[aW].maps[aU]>0){aV.unique++}}}}return aV},tabs:function(){var aU={};
var aV=function(aW,aX){aU[aX]={ts:aW.response_ts}};
U.forEach(aI,aV);return aU},blocker:function(aU){return aT.get.extra(aU,null,"blocker")
},forbidden:function(aV,aW,aU){return aT.get.extra(aV,null,"forbidden")
},user_agent:function(aU,aV){return aT.get.extra(aU,aV,"user_agent")
}}};return aT})();var an=(function(){var aF={getInstallPageUrl:function(aG){return chrome.extension.getURL("ask.html")+"?script="+F.Base64.encode(aG)+"&i18n="+ao.values.i18n
},openInstallPage:function(aI,aJ,aG){var aH=aF.getInstallPageUrl(aJ);
if(RV){console.log("bg: user script detected @ "+aJ+" -> open tab with "+aH)
}if(aI){chrome.tabs.update(aI,{url:aH},aG)}else{chrome.tabs.create({url:aH},aG)
}},useNewTab:function(){return ao.values.script_link_open_method=="new_tab"||(ao.values.script_link_open_method=="default"&&al.RUNTIME.BROWSER_VERSION>=31)
},isScriptUrl:function(aH){if(!aH||aH.search(/\#bypass=true/)!=-1||aH.search(al.REQUESTS.GET_INTERNAL_PAGE_REGEXP())!=-1){return false
}var aG=aH.split(/[\?#$]/)[0];var aI=aG.search(/\.user\.(js\#|js\?|js$)/)!=-1||aG.search(/\.tamper\.(js\#|js\?|js$)/)!=-1;
if(!aI){return aI}var aJ=(aG.search(/^htt[ps]{1,2}:\/\/code\.google\.com/)!=-1)||(aG.search(/^htt[ps]{1,2}:\/\/github\.com/)!=-1&&aG.search(/^htt[ps]{1,2}:\/\/github\.com\/[a-zA-Z0-9%-]\/[a-zA-Z0-9%-]\/raw\//)==-1);
return !aJ}};return aF})();var b={id:0,useXmlHttpReq:true,useIframeMessage:false,callbacks:{},listener:function(aF,aJ){aJ=aF?aF.data:aJ;
try{var aG=JSON.parse(aJ);var aI=b.callbacks[aG.id];
if(aI){if(V){console.log("localFile: retrieval of '"+aI.url+"' took "+((new Date()).getTime()-aI.ts)+"ms")
}if(aI.cb){aI.cb(aG.content)}if(aI.iframe){aI.iframe.parentNode.removeChild(aI.iframe)
}delete b.callbacks[aG.id]}else{console.warn("localFile: Warn: getSource callback "+aG.id+" not found!")
}}catch(aH){console.error("localFile: Error: getSource processing of "+aJ+" failed!")
}},initialize:function(){if(b.useIframeMessage){window.addEventListener("message",b.listener,false);
window.addEventListener("unload",b.clean,false)}},clean:function(){if(b.useIframeMessage){window.removeEventListener("message",b.listener,false);
window.removeEventListener("unload",b.clean,false)}b.callbacks={}
},getSource:function(aF){if(typeof aF==="string"){aF={url:aF}
}if(b.useXmlHttpReq){return b.getSourceXmlHttp(aF)}else{return b.getSourceIframe(aF)
}},getSourceXmlHttp:function(aJ){var aH=(new Date()).getTime();
aJ.url+=(aJ.url.search("\\?")!=-1)?"&":"?";aJ.url+="ts="+aH;
var aI=function(aK){aJ.cb(F.arrbuf2str(aK.response,aJ.encoding)||"")
};var aF={method:"GET",retries:0,url:aJ.url,responseType:"arraybuffer"};
if(aJ.cb){ad(aF,{onload:aI})}else{var aG=ad(aF,{});
return aG.readyState==4&&(aG.status==200||aG.status==0)?F.arrbuf2str(aG.response,aJ.encoding):null
}},getSourceIframe:function(aI){if(b.id==0){b.initialize()
}var aF=document.createElement("iframe");aF.src=aI.url+"?gimmeSource=1";
document.getElementsByTagName("body")[0].appendChild(aF);
var aH=JSON.stringify({id:b.id});b.callbacks[b.id]={cb:aI.cb,ts:(new Date()).getTime(),iframe:aF,url:aI.url};
var aG=function(){var aK=b.id;var aJ=function(){if(aK==null){return
}if(b.callbacks[aK]){b.listener(null,JSON.stringify({id:aK,content:null}))
}aK=null};var aL=function(){if(aK==null){return}try{aF.contentWindow.postMessage(aH,aF.src);
aK=null}catch(aM){if(D){console.error("localFile: ERROR:"+aM.message)
}}};aF.onload=aL;window.setTimeout(aJ,3000)};aG();b.id++
}};lfgs=b;var N=(function(){var aF={fireDB:null,status:{initialized:false,action:"Initializing"},resetStatus:function(aG){if(aG===undefined){aG=!!aF.fireDB
}aF.status={initialized:aG,update:false,download:false,action:"",error:"",progress:{n:0,of:0}}
},isReady:function(){return aF.status.initialized&&!aF.status.update&&!aF.status.download
},checkUpdate:function(aK,aN,aR,aL){var aH=aK||aN;if(!aH&&(ao.values.fire_updatePeriod==0||!ao.values.fire_enabled)){return
}var aO=I.getConfig();var aM=function(){if(aL){aL(aF.status.error=="")
}};if(aF.status.update||aF.status.download){if(aR){aR(true)
}var aQ=function(){if(aF.isReady()){aM()}else{window.setTimeout(aQ,1000)
}};if(aL){aQ()}return}if(aH||((new Date()).getTime()-aO.fire.last)>ao.values.fire_updatePeriod){var aP=0;
var aI=function(){var aS=function(aT){if(aF.status.error==""){aO.fire.last=(new Date()).getTime();
aO.fire.db_version=aP;aO.fire.entries=aT;I.setConfig(aO)
}aM()};aF.update(aK,aS)};var aJ=function(aS){if(aS.readyState==4){if(aS.status=200){try{var aV=JSON.parse(aS.responseText);
aP=aV.db_version}catch(aU){console.log("bg: fire: unable to parse DB version response! "+aS.responseText)
}console.log("bg: fire: local DB version: "+aO.fire.db_version+" remote: "+aP);
var aT=aP>aO.fire.db_version||aN;if(aR){aR(aT)}if(aT){aI();
return}}aM()}};var aG={method:"GET",url:aF.updateURL()+"&db_version=get",retries:al.XMLHTTPREQUEST.RETRIES,overrideMimeType:"text/plain; charset=x-user-defined"};
ad(aG,{onload:aJ})}else{aM()}},updateURL:function(){return ao.values.fire_getURL+"?ts=0"
},update:function(aO,aJ){var aV=10;var aS=2;var aH=null;
var aU=aS;var aT=null;var aI=1;var aN=null;var aM=0;
var aK={};var aQ=function(){if(aH){window.clearTimeout(aH)
}aH=null};var aP=function(){aQ();aH=window.setTimeout(aT,2*60*1000)
};var aW=function(aX){return{method:"GET",url:aF.updateURL()+"&part="+aX,retries:al.XMLHTTPREQUEST.RETRIES,overrideMimeType:"text/plain; charset=x-user-defined"}
};var aR=function(aX){aQ();aF.resetStatus();aF.status.error=aX;
if(aJ){aJ()}console.log(az.getMessage("TamperFire_update_failed___")+" Error: "+aX+" @ file:"+aW(aI).url);
ar.show("TamperFire",az.getMessage("TamperFire_update_failed___"),chrome.extension.getURL("images/icon128.png"),30000)
};var aG=function(aY){aP();if(aY.progress&&aY.progress.totalSize!=-1){if(aN==null){aN=aY.progress.totalSize
}var aX=aN*6*aV;var aZ=aY.progress.done+aN*6*(aI-1);
if(aZ>aX){aZ=aX}aF.status.progress={n:aZ,of:aX};if(D&&(++aM%50)==0){console.log("bg: fire download: "+aY.progress.done+" bytes "+aZ+"/"+aX)
}}};var aL=function(a2){aP();if(a2.readyState==4){if(a2.status=200){aQ();
var a5={};var a6=a2.responseText;try{a5=JSON.parse(a6)
}catch(a1){var a0="<body>";var aZ="</body>";if(a6.search(a0)!=-1){var a4=a6.indexOf(a0);
var a3=a6.lastIndexOf(aZ);if(a4!=-1&&a3!=-1){a6=a6.substr(a4+a0.length,a3-(a4+a0.length))
}}try{a5=JSON.parse(a6)}catch(a1){aR("Parse Error! Update URL: "+aF.updateURL());
return}}a6=null;if(!a5.scripts){aR("Invalid Content! Update URL: "+aF.updateURL());
return}for(var aY in a5.scripts){aK[aY]=a5.scripts[aY]
}a5=null;if(aI<aV){if(D){console.log("bg: fire: download of file "+aI+" succced")
}aI++;aU=aS;aT()}else{aF.resetStatus();aF.status.update=true;
aF.status.action=az.getMessage("Update_in_progress");
var a7=function(a9){var ba=a9!==false;if(!ba){aF.resetStatus(false);
return}aF.status.update=true;var a8=function(bb){aF.resetStatus();
console.log(az.getMessage("TamperFire_is_up_to_date"));
ar.show("TamperFire",az.getMessage("TamperFire_is_up_to_date"),chrome.extension.getURL("images/icon128.png"),30000);
if(aJ){aJ(bb)}};aF.insertValuesFromJSON({scripts:aK},a8);
aK=null};var aX=function(){aF.initTables(a7)};aF.clean(aX)
}}else{aR("Update URL: "+a2.status);return}}else{console.log(a2)
}};aT=function(){if(aU>0){aF.status.action=az.getMessage("Downloading");
aF.status.download=true;aP();ad(aW(aI),{onload:aL,onreadychange:aG});
aU--}else{aR("Download failed!")}};console.log(az.getMessage("TamperFire_update_started"));
ar.show("TamperFire",az.getMessage("TamperFire_update_started"),chrome.extension.getURL("images/icon128.png"),30000);
if(!aO){chrome.tabs.create({url:chrome.extension.getURL("fire.html")},function(){})
}aT()},init:function(aG){var aH=function(aI){var aJ=aI!==false;
if(aG){aG(aJ)}if(aJ){window.setTimeout(aF.checkUpdate,20000)
}};aF.resetStatus(false);aF.initTables(aH)},clean:function(aH){var aJ=function(){if(aH){aH()
}};var aM=function(){aF.fireDB.db.transaction(function(aN){aN.executeSql("DROP TABLE scripts",[],aJ,aJ)
})};var aG=function(){aF.fireDB.db.transaction(function(aN){aN.executeSql("DROP TABLE excludes",[],aM,aM)
})};var aI=function(){aF.fireDB.db.transaction(function(aN){aN.executeSql("DROP TABLE includes",[],aG,aG)
})};var aK=function(){aF.fireDB.db.transaction(function(aN){aN.executeSql("DROP TABLE scriptexcludes",[],aI,aI)
})};var aL=function(){aF.fireDB.db.transaction(function(aN){aN.executeSql("DROP TABLE scriptincludes",[],aK,aK)
})};aL()},initTables:function(aG){var aJ=function(){aF.status.initialized=true;
if(aG){aG()}};var aO=null;try{aO=openDatabase("tmFire","1.0","TamperFire",40*1024*1024)
}catch(aN){console.warn("Unable to open TamperFire database! ",aN.message);
if(aG){aG(false)}return}aF.fireDB={db:aO,onSuccess:function(aQ,aP){if(V){console.log("fireDB Success ")
}},onError:function(aP,aS,aQ,aR){console.error("fireDB Error "+JSON.stringify(aS));
if(aQ){console.warn(" @ statement "+aQ)}if(aR){console.warn("        with "+JSON.stringify(aR))
}},createScriptTable:function(aQ){var aP=function(aR,aS){aF.fireDB.onError(aR,aS);
if(aG){aG(false)}};aF.fireDB.db.transaction(function(aR){aR.executeSql("CREATE TABLE IF NOT EXISTS scripts(sid INTEGER PRIMARY KEY ASC, value TEXT)",[],aQ,aP)
})},createScriptIncludesTable:function(aQ){var aP=function(aR,aS){aF.fireDB.onError(aR,aS);
if(aG){aG(false)}};aF.fireDB.db.transaction(function(aR){aR.executeSql("CREATE TABLE IF NOT EXISTS scriptincludes(iid INTEGER, sid INTEGER, FOREIGN KEY(sid) REFERENCES scripts(sid),FOREIGN KEY(iid) REFERENCES includes(iid))",[],aQ,aP)
})},createIncludesTable:function(aQ){var aP=function(aR,aS){aF.fireDB.onError(aR,aS);
if(aG){aG(false)}};aF.fireDB.db.transaction(function(aR){aR.executeSql("CREATE TABLE IF NOT EXISTS includes(iid INTEGER PRIMARY KEY ASC, generic BOOLEAN, regex TEXT)",[],aQ,aP)
})},createScriptExcludesTable:function(aQ){var aP=function(aR,aS){aF.fireDB.onError(aR,aS);
if(aG){aG(false)}};aF.fireDB.db.transaction(function(aR){aR.executeSql("CREATE TABLE IF NOT EXISTS scriptexcludes(eid INTEGER, sid INTEGER, FOREIGN KEY(sid) REFERENCES scripts(sid),FOREIGN KEY(eid) REFERENCES excludes(eid))",[],aQ,aP)
})},createExcludesTable:function(aQ){var aP=function(aR,aS){aF.fireDB.onError(aR,aS);
if(aG){aG(false)}};aF.fireDB.db.transaction(function(aR){aR.executeSql("CREATE TABLE IF NOT EXISTS excludes(eid INTEGER PRIMARY KEY ASC, regex TEXT)",[],aQ,aP)
})}};var aH=function(){aF.fireDB.createScriptExcludesTable(aJ)
};var aI=function(){aF.fireDB.createScriptIncludesTable(aH)
};var aK=function(){aF.fireDB.createExcludesTable(aI)
};var aL=function(){aF.fireDB.createIncludesTable(aK)
};var aM=function(){aF.fireDB.createScriptTable(aL)
};aM()},insertValuesFromJSON:function(aZ,aQ){var aL=[];
var aX=10000;var aK=[];var aR={};var aH={};var aU=[];
var a3=[];var aN=[];var aT=[];var aI=0;var a0=0;console.log(az.getMessage("TamperFire_import_started"));
for(var aS in aZ.scripts){if(!aZ.scripts.hasOwnProperty(aS)){continue
}aL.push(aS)}aF.status.action=az.getMessage("Processing_scripts");
aF.status.progress={n:0,of:aL.length};var aW=0;var aV;
var a2=0;var aG=function(){for(var a4 in aR){var a5=aI++;
aU.push([a4,aR[a4].generic,a5]);for(var a6 in aR[a4].sids){aN.push([a5,aR[a4].sids[a6]])
}}};var a1=function(){for(var a5 in aH){var a4=a0++;
a3.push([a5,a4]);for(var a6 in aH[a5].sids){aT.push([a4,aH[a5].sids[a6]])
}}};var aY=function(a7,a9,ba,a4){if(ba.length){aF.resetStatus();
aF.status.update=true;aF.status.action=az.getMessage("Writing_scripts");
aF.status.progress={n:a7,of:aU.length+a3.length+aN.length+aT.length}
}else{if(a4){a4()}return}var a8=function(){aY(a7,a9,ba,a4)
};var a6=function(){if(aV>=ba.length-1){if(a4){a4()
}}else{window.setTimeout(a8,0)}};var a5=ba.length-1;
if((a5-aV)>aX){a5=aV+aX}if(D){console.log("bg: write TF "+a5)
}a9(ba.slice(aV,a5),a6);aV=a5;aF.status.progress.n=a7+aV
};var aP=function(a4){if(aK.length){aF.scripts.setValues(aK,a4);
aK=[]}else{if(a4){a4()}}};var aO=function(){var a6=function(){if(aQ){aQ(aL.length)
}};var a7=function(){aV=0;aY(a2,aF.scriptExcludes.setValues,aT,a6);
a2+=aT.length};var a8=function(){aV=0;aY(a2,aF.scriptIncludes.setValues,aN,a7);
a2+=aN.length};var a4=function(){aV=0;aY(a2,aF.excludes.setValues,a3,a8);
a2+=a3.length};var a5=function(){aV=0;aY(a2,aF.includes.setValues,aU,a4);
a2+=aU.length};aG();a1();aP(a5)};var aJ=function(){if(aK.length>aX){aP(aJ);
return}aW++;if(aW%96==0){window.setTimeout(aM,0)}else{aM()
}};var aM=function(){if(D&&aW%2048==0){console.log("bg: import TF script "+aL[aW])
}aF.status.progress.n=aW;if(aW<aL.length){var a8=aZ.scripts[aL[aW]];
aK.push([aL[aW],JSON.stringify(a8)]);for(var a5=0;a5<a8.excludes.length;
a5++){var a4=B.getRegExpFromInclude(a8.excludes[a5],{safe:true,tryToFixUrl:ao.values.tryToFixUrl,safeUrls:ao.values.safeUrls});
if(!aH[a4]){aH[a4]={sids:[]}}aH[a4].sids.push(aL[aW])
}for(var a5=0;a5<a8.includes.length;a5++){var a7=a8.includes[a5].trim();
var a4=B.getRegExpFromInclude(a7,{safe:true,tryToFixUrl:ao.values.tryToFixUrl,safeUrls:ao.values.safeUrls});
if(!aR[a4]){var a6=0;if(a7.search("^[https*]]{1,}[://]{0,}[w.]{0,4}[*|.]{1,}[$|/]")!=-1||a7.search("^[.*/]{1,}$")!=-1||a7.search("^[https*]{1,}[://]{0,}[w.]{0,4}[.|*|/]{1,}$")!=-1||a7.search("^"+U.escapeForRegExp("*://*[$|/]"))!=-1||a7.replace(new RegExp("(https|http|\\*).://\\*"),"")==""||a7=="*"){a6=1
}aR[a4]={sids:[],generic:a6.toString()}}aR[a4].sids.push(aL[aW])
}aJ()}else{aO()}};aM()},count:function(aJ,aK,aI,aG){var aH=function(aL){aG(aL.length)
};aF.getValues(aJ,aK,[aI],aH)},setValue:function(aJ,aL,aI,aH,aK,aG){aF.setValues(aJ,[aL,aH],[aH,aK],aG)
},setValues:function(aO,aP,aI,aK){if(V){console.log("self.setValues")
}var aM=0;var aL=function(){if(aK){aK()}};var aH=[];
var aN=[];for(var aG=0;aG<aP.length;aG++){aH.push(aP[aG]);
aN.push("?")}var aJ=function(aQ){if(aM<aI.length){var aR="INSERT INTO "+aO+"("+aH.join(", ")+") VALUES ("+aN.join(", ")+");";
aQ.executeSql(aR,aI[aM],aJ,function(aS,aT){aF.fireDB.onError(aS,aT,aR,aI[aM]);
aJ(aS)});aM++}else{aL()}};aF.fireDB.db.transaction(aJ)
},getValues:function(aP,aK,aN,aH){if(V){console.log("self.getValues")
}var aI=0;var aJ=null;var aL=[];var aM=20;var aO=function(aQ,aS){if(aS.rows){for(var aR=0;
aR<aS.rows.length;aR++){aL.push(aS.rows.item(aR))}}if(aI<aN.length){aG()
}else{aH(aL)}};var aG=function(aR){if(!aJ){aJ=aR}var aQ=[];
var aR=[];for(var aS=aI;aS<aN.length&&aS-aI<aM;aS++){aR.push(aK+"=?");
aQ.push(aN[aS])}aJ.executeSql("SELECT * FROM "+aP+" WHERE "+aR.join(" OR "),aQ,aO,aF.fireDB.onError);
aI+=aM};aF.fireDB.db.transaction(aG)},getMax:function(aI,aH,aG){var aL='MAX("'+aH+'")';
var aK=function(aM,aO){var aN=0;if(aO.rows&&aO.rows.length){aN=aO.rows.item(0)[aL]
}aG(aN)};var aJ=function(aM){aM.executeSql("SELECT "+aL+' FROM "'+aI+'"',[],aK,aF.fireDB.onError)
};aF.fireDB.db.transaction(aJ)},tab:{getItems:function(aH,aJ){var aI=0;
var aG={};var aN=[];var aM=1;var aK=function(){for(var aP in aG){if(!aG.hasOwnProperty(aP)){continue
}aN.push(aG[aP])}if(aM==0&&aJ){window.setTimeout(function(){aJ(aN)
},1)}};var aO=function(aQ){for(var aP=0;aP<aQ.length;
aP++){aG[aQ[aP][ah]]=aQ[aP]}if(--aM==0){aK()}};if(!aj.get.empty(aH)){var aL=function(aQ,aP){aM++;
aF.url.getItems(aP,aO)};U.forEach(aj.get.urls(aH),aL)
}aM--;aK()},getCountCallbacks:{},resetFireCnt:function(aG){aF.tab.getCountCallbacks[aG]=[];
aj.set.fire.count(aG,null)},getCount:function(aK,aG){var aJ=aj.get.fire.count(aK);
if(aJ){aG(aJ)}else{var aI=function(aM){if(!aF.tab.getCountCallbacks[aK]){return
}while(aF.tab.getCountCallbacks[aK].length>0){var aL=aF.tab.getCountCallbacks[aK].pop();
if(aL){aL(aM)}}};var aH=function(aL){aj.set.fire.count(aK,aL.length);
aI(aL.length)};if(!aF.tab.getCountCallbacks[aK]){aF.tab.getCountCallbacks[aK]=[]
}if(aF.tab.getCountCallbacks[aK].length==0){aF.tab.getItems(aK,aH)
}aF.tab.getCountCallbacks[aK].push(aG)}}},url:{getCount:function(aH,aG){if(D){console.log("bg: TF: get count for URL "+aH)
}var aK="count(*)";var aJ=function(aL,aN){var aM=0;
if(aN.rows&&aN.rows.length){aM=aN.rows.item(0)[aK]}aG(aM)
};var aI="";aI+="SELECT "+aK+" FROM scripts WHERE sid IN ";
aI+="    (SELECT sid FROM scriptincludes WHERE iid IN (SELECT iid FROM includes WHERE generic=0 AND ? REGEXP regex)) ";
aI+="AND NOT sid IN ";aI+="    (SELECT sid FROM scriptexcludes WHERE eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex)) ";
aF.fireDB.db.transaction(function(aL){aL.executeSql(aI,[aH,aH],aJ,aF.fireDB.onError)
})},getItems:function(aH,aK){if(D){console.log("bg: TF: get scripts for URL "+aH)
}var aO=[];var aJ="";var aQ=1,aN=0,aM=0;if(aQ==0){aJ+="SELECT DISTINCT t1.* FROM scripts T1 JOIN scriptincludes T2 ON T1.sid=T2.sid WHERE T2.iid IN ";
aJ+="    (SELECT iid FROM includes WHERE generic=0 AND ? REGEXP regex) ";
aJ+="AND NOT T1.sid IN ";aJ+="    (SELECT T4.sid FROM excludes T3 JOIN scriptexcludes T4 ON T3.eid=T4.eid WHERE T3.eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex))"
}else{if(aQ==1){aJ+="SELECT * FROM scripts T1 WHERE T1.sid IN ";
aJ+="    (SELECT sid FROM scriptincludes WHERE iid IN (SELECT iid FROM includes WHERE generic=0 AND ? REGEXP regex)) ";
aJ+="AND NOT T1.sid IN ";aJ+="    (SELECT sid FROM scriptexcludes WHERE eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex)) "
}else{if(aQ==2){aJ+="SELECT DISTINCT t1.* FROM scripts T1 JOIN scriptincludes T2 ON T1.sid=T2.sid WHERE EXISTS";
aJ+="    (SELECT iid FROM includes I1 WHERE T2.iid=I1.iid AND generic=0 AND ? REGEXP regex) ";
aJ+="AND NOT T1.sid IN ";aJ+="    (SELECT T4.sid FROM excludes T3 JOIN scriptexcludes T4 ON T3.eid=T4.eid WHERE T3.eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex))"
}else{if(aQ==3){aJ+="SELECT DISTINCT t1.* FROM scripts T1 JOIN scriptincludes T2 ON T1.sid=T2.sid JOIN includes I1 ON I1.iid=T2.iid WHERE I1.generic=0 AND ? REGEXP I1.regex ";
aJ+="AND NOT T1.sid IN ";aJ+="    (SELECT T4.sid FROM excludes T3 JOIN scriptexcludes T4 ON T3.eid=T4.eid WHERE T3.eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex))"
}}}}var aG="SELECT DISTINCT t1.value, t1.sid FROM scripts T1 JOIN scriptincludes T2 ON T1.sid=T2.sid WHERE T2.iid IN (SELECT iid FROM includes WHERE generic=0)";
var aP=(aH=="*");var aI=(aP?aG:aJ);var aL=function(aR,aU){aM=(new Date()).getTime();
if(D){console.log("bg: TF db access: "+aQ+" -> "+(aM-aN)+"ms")
}if(aU.rows&&aU.rows.length){for(var aS=0;aS<aU.rows.length;
aS++){try{var aV=aU.rows.item(aS).value;aO.push(JSON.parse(aV))
}catch(aT){console.error("bg: error parsing TamperFire entry "+item[aS])
}}aK(aO)}else{console.warn("bg: warn: no scripts entry");
aK(aO)}};aF.fireDB.db.transaction(function(aR){aN=(new Date()).getTime();
aR.executeSql(aI,aP?[]:[aH,aH],aL,aF.fireDB.onError)
})}},ids:{getItems:function(aJ,aG){var aI=[];var aH=function(aL){if(aL&&aL.length){for(var aK=0;
aK<aL.length;aK++){try{aI.push(JSON.parse(aL[aK]))}catch(aM){console.error("bg: error parsing TamperFire entry "+aL)
}}aG(aI)}else{console.warn("bg: warn: no scripts entry");
aG(aI)}};if(aJ.length){aF.scripts.getValues(aJ,null,aH)
}else{aG(aI)}}},includes:{setValues:function(aH,aG){aF.setValues("includes",["regex","generic","iid"],aH,aG)
}},scriptIncludes:{setValues:function(aH,aG){aF.setValues("scriptincludes",["iid","sid"],aH,aG)
}},excludes:{setValues:function(aH,aG){aF.setValues("excludes",["regex","eid"],aH,aG)
}},scriptExcludes:{setValues:function(aH,aG){aF.setValues("scriptexcludes",["eid","sid"],aH,aG)
}},scripts:{getValues:function(aJ,aI,aG){var aH=function(aK){var aL=[];
for(var aM=0;aM<aK.length;aM++){aL.push(aK[aM]["value"])
}aG(aL)};aF.getValues("scripts","sid",aJ,aH)},setValue:function(aH,aI,aG){aF.setValue("scripts","sid",aH,"value",aI,aG)
},setValues:function(aH,aG){aF.setValues("scripts",["sid","value"],aH,aG)
}}};return aF})();fire=N;var J=function(){var aF=[];
var aH=[];for(var aI=0;aI<aF.length;aI++){var aG="system/"+aF[aI]+".tamper.js";
var aJ=Registry.getRaw(aG);if(aJ){aH.push(aJ)}}return aH
};var ac={initialized:false,listenerRegistered:false,enabled:false,syncing:0,period:null,syncDoneListener:[],scheduled:{to:null,force:null,t:0},SYNCED:{comment:true},createTeslaData:function(aG){var aI=[];
var aJ=ac.getLocalScriptList();for(var aH=0;aH<aJ.length;
aH++){if(aJ[aH].url){var aF=JSON.stringify(aJ[aH].options);
var aK=aJ[aH].name.replace(/\|/g,"!")+"|"+aF+"|"+aJ[aH].url.replace(/\|/g,"%7C");
aI.push(aK)}}if(aG){aG(aI)}},enable:function(aF){if(ac.enabled){if(D&&ac.initialized&&ac.listenerRegistered){console.log("sync: reenable?")
}}else{if(ao.values.sync_type==0){ac.enabled=false}else{ac.enabled=a.init(ao.values.sync_type,ao.values.sync_id)
}}if(!ac.listenerRegistered){a.addChangeListener(ac.remoteChangeCb);
ac.listenerRegistered=true}if(!ac.initialized){ac.initialized=true
}if(aF){aF(ac.enabled)}},finalize:function(){},reset:function(aF){a.reset(aF)
},addSyncDoneListener:function(aF){ac.syncDoneListener.push(aF);
if(V){console.log("sync: addSyncDoneListener() -> "+ac.syncDoneListener.length)
}},runAllSyncDoneListeners:function(aG){if(V){console.log("sync: runAllSyncDoneListeners() -> "+ac.syncDoneListener.length)
}while(ac.syncDoneListener.length){var aF=ac.syncDoneListener.splice(0,1);
aF[0](aG)}},scheduleSync:function(aG,aH){var aK=(new Date()).getTime();
aH=ac.scheduled.force||aH;if(ac.scheduled.to){window.clearTimeout(ac.scheduled.to);
if(ac.scheduled.ts<(aK+aG)){aG=ac.scheduled.ts-aK;if(aG<1){aG=1
}if(V){console.log("sync: re-schedule sync for run in "+aG+" ms")
}}}else{if(D){console.debug("sync: schedule sync for run in "+aG+" ms")
}}var aI=function(){ac.sync(ac.scheduled.force);ac.scheduled.to=null;
ac.scheduled.force=null};var aJ=function(){ac.scheduled.to=null;
ac.scheduled.force=null;ac.runAllSyncDoneListeners(false)
};var aF=function(){if(ao.values.sync_type==a.types.eCHROMESYNC){if(!ac.listenerRegistered){ac.enable(aI)
}else{aI()}}else{aI()}};ac.scheduled.to=window.setTimeout(aF,aG);
ac.scheduled.force=aH;ac.scheduled.ts=aK+aG},schedulePeriodicalCheck:function(){if(ac.period){return
}var aF=18000000;if(D){console.debug("sync: schedule sync for periodical run every "+aF+" ms")
}ac.period=window.setInterval(ac.sync,aF)},disablePeriodicalCheck:function(){if(ac.period){if(D){console.debug("sync: disable periodical sync")
}window.clearInterval(ac.period);ac.period=null}},getLocalObjFromScript:function(aH){var aL=(aH.id||x.getScriptId(aH.name));
var aF=aH.downloadURL?aH.downloadURL.split("#")[0]:null;
var aK=aH.fileURL?aH.fileURL.split("#")[0]:null;var aJ=aK||aF;
var aI={id:aL,name:aH.name,options:{},durl:aF,furl:aK,url:aJ};
for(var aG in ac.SYNCED){if(ac.SYNCED[aG]===true&&aH.options[aG]!==null){aI.options[aG]=aH.options[aG]
}}return aI},getLocalScriptList:function(){var aF=[];
s.getUidList().forEach(function(aG){var aH=s.getByUid(aG);
if(aH.script&&aH.cond){aF.push(ac.getLocalObjFromScript(aH.script))
}});return aF},getRemoteScriptList:function(aF){a.list(aF)
},checkSyncAccount:function(aH,aF,aG){var aJ=null;var aI=function(aK){if(aJ==null){var aL=function(){ac.enable(function(){ax();
ac.scheduleSync(3000,aK)});aJ=null};aJ=window.setTimeout(aL,200)
}};if(aH=="sync_enabled"){if(aG){if(ao.values.sync_type==a.types.ePASTEBIN){ac.schedulePeriodicalCheck()
}aI()}else{ac.enabled=false;ac.disablePeriodicalCheck()
}}else{if(aH=="sync_type"){if(aG==a.types.ePASTEBIN){ac.schedulePeriodicalCheck()
}else{if(aG==a.types.eCHROMESYNC){ac.disablePeriodicalCheck()
}}aI()}else{if(aH=="sync_id"){if(ao.values.sync_type==a.types.ePASTEBIN){aI()
}}}}},sync:function(aF){if(ac.syncing>0){if(aF){var aK=function(aW){if(aW){ac.scheduleSync(50,aF)
}};ac.addSyncDoneListener(aK)}return}if(!ac.enabled){return
}ac.syncing++;if(V){console.log("sync: start syncing = "+ac.syncing)
}var aS=null;var aG=null;var aJ=[];var aR=false;var aU=true;
var aT={};var aM=function(){if(aJ.length>0){var aW=aJ.splice(0,1);
window.setTimeout(aW[0],1)}};var aO=function(){aU=false;
aL()};var aI=function(){ac.getRemoteScriptList(aQ);
aS=ac.getLocalScriptList()};var aQ=function(aW){aG=aW;
if(aG){aM()}else{if(D){console.error("sync: unable to get remotelist!")
}aO()}};aJ.push(aI);var aH=function(aX){if(aX){aX=aX.split("#")[0];
if(aX){aX=aX.toLowerCase()}for(var aW=0;aW<aS.length;
aW++){var aY=aS[aW].furl?aS[aW].furl.toLowerCase():null;
var aZ=aS[aW].durl?aS[aW].durl.toLowerCase():null;if(aY==aX||aZ==aX){return aS[aW]
}}}return null};var aP=function(aX){if(aX){aX=aX.split("#")[0];
for(var aW=0;aW<aG.length;aW++){if(aG[aW].url==aX){return aG[aW]
}}}return null};var aN=function(){var a3=1;var aX=function(){if(--a3==0){aM()
}};for(var a4=0;a4<aG.length;a4++){var aY=aG[a4];var a2=false;
var a1=false;var aZ=aH(aY.url);if(aZ){a2=true;aT[aY.url]=true;
for(var a0 in ac.SYNCED){if(ac.SYNCED[a0]===true&&aZ.options[a0]!=aY.options[a0]){a1=true;
break}}}if(a2){if(aY.options.removed){aR=true;if(D){console.debug("sync: remove local script "+(aY.name||aY.url))
}s.setByName(aZ.name,null,false)}else{if(a1){aR=true;
if(D){console.debug("sync: update local script "+(aY.name||aY.url))
}var aW=s.getByName(aZ.name);if(aW.script&&aW.cond){for(var a0 in ac.SYNCED){if(ac.SYNCED[a0]===true){aW.script.options[a0]=aY.options[a0]
}}s.setByName(aW.script.name,aW.script,false)}else{console.log(az.getMessage("fatal_error")+"("+aZ.name+")!!!")
}}}}if(!a2&&!aY.options.removed){a3++;aR=true;ac.importScript(aY,aX)
}}aX()};aJ.push(aN);var aV=function(){var aY=1;var aX=function(){if(--aY==0){aM()
}};for(var aZ=0;aZ<aS.length;aZ++){var aW=false;var a3=aS[aZ];
var a1=a3.url;if(!a1||aT[a1]){continue}var a0=B.parse(a1);
if(a0.protocol=="file:"){continue}var a2=aP(a1);if(a2){aW=true
}if(!aW){aY++;aR=true;ac.exportScript(a3,aX)}}aX()};
if(ao.values.sync_type!=a.types.ePASTEBIN){aJ.push(aV)
}var aL=function(){if(D){console.debug("sync: finished")
}if(--ac.syncing==0){ac.runAllSyncDoneListeners(aU)
}if(aR){ax()}};aJ.push(aL);aM()},importScript:function(aK,aF){if(D){console.debug("sync: import "+(aK.name||aK.url))
}var aJ={imported:ao.values.sync_type};var aH={};for(var aG in ac.SYNCED){if(ac.SYNCED[aG]===true){aH[aG]=aK.options[aG]
}}var aI={ask:false,sync:aJ,save:true,force_options:aH};
t.installFromUrl(aK.url,aI,aF)},exportScript:function(aG,aF){if(D){console.debug("sync: export "+(aG.name||aG.url))
}a.add(aG,aF)},removeScript:function(aG,aF){if(D){console.debug("sync: remove "+(aG.name||aG.url))
}a.remove(aG,aF)},remoteChangeCb:function(aG,aF){if(!ac.enabled||ao.values.sync_type!=a.types.eCHROMESYNC){return
}if(V){console.log("sync: remoteChangeCb()")}ac.scheduleSync(500,true)
},scriptAddedCb:function(aG,aF){if(!ac.enabled){return
}if(V){console.log("sync: scriptAddedCb()")}var aI=ac.getLocalObjFromScript(aF);
if(!aI.url){return}var aH=B.parse(aI.url);if(aH.protocol=="file:"){return
}ac.exportScript(aI)},scriptChangedCb:function(aH,aG,aJ){if(!ac.enabled){return
}if(V){console.log("sync: scriptChangedCb()")}var aI=ac.getLocalObjFromScript(aG);
if(!aI.url){return}for(var aF in ac.SYNCED){if(ac.SYNCED[aF]===true&&aG.options[aF]!=aJ.options[aF]){ac.exportScript(aI);
break}}},scriptRemovedCb:function(aG,aF){if(!ac.enabled){return
}if(V){console.log("sync: scriptRemovedCb()")}var aH=ac.getLocalObjFromScript(aF);
if(!aH.url){return}ac.removeScript(aH)}};sycl=ac;var w=function(aF){ao.addChangeListener("scriptblocker_overwrite",ab.init);
ao.addChangeListener("sync_enabled",ac.checkSyncAccount);
ao.addChangeListener("sync_type",ac.checkSyncAccount);
ao.addChangeListener("sync_id",ac.checkSyncAccount);
ao.addChangeListener("fire_enabled",function(aI,aH,aG){if(aG&&!N.status.initialized){N.init()
}});ao.addChangeListener("logLevel",function(){G(ao.values.logLevel)
});ao.addChangeListener("i18n",function(){az.setLocale(ao.values.i18n)
});ao.addChangeListener("native_import_path",function(){aB.setPath(ao.values.native_import_path)
});ao.addChangeListener("incognito_mode",function(){y()
})};var ao=(function(){var aH="";aH+="// ==UserScript==\n";
aH+="// @name       My Fancy New Userscript\n";aH+="// @namespace  http://use.i.E.your.homepage/\n";
aH+="// @version    0.1\n";aH+="// @description  enter something useful\n";
aH+="// @match      <$URL$>\n";aH+="// @copyright  2012+, You\n";
aH+="// ==/UserScript==\n\n";var aK={};var aI={enabled:true,configMode:0,safeUrls:true,tryToFixUrl:true,debug:false,logLevel:0,showFixedSrc:false,webrequest_modHeaders:"yes",webrequest_fixCSP:"yes",scriptblocker_overwrite:"no",notification_showUpdate:"changelog",notification_silentScriptUpdate:true,scriptTemplate:aH,scriptUpdateCheckPeriod:12*60*60*1000,scriptUpdateHideNotificationAfter:15*1000,scriptUpdateCheckDisabled:false,script_link_open_method:"default",runtime_fastDocumentStart:true,runtime_unsafeWindow:"auto",autoReload:false,appearance_badges:"running",fire_enabled:false,fire_sort_cache_enabled:true,fire_getURL:"http://fire.tampermonkey.net/get.php",fire_updatePeriod:14*24*60*60*1000,fire_topOnly:true,editor_enabled:true,editor_keyMap:"windows",editor_indentUnit:4,editor_indentWithTabs:false,editor_tabMode:"smart",editor_enterMode:"indent",editor_electricChars:true,editor_autoSave:false,editor_easySave:false,native_import:true,native_import_path:null,native_import_post_action:"disable",i18n:null,incognito_mode:"temporary",layout:"default",sync_enabled:false,sync_type:2,sync_id:"",statistics_enabled:true,require_timeout:10000,require_blacklist:["/^https?:\\/\\/example.com\\/.*/"],forbiddenPages:["*.paypal.tld/*","https://*deutsche-bank-24.tld/*","https://*bankamerica.tld/*","*://apis.google.com/_/+1/*button*","*://www.facebook.com/plugins/*","*://platform.twitter.com/widgets/*"]};
var aG=function(aL){var aM=j.getValue(al.CONSTANTS.STORAGE.CONFIG,{});
return aM[aL]===undefined?aI[aL]:aM[aL]};var aJ=function(aL,aN){var aM=j.getValue(al.CONSTANTS.STORAGE.CONFIG,{});
var aO=aM[aL]===undefined?aI[aL]:aM[aL];if(aK[aL]&&aO!=aN){aK[aL].forEach(function(aQ){var aT=aL;
var aS=aG(aL);var aR=aN;if(aS!=aR){var aP=function(){aQ(aT,aS,aR)
};window.setTimeout(aP,1)}})}aM[aL]=aN;j.setValue(al.CONSTANTS.STORAGE.CONFIG,aM)
};var aF={init:function(aM){aF.values={};for(var aP in aI){if(!aI.hasOwnProperty(aP)){continue
}(function aO(){var aS=aP;var aR=function(){return aG(aS)
};var aT=function(aU){aJ(aS,aU)};aF.values.__defineGetter__(aS,aR);
aF.values.__defineSetter__(aS,aT)})()}aF.images={};
aF.images.icon="images/icon.png";aF.initialized=true;
var aQ=J();for(var aL in aQ){var aN=aQ[aL];window.setTimeout(function(){t.saveScriptEx({tabid:null,url:null,src:aN,ask:false,defaultscript:true})
},1)}if(aM){aM()}},addChangeListener:function(aM,aL){if(!aK[aM]){aK[aM]=[]
}aK[aM].push(aL)}};return aF})();var ad=function(aF,aG){return p(aF,aG,{internal:true})
};var ag=function(aG){var aF=this;this.getResources=function(aU,aP){var aK=function(a2,a1){a1.loaded=true;
a1.resURL="";a1.resText="";if(a2.readyState==4&&(a2.status==200||a2.status==0)){var aW=null;
var a4=a2.responseHeaders?a2.responseHeaders.split("\n"):null;
for(var aX in a4){var aY=a4[aX].split(":");var aZ=aY.shift()||"";
var a3=aY.join(":")||"";if(V){console.log("ri: Header: "+a4[aX])
}if(aZ.trim().toLowerCase()=="content-type"&&a3.search("image")!=-1){aW=a3.trim();
break}}try{a1.resText=F.UTF8.decode(a2.response)}catch(a0){a1.resText=""
}if(!aW){if(a1.url.search(".ico$")!=-1||a1.url.search(".jpg$")!=-1){aW="image/x-icon"
}else{if(a1.url.search(".gif$")!=-1){aW="image/gif"
}else{if(a1.url.search(".png$")!=-1){aW="image/png"
}else{if(U.isLocalImage(a1.url)){aW="image/x-icon"}}}}}if(a2.status!=0){K.items.resources.set(a1.url,{content:a2.response,headers:a2.responseHeaders})
}try{if(!aW){a1.resURL=F.Base64.encode(a2.response)
}else{a1.resURL="data:"+aW+";base64,"+F.Base64.encode(a2.response)
}}catch(a0){a1.resURL=a1.url}if(V){console.log("ri: resURL: "+a1.resURL)
}}else{if(D||V){console.debug("ri: Failed to load: '"+a1.url+"' "+a2.status+" "+a2.statusText)
}}};var aI,aS;for(var aR in aU.resources){aI=aU.resources[aR];
aS=false;if(!aI.loaded){var aM=B.parse(aI.url);if(aM.protocol=="tampermonkey:"){if(aM.pathname.search("\\.\\.")==-1){aI.url=chrome.extension.getURL(aI.url.replace(/^tampermonkey:\/\//,""))
}else{aS=true}}else{if(aM.protocol=="chrome-extension:"){if(aU.fileURL){var aN=B.parse(aU.fileURL);
var aO=aN.pathname.split("/");aO.pop();var aJ=aO.join("/")+aM.pathname;
aI.url=aN.protocol+"//"+aN.hostname+(aN.port?":"+aN.port:"")+aJ+aM.search
}else{aS=true}}}var aQ=null;if(aS){aQ={readyState:4,status:404,response:"",responseHeaders:""}
}else{var aV=K.items.resources.get(aI.url);if(aV){aQ={readyState:4,status:200,response:aV.content,responseHeaders:aV.headers}
}}if(aQ){aK(aQ,aI);if(!aG){aF.getResources(aU,aP)}}else{if(V){console.log("resources "+aI.url)
}var aL=function(aW){aK(aW,aI);if(!aG){aF.getResources(aU,aP)
}};if(aG){if(D){console.warn("ri: uncached @require detected -> fast script start disabled")
}aG=false}if(aM.protocol=="file:"){var aT=function(aW){aL({readyState:4,status:aW?0:404,response:aW})
};if(aG){aT(b.getSource(aI.url))}else{b.getSource({url:aI.url,cb:aT})
}}else{var aT=function(aW){aW.response=F.arrbuf2str(aW.response)||"";
aL(aW)};var aH={method:"GET",url:aI.url,retries:al.XMLHTTPREQUEST.RETRIES,responseType:"arraybuffer"};
if(V){console.log("resources request "+aI.url)}if(aG){aT(ad(aH,{}))
}else{aH.timeout=ao.values.require_timeout;ad(aH,{onload:aT,onerror:aT,ontimeout:function(){aT({readyState:4,status:504,response:null})
}})}}}if(!aG){return}}}if(aG){return true}else{aP(true)
}};this.isBlacklisted=function(aI){var aJ=false;var aH=function(aL){var aK=false;
if(!aL.length){return}if(aL.substr(0,1)=="/"){aK=t.matchUrl(aI,aL)
}else{aK=(aI.search(aL)!=-1)}if(D&&aK){console.log('bg: require blacklist entry "'+aL+'" matched')
}aJ|=aK};U.forEach(ao.values.require_blacklist,aH);
return aJ};this.getRequires=function(aT,aO){var aU=function(aX,aW){aW.loaded=true;
aW.textContent="";if(aX.readyState==4&&(aX.status==200||aX.status==0)){aW.textContent=aX.responseText;
if(aX.status!=0){K.items.requires.set(aW.url,{content:aX.responseText,headers:aX.responseHeaders})
}}};var aI,aR;for(var aQ in aT.requires){var aI=aT.requires[aQ];
aR=false;if(!aI.loaded&&aI.url){var aL=B.parse(aI.url);
if(aL.protocol=="tampermonkey:"){if(aL.pathname.search("\\.\\.")==-1){aI.url=chrome.extension.getURL(aI.url.replace(/^tampermonkey:\/\//,""))
}else{aR=true}}else{if(aL.protocol=="chrome-extension:"){if(aT.fileURL){var aM=B.parse(aT.fileURL);
var aN=aM.pathname.split("/");aN.pop();var aJ=aN.join("/")+aL.pathname;
aI.url=aM.protocol+"//"+aM.hostname+(aM.port?":"+aM.port:"")+aJ+aL.search
}else{aR=true}}}var aP=null;if(aR){aP={readyState:4,status:404,responseText:""}
}else{var aV=null;if(aF.isBlacklisted(aI.url)){aV={content:'// this @require ("'+encodeURIComponent(aI.url)+'") is blacklisted!\n'}
}else{aV=K.items.requires.get(aI.url)}if(aV){aP={readyState:4,status:200,responseText:aV.content}
}}if(aP){aU(aP,aI);if(!aG){aF.getRequires(aT,aO)}}else{if(V){console.log("requires "+aI.url)
}var aK=function(aW){aU(aW,aI);if(!aG){aF.getRequires(aT,aO)
}};if(aL.protocol=="file:"){var aS=function(aW){aK({readyState:4,status:aW?0:404,responseText:aW})
};if(aG){aS(b.getSource({url:aI.url,encoding:"UTF-8"}))
}else{b.getSource({url:aI.url,encoding:"UTF-8",cb:aS})
}}else{var aS=function(aW){aK(aW)};var aH={method:"GET",retries:al.XMLHTTPREQUEST.RETRIES,url:aI.url};
if(V){console.log("requires request "+aI.url)}if(aG){aS(ad(aH,{}))
}else{aH.timeout=ao.values.require_timeout;ad(aH,{onload:aS,onerror:aS,ontimeout:function(){aS({readyState:4,status:504,response:null})
}})}}}if(!aG){return}}}if(aG){return true}else{aO(true)
}};this.contentLoad=function(aN,aJ,aI){var aK=function(){aJ.requires.forEach(function(aO){delete aO.textContent;
delete aO.loaded});aJ.resources.forEach(function(aO){delete aO.resURL;
delete aO.resText;delete aO.loaded});if(aI){aI()}};
var aM=function(aO){if(!aO){return}console.log("run script "+aJ.name+" @ "+aN.url);
return aF.injectScript(aJ,aK)};var aH=function(aO){if(!aO){return
}aF.info=aN;return aM(aF.getRequires(aJ,aM))};var aL=aH(aF.getResources(aJ,aH));
return aG?aL:undefined};this.getUrlContents=function(aH){var aI="";
var aJ=new XMLHttpRequest();aJ.open("GET","/"+aH,false);
aJ.send(null);aI=aJ.responseText;return aI};this.injectScript=function(aM,aI){var aP=[];
var aO=false;aM.requires.forEach(function(aS){var aR=aS.textContent;
aR=af.mkCompat(aR,aM.options.compatopts_for_requires?aM:null,aO);
aP.push(aR)});var aN="\n"+aP.join("\n")+"\n";var aK=s.getStorageByName(aM.name);
var aL=af.mkCompat(aM.textContent,aM,aO);var aQ={};
if(ao.values.debug){aL="debugger;\n"+aL}for(var aJ in aM){if(aJ=="includes"||aJ=="matches"||aJ=="requires"||aJ=="excludes"||aJ=="textContent"){continue
}aQ[aJ]=aM[aJ]}var aH={method:"executeScript",header:aM.header,code:aL,requires:aN,version:chrome.extension.getVersion(),storage:aK,script:aQ,id:aF.info.contextId};
if(aG){aI();return aH}else{window.setTimeout(function(){chrome.tabs.sendMessage(aF.info.tabId,aH,aI)
},1)}}};var q=function(aF){s.setByName(aF,null);s.setStorageByName(aF,null)
};var Q=function(aF){if(aF){aF+=(aF.search("\\?")==-1?"?":"&")+"ts="+(new Date()).getTime()
}return aF};var ax=function(){if(D){console.debug("bg: notifyOptionsTab() -> may fail...")
}t.reorderScripts();var aF=function(aG){chrome.extension.sendMessage({method:"updateOptions",items:aG,options:ao.values},function(aH){})
};d(aF)};var h=function(aJ,aF){var aG=function(aL){if(!aJ){return false
}for(var aK=0;aK<aJ.length;aK++){if(aJ[aK]==aL){return true
}}return false};var aI=function(aK){return !aG(aK)&&!aj.get.empty(aK)&&aj.get.stats(aK).running
};var aH=function(aM){if(D){console.log("getValidTabId: getActive",aM)
}var aL=0;var aT=aM&&aM.id;var aK=aT&&!aj.get.empty(aM.id);
var aP=aM?aM.index:undefined;if(!aT||!aK){var aO=0;
var aQ=0;var aN=function(aU,aV){if(aQ==0||aU.ts<aQ){if(aI(aV)){aQ=aU.ts;
aO=aV}}};U.forEach(aj.get.tabs(),aN);aL=Number(aO)}else{if(aI(aM.id)){aL=aM.id
}}if(D){console.log("getValidTabId: id ",aL,"index ",aP)
}if(aL==0){var aS=3;var aR=function(){var aU=function(aV){if(!aV){if(aS-->0){console.warn("chrome.tabs.create failed -> retry!");
window.setTimeout(aR,500)}else{console.error("chrome.tabs.create failed -> giving up now!")
}return}aL=aV.id;var aX=function(){chrome.tabs.remove(aL)
};var aW=function(){aF(aL,aX)};window.setTimeout(aW,100)
};chrome.tabs.create({url:chrome.extension.getURL("ask.html")+"?i18n="+ao.values.i18n,index:aP},aU)
};aR()}else{aF(aL,null)}};chrome.tabs.getSelected(null,aH)
};var I=(function(){return{getConfig:function(){var aH={db_version:0,last:0,entries:0};
var aG={scripts:0,fire:aH};var aF=j.getValue(al.CONSTANTS.STORAGE.UPDATE,aG);
if(!aF){aF=aG}if(aF.fire==undefined){aF.fire=aH}if(aF.scripts==undefined){aF.scripts=0
}return aF},setConfig:function(aF){if(aF){j.setValue(al.CONSTANTS.STORAGE.UPDATE,aF)
}}}})();var Y={check:function(aH,aI,aK,aJ){if(!aH&&ao.values.scriptUpdateCheckPeriod==0){return
}var aF=function(aM){if(aI){var aN=az.getMessage("Script_Update");
var aO=az.getMessage("Check_for_userscripts_updates")+"...";
ar.show(aN,aO,chrome.extension.getURL("images/icon128.png"),10000)
}console.log("bg: check for script updates "+(aK?" for "+aK:""));
var aL=function(aQ,aT){if(aQ){try{var aR=function(aV){if(aV.clicked){var aW=function(aZ,aY){var aX={tabid:aZ,url:aT.url,src:aT.code,ask:true,cb:aY,hash:aT.newhash!==undefined?aT.newhash:null};
t.saveScriptEx(aX)};h(null,aW)}};var aU=az.getMessage("There_is_an_update_for_0name0_avaiable_",aT.name)+"\n"+az.getMessage("Click_here_to_install_it_");
var aP=az.getMessage("Just_another_service_provided_by_your_friendly_script_updater_");
if(ao.values.notification_silentScriptUpdate){aR({clicked:true})
}else{ar.show(aP,aU,chrome.extension.getURL("images/icon128.png"),ao.values.scriptUpdateHideNotificationAfter,aR)
}}catch(aS){console.error("bg: notification error "+aS.message)
}}if(aJ){aJ(aQ)}};Y.updateUserscripts(0,aI,aK,aL)};
var aG=function(){var aM=I.getConfig();if(aH||((new Date()).getTime()-aM.scripts)>ao.values.scriptUpdateCheckPeriod){var aL=function(){aF();
aM.scripts=(new Date()).getTime();I.setConfig(aM)};
if(ac.enabled){ac.addSyncDoneListener(aL);ac.scheduleSync(50,false)
}else{aL()}}else{if(aJ){console.log("bg: WARN ScriptUpdater.check -> no force but callback");
window.setTimeout(aJ,1)}}};aG();window.setTimeout(Y.check,5*60*1000)
},srcCmp:function(aH){var aF=x.createScriptFromSrc(aH);
if(!aF.name||aF.name==""||(aF.version===undefined)){return g
}var aG=s.getMetaByName(aF.name);if(aG&&aG.system){return null
}if(aF.options.compat_uW_gmonkey){return g}if(aF.name.search("@")!=-1){return g
}else{if(aG&&aF.version==aG.version){return z}else{if(aG&&M(aF.version,aG.version)==i){return i
}else{if(aG){return X}else{return X}}}}return X},updateUserscripts:function(aF,aG,aO,aN){var aJ=1;
var aP=0;var aH=function(){if(aJ==0&&aP==0){if(aG){if(D||V||UV){console.debug("No update found")
}ar.show("Narf!",az.getMessage("No_update_found__sry_"),chrome.extension.getURL("images/icon128.png"),10000)
}if(aN){window.setTimeout(aN,1)}}};var aM=function(aR){var aQ={method:"GET",retries:al.XMLHTTPREQUEST.RETRIES,url:t.determineSourceURL(aR.script,true),};
aJ++;(function(){var aU={tabid:aF,r:aR};var aT=t.determineSourceURL(aU.r.script);
var aS=function(aX){aJ--;if(aX.readyState==4&&aX.status==200){if(V){console.log(aT)
}var aW=function(){if(aU.r.meta){if(V||UV){console.log("bg: update hash of script "+aR.script.name+" to "+aU.r.meta[o])
}aU.r.script.hash=aU.r.meta[o];s.setByName(aU.r.script.name,aU.r.script,false)
}};var aV=Y.srcCmp(aX.responseText);if(aV==X||aR.hash_different){aP++;
if(aN){aN(true,{name:aU.r.script.name,url:aT,code:aX.responseText,newhash:aU.r.meta?aU.r.meta[o]:null})
}return}else{if(aV==z){if(V||UV){console.log("bg: found same version @ "+aT)
}aW()}}}else{console.log(az.getMessage("UpdateCheck_of_0name0_Url_0url0_failed_",[aU.r.script.name,aT]))
}aH()};p(aQ,{onload:aS})})()};var aK=function(aT,aU){var aS=t.determineMetaURL(aT,true);
if(aS){var aR={method:"GET",retries:0,url:aS,};var aQ=function(aV){aT.meta=null;
if(aV.readyState==4&&aV.status==200){var aW=x.processMetaHeader(aV.responseText);
aT.meta=aW;aT.metasrc=aV.responseText}else{console.log("bg: unable to find meta data @ "+aS+" req.status = "+aV.status)
}aU(aT)};p(aR,{onload:aQ});return}aT.meta=null;aU(aT)
};var aL=function(aR){aJ++;var aQ=function(aV){var aW=!!aV.meta;
var aS=aW&&!!aV.meta.version;var aU=aS&&(!aR.script.version||M(aV.meta.version,aR.script.version)==X);
var aT=aW&&(aR.script.hash||!aS)&&!!aV.meta[o]&&aV.meta[o]!=aR.script.hash;
if(!aW||aT||!aS||aU){if(V||UV){console.log("bg: hash of script "+aR.script.name+" has changed or does not exist! running version check!")
}aR.meta=aV.meta;aR.metasrc=aV.metasrc;aR.hash_different=aT;
aM(aR)}else{if(V||UV){console.log("bg: hash of script "+aR.script.name+" has NOT changed.")
}}aJ--;aH()};aK(aR.script,aQ)};var aI=false;s.getUidList().forEach(function(aR){var aS=s.getByUid(aR);
if(aS.script&&aS.cond){var aQ=aO&&aS.script.id!=aO;
var aT=!ao.values.scriptUpdateCheckDisabled&&!aS.script.enabled&&!aO;
if(aQ||aT||!(t.determineMetaURL(aS.script)||t.determineSourceURL(aS.script))){return
}aI=true;aL(aS)}else{console.warn("inconsistent script entry",aR)
}});if(!aI&&aO&&aN){window.setTimeout(aN,1)}aJ--}};
trup=Y;var t=(function(){var aG=function(aH){var aI=function(aK,aJ){return aK.position-aJ.position
};aH.sort(aI);return aH};var aF={determineSourceURL:function(aJ,aI){if(!aJ){return null
}var aH=null;if(aJ.fileURL&&aJ.fileURL.search("^file://"==-1)){aH=aJ.fileURL
}if(aJ.downloadURL&&aJ.downloadURL.search("^file://"==-1)){aH=aJ.downloadURL
}if(aH&&aI){aH=Q(aH)}return aH},determineMetaURL:function(aL,aK){if(!aL){return null
}var aJ=null,aH=null;if(aL.fileURL&&aL.fileURL.search("^file://"==-1)){aJ=aL.fileURL
}if(aL.downloadURL&&aL.downloadURL.search("^file://"==-1)){aJ=aL.downloadURL
}if(aL.updateURL&&aL.updateURL.search("^file://"==-1)){aH=aL.updateURL
}if(aH){return aK?Q(aH):aH}if(aJ){var aI=null;aI=aJ.replace(".user.js",".meta.js");
if(aI==aJ){aI=aJ.replace(".tamper.js",".meta.js")}if(aI==aJ){aI=null
}return aK?Q(aI):aI}return null},mergeCludes:function(aI){var aK,aJ=aI.options.override;
aI.includes=aJ.merge_includes&&aJ.orig_includes?aJ.orig_includes.slice():[];
aI.excludes=aJ.merge_excludes&&aJ.orig_excludes?aJ.orig_excludes.slice():[];
aI.matches=aJ.merge_matches&&aJ.orig_matches?aJ.orig_matches.slice():[];
for(aK=0;aK<aJ.use_includes.length;aK++){var aH=aI.excludes.indexOf(aJ.use_includes[aK]);
if(aH>=0){aI.excludes.splice(aH,1)}aI.includes.push(aJ.use_includes[aK])
}if(typeof aJ.use_matches!=="undefined"){for(aK=0;aK<aJ.use_matches.length;
aK++){aH=aI.excludes.indexOf(aJ.use_matches[aK]);if(aH>=0){aI.excludes.splice(aH,1)
}aI.matches.push(aJ.use_matches[aK])}}for(aK=0;aK<aJ.use_excludes.length;
aK++){aI.excludes.push(aJ.use_excludes[aK])}return aI
},saveScriptEx:function(aU){var a8=false;var a7=false;
var aK=false;var a4=false;var a6={};if(aU.name===undefined){aU.name=null
}if(aU.clean===undefined){aU.clean=false}if(aU.defaultscript===undefined){aU.defaultscript=false
}if(aU.ask===undefined){aU.ask=true}if(aU.url===undefined||aU.url==null){aU.url=""
}if(aU.save===undefined){aU.save=false}if(aU.hash===undefined){aU.hash=""
}if(aU.force_url===""){aU.force_url=null}if(aU.ask&&!aU.tabid){console.warn("anus: no tabId was given!")
}var a9=x.createScriptFromSrc(aU.src);if(!a9.name||a9.name==""||(a9.version==undefined)){var aW=az.getMessage("Invalid_UserScript__Sry_")+"\n\n";
if(aU.name){aW+=az.getMessage("Script_name_0url0",aU.name)+"\n\n"
}if(aU.url){aW+=az.getMessage("Downloaded_from_0url0",aU.url)
}if(aU.tabid){chrome.tabs.sendMessage(aU.tabid,{method:"showMsg",msg:aW,frameId:0},function(ba){})
}else{console.warn("anus: "+aW)}return false}var aO=s.getMetaByName(a9.name);
var aM="";if(!aU.clean&&aO&&aO.system&&!aU.defaultscript){return false
}if(aU.name&&aU.name!=a9.name){if(aU.clean){console.warn("anus: names do not match!");
return false}else{a6.renamed=true}}var aX=null;if(aO&&a6.renamed){aX=az.getMessage("A_script_with_that_name_already_exists_")
}else{if(a9.options.compat_uW_gmonkey){aX=az.getMessage("This_script_uses_uW_gm_api_")
}}if(aX){if(aU.tabid){chrome.tabs.sendMessage(aU.tabid,{method:"showMsg",msg:aX,frameId:0},function(ba){})
}else{console.warn("anus: "+aW)}return false}if(aO){if(aO.lastModified&&aU.lastModified!==undefined&&aO.lastModified!==aU.lastModified){var aR=az.getMessage("some_secs");
try{var aQ=Math.max(1,Math.floor(((new Date()).getTime()-aO.lastModified)/1000));
if(!isNaN(aQ)){aR=aQ}}catch(a5){}aM+=az.getMessage("CONFLICT__This_script_was_modified_0t0_seconds_ago_",aR)+"     \n\n";
aK=true}a4=(aU.hash&&aO.hash!=aU.hash);a9.fileURL=aO.fileURL
}a9.hash=aU.hash?aU.hash:(aO?aO.hash:null);a9.lastUpdated=(new Date()).getTime();
a9.system=aU.defaultscript;if(aU.url){a9.fileURL=aU.url
}if(!aU.clean&&aU.force_url){a9.updateURL=null;a9.downloadURL=aU.force_url
}a9.position=aO?aO.position:t.determineLastPosition()+1;
if(a9.name.search("\n")!=-1){var aW=az.getMessage("Invalid_UserScript_name__Sry_");
if(aU.tabid){chrome.tabs.sendMessage(aU.tabid,{method:"showMsg",msg:aW,frameId:0},function(ba){})
}else{console.warn("anus: "+aW)}return false}else{if(!aU.clean&&aO&&a9.version==aO.version&&!a4){if(aU.defaultscript||aU.noreinstall){return null
}if(aU.save){aM+=az.getMessage("You_are_about_to_modify_a_UserScript_")+"     \n"
}else{aM+=az.getMessage("You_are_about_to_reinstall_a_UserScript_")+"     \n";
a8=true;aM+="\n"+az.getMessage("All_script_settings_will_be_reset_")+"!!\n"
}aM+="\n"+az.getMessage("Name_")+"\n";aM+="    "+a9.name+((a9.version!="")?" v"+a9.version:"")+"\n";
aM+="\n"+az.getMessage("Installed_Version_")+"\n";aM+="    v"+a9.version+"\n"
}else{if(!aU.clean&&aO&&M(a9.version,aO.version)==i){aM+=az.getMessage("You_are_about_to_downgrade_a_UserScript")+"     \n";
aM+="\n"+az.getMessage("Name_")+"\n";aM+="    "+a9.name+((a9.version!="")?" v"+a9.version:"")+"\n";
aM+="\n"+az.getMessage("Installed_Version_")+"\n";aM+="    v"+aO.version+"\n"
}else{if(!aU.clean&&aO){aM+=az.getMessage("You_are_about_to_update_a_UserScript_")+"     \n";
aM+="\n"+az.getMessage("Name_")+"\n";aM+="    "+a9.name+((a9.version!="")?" v"+a9.version:"")+"\n";
aM+="\n"+az.getMessage("Installed_Version_")+"\n";aM+="    v"+aO.version+"\n";
a7=true}else{aM+=az.getMessage("You_are_about_to_install_a_UserScript_")+"     \n";
aM+="\n"+az.getMessage("Name_")+"\n";aM+="    "+a9.name+((a9.version!="")?" v"+a9.version:"")+"\n"
}}}}if(!aU.clean&&aO){a9.options.override=aO.options.override;
a9.options.comment=aO.options.comment}a9.options.override.orig_includes=a9.includes;
a9.options.override.orig_excludes=a9.excludes;a9.options.override.orig_matches=a9.matches;
a9=t.mergeCludes(a9);a9.options.override.orig_noframes=a9.options.noframes;
if(aO){if(aO.sync){a9.sync=aO.sync}}if(!a8&&!aU.clean&&aO){a9.enabled=aO.enabled;
a9.options.noframes=aO.options.noframes;if(!a9.options.awareOfChrome){a9.options.compat_forvarin=aO.options.compat_forvarin;
if(a9.options.run_at==""){a9.options.run_at=aO.options.run_at
}}var aZ=aF.determineMetaURL(aO);var aJ=aF.determineMetaURL(a9);
if(aZ!=aJ){aM+="\n"+az.getMessage("The_update_url_has_changed_from_0oldurl0_to__0newurl0",[aZ,aJ]);
a7=false}}if(!aU.clean&&aU.sync){a9.sync=aU.sync}if(!a9.includes.length&&!a9.matches.length){var aH="/"+B.staticVars.urlAllHttp_+"/";
aM+="\n"+az.getMessage("Note_")+"\n";aM+="    "+az.getMessage("This_script_does_not_provide_any__include_information_")+"\n";
aM+="    "+az.getMessage("Tampermonkey_assumes_0urlAllHttp0_in_order_to_continue_",aH)+"    \n";
a9.includes.push(aH)}if(a9.options.run_at==""){a9.options.run_at="document-end"
}if(aU.force_options){for(var a2 in a9.options){if(aU.force_options[a2]!==undefined){a9.options[a2]=aU.force_options[a2]
}}}var aS=[],aP="",aV=2,aY=8,aI=12;var a3=(a9.excludes.length>aY?aY:a9.excludes.length)+(a9.includes.length>aY?aY:a9.includes.length)+(a9.matches.length>aY?aY:a9.matches.length);
if(a3<aI){aV=1}var aL="\n"+az.getMessage("Include_s__");
if(a9.options.override.includes||a9.options.override.matches){aL+=" ("+az.getMessage("overwritten_by_user")+")"
}aL+="\n";var a1=function(bb,be){if(!bb||!bb.length){return
}var bd=[],bc="";if(bb.length>aY){bb=bb.slice(0,aY);
bc="\n"+be}for(var ba=0;(ba*aV)<bb.length;ba++){bd.push(bb.slice(ba*aV,((ba+1)*aV)).join("; "))
}return"    "+bd.join("\n    ")+bc};aL+=a9.includes.length?a1(a9.includes,az.getMessage("Attention_Can_not_display_all_includes_"))+"\n":"";
aL+=a9.matches.length?a1(a9.matches,az.getMessage("Attention_Can_not_display_all_includes_"))+"\n":"";
var aN;if(a9.excludes.length){aN="";aN+="\n"+az.getMessage("Exclude_s__");
if(a9.options.override.excludes){aN+=" ("+az.getMessage("overwritten_by_user")+")"
}aN+="\n";aN+=a1(a9.excludes,az.getMessage("Attention_Can_not_display_all_excludes_"))+"\n"
}aM+=aL?aL:"";aM+=aN?aN:"";var a0=false;for(var a2 in a9.options){if(a2.search("compat_")!=-1&&a9.options[a2]===true){a0=true;
break}}if(a0){aM+="\n"+az.getMessage("Note__A_recheck_of_the_GreaseMonkey_FF_compatibility_options_may_be_required_in_order_to_run_this_script_")+"\n"
}if(aU.clean){aM+="\n"+az.getMessage("Do_you_really_want_to_factory_reset_this_script_")+"    "
}else{aM+="\n"+az.getMessage("Do_you_want_to_continue_")
}var aT=function(){var ba=s.setByName(a9.name,a9)||{};
if(!aO||aU.clean){s.setStorageByName(a9.name,{ts:(new Date()).getTime()})
}if(!aU.cb){ax()}if(false){var bb=function(bc){if(!bc){return
}console.log("anus: disable extension "+bc.name);aB.setEnabled(bc,false)
};aB.getUserscriptByName(a9.name,bb)}a6.installed=true;
a6.lastModified=ba.lastModified};if(!aK&&(!aU.ask||(a7&&ao.values.notification_silentScriptUpdate))){aT();
if(aU.cb){aU.cb(a6)}}else{chrome.tabs.sendMessage(aU.tabid,{method:"confirm",msg:aM,frameId:0},function(ba){var bb=ba&&ba.confirm;
if(bb){aT()}if(aU.cb){aU.cb(a6)}})}return true},installFromUrl:function(aI,aK,aH){var aJ={method:"GET",retries:al.XMLHTTPREQUEST.RETRIES,url:aI,};
var aL=function(aN){if(aN.readyState==4){if(aN.status==200){var aP=function(aQ){if(aH){aH(true,aQ.installed)
}};var aO={url:aI,src:aN.responseText,ask:true,cb:aP};
if(aK){for(var aM in aK){if(!aK.hasOwnProperty(aM)){continue
}aO[aM]=aK[aM]}}if(!aF.saveScriptEx(aO)){if(aH){aH(false,false)
}}}else{if(V){console.log("scriptClick: "+aI+" req.status = "+aN.status)
}if(aH){aH(false,false)}}}};p(aJ,{onload:aL})},determineLastPosition:function(){var aI=0;
s.getUidList().forEach(function(aJ){var aK=s.getByUid(aJ);
if(aK.script&&aK.cond){if(aK.script.position&&aK.script.position>aI){aI=aK.script.position
}}else{console.warn("inconsistent script entry",aJ)
}});var aH=new x.Script();if(aH.position>aI){aI=aH.position
}return aI},matchUrl:function(aH,aL,aI){var aJ=function(aO){return aO.replace(/\/$/,"")
};var aM,aK;try{if(!aI&&aL.length>1&&aL.substr(0,1)=="/"){aM=new RegExp(".*"+aL.replace(/^\//g,"").replace(/\/$/g,"")+".*","i")
}else{if(aI){aK=B.getRegExpFromMatch(aL);aM=new RegExp(aK)
}else{aK=B.getRegExpFromInclude(aL,{tryToFixUrl:ao.values.tryToFixUrl,safeUrls:ao.values.safeUrls});
aM=new RegExp(aK,"i")}}}catch(aN){console.warn("bg: invalid regexp ",aL);
return false}return aH.replace(aM,"")===""},validUrl:function(aH,aJ,aL){var aI,aK=false;
if(aJ.inc||aJ.match){for(aI in aJ.inc){if(typeof aJ.inc[aI]!=="string"){console.warn("bg: WARN: include["+aI+"] '"+aJ.inc[aI]+"' "+(aL?"@"+aL+" ":"")+"can't be compared to '"+aH+"'")
}else{if(aF.matchUrl(aH,aJ.inc[aI])){if(D){console.log("bg: @include '"+aJ.inc[aI]+"' matched"+(aL?" ("+aL+")":""))
}aK=true;break}}}if(aJ.match){for(aI in aJ.match){if(typeof aJ.match[aI]!=="string"){console.warn("bg: WARN: match["+aI+"] '"+aJ.match[aI]+"' "+(aL?"@"+aL+" ":"")+"can't be compared to '"+aH+"'")
}else{if(aF.matchUrl(aH,aJ.match[aI],true)){if(D){console.log("bg: @match '"+aJ.match[aI]+"' matched"+(aL?" ("+aL+")":""))
}aK=true;break}}}}if(!aK){return aK}}else{aK=true}for(aI in aJ.exc){if(aF.matchUrl(aH,aJ.exc[aI])){if(D){console.log("bg: @exclude '"+aJ.exc[aI]+"' matched"+(aL?" ("+aL+")":""))
}aK=false;break}}return aK},reorderScripts:function(aI,aN){var aH=aF.determineScriptsToRun();
for(var aJ=0;aJ<aH.length;aJ++){var aK=aH[aJ];if(aK.name==aI){var aL=(aK.position<aN)?0.5:-0.5;
aK.position=(Number(aN)+aL)}}aH=aG(aH);var aM=1;for(var aJ=0;
aJ<aH.length;aJ++){var aK=aH[aJ];aK.position=aM++;s.setByName(aK.name,aK,false)
}},determineScriptsToRun:function(aH){var aI=[];if(D||V){console.log("determineScriptsToRun @"+aH)
}s.getUidList().forEach(function(aJ){if(aH){var aK=j.getValue(al.CONSTANTS.PREFIX.COND+aJ,null);
if(!aK){return}if(!aF.validUrl(aH,aK,aJ)){return}}var aL=s.getByUid(aJ);
if(aL.script&&aL.cond){if(V){console.log("bg: determineScriptsToRun: found script "+aL)
}aI.push(aL.script)}else{console.warn("inconsistent script entry",aJ)
}});return aG(aI)}};return aF})();var s=(function(){var aF={getUidList:function(){var aH=new RegExp("^"+al.CONSTANTS.PREFIX.SCRIPT_UID);
var aG=[];var aI=j.listValues().forEach(function(aJ){if(aJ.search(aH)==-1){return
}aG.push(aJ.replace(aH,""))});return aG},getUidByName:function(aH){var aJ=new RegExp("^"+al.CONSTANTS.PREFIX.SCRIPT_UID);
var aL=null;var aK=j.listValues();for(var aI=0,aG;aG=aK[aI];
aI++){if(aG.search(aJ)==-1){continue}if(j.getValue(aG)===aH){aL=aG.replace(aJ,"");
break}}return aL},getStorageByName:function(aG){var aH=aF.getUidByName(aG);
return aF.getStorageByUid(aH)},getStorageByUid:function(aH){var aG=j.getValue(al.CONSTANTS.PREFIX.STORE+aH,{ts:0,data:{}});
if(typeof aG.ts==="undefined"){aG.ts=0}if(typeof aG.data==="undefined"){aG.data={}
}return aG},setStorageByName:function(aG,aI){var aH=aF.getUidByName(aG);
return aF.setStorageByUid(aH,aI)},setStorageByUid:function(aG,aH){if(aH){j.setValue(al.CONSTANTS.PREFIX.STORE+aG,aH)
}else{j.deleteValue(al.CONSTANTS.PREFIX.STORE+aG)}},getMetaByName:function(aG){var aH=aF.getUidByName(aG);
return aF.getMetaByUid(aH)},getMetaByUid:function(aG){return j.getValue(al.CONSTANTS.PREFIX.META+aG,null)
},getByName:function(aG){var aH=aF.getUidByName(aG);
return aF.getByUid(aH)},getByUid:function(aI){var aH,aG=j.getValue(al.CONSTANTS.PREFIX.META+aI,null);
if(aG){var aJ=function(aK){if(!aK){return}for(var aL=0,aM=null;
aM=aK[aL];aL++){delete aM.loaded;delete aM.textContent;
delete aM.resURL;delete aM.resText}};aJ(aG.requires);
aJ(aG.resources);aG.uuid=aI;aG.textContent=j.getValue(al.CONSTANTS.PREFIX.SCRIPT+aI,aG.textContent);
if(aG.textContent){aH=aG}}return{script:aH,cond:j.getValue(al.CONSTANTS.PREFIX.COND+aI,null)}
},setByName:function(aH,aG,aI){var aJ=aF.getUidByName(aH)||aG.uuid||U.createUUID();
return aF.setByUid(aJ,aG,aI)},setByUid:function(aH,aO,aJ){if(aJ===undefined){aJ=true
}var aM={};if(aO){var aK=j.getValue(al.CONSTANTS.PREFIX.META+aH);
var aN=!aK;j.setValue(al.CONSTANTS.PREFIX.SCRIPT_UID+aH,aO.name);
j.setValue(al.CONSTANTS.PREFIX.COND+aH,{inc:aO.includes,match:aO.matches,exc:aO.excludes});
j.setValue(al.CONSTANTS.PREFIX.SCRIPT+aH,aO.textContent);
var aQ=aO;aQ.textContent=null;if(aJ){aM.lastModified=(new Date()).getTime();
aQ.lastModified=aM.lastModified}j.setValue(al.CONSTANTS.PREFIX.META+aH,aQ);
if(aJ){if(aN){ac.scriptAddedCb(aO.name,aO)}else{ac.scriptChangedCb(aO.name,aO,aK)
}if(!ao.values||ao.values.statistics_enabled){var aP=null;
if(aN&&aO.fileURL){var aI=B.parse(aO.fileURL);var aL=aI.hostname&&aI.hostname.length>5?aI.hostname.substr(0,1)+"***"+aI.hostname.substr(aI.hostname.length-3,3):"*";
aP=aI.protocol+"//"+aL+(aI.port?":"+aI.port:"")+aI.pathname+(aI.search?"?***":"")
}ak.tS(aO.name,aP,aN?true:null)}}}else{var aG=aF.getByUid(aH);
j.deleteValue(al.CONSTANTS.PREFIX.SCRIPT_UID+aH);j.deleteValue(al.CONSTANTS.PREFIX.COND+aH);
j.deleteValue(al.CONSTANTS.PREFIX.SCRIPT+aH);j.deleteValue(al.CONSTANTS.PREFIX.META+aH);
j.deleteValue(al.CONSTANTS.PREFIX.STORE+aH);if(aJ){if(aG.script&&aG.cond){ac.scriptRemovedCb(aG.script.name,aG.script)
}if(!ao.values||ao.values.statistics_enabled){ak.tS(aG.script.name,null,false)
}}}K.items.rundata.removeAll();return aM}};return aF
}());var aA=(function(){var aF=function(aJ,aL){var aP=null;
var aN=aJ.sender;if(V||EV||MV){console.log("back: connect.method "+aL.method+" contextId "+aL.id+" tabId: "+(aN.tab?aN.tab.id:"unknown!!!"))
}var aI=function(aT){try{aJ.postMessage(aT)}catch(aS){console.error("bg: Error sending port ("+aJ.name+") message: "+JSON.stringify(aT))
}};if(aL.method=="xhr"){var aM=function(){aJ.disconnect()
};var aG=function(aS){aI({error:true,data:aS})};var aO=function(aS){aI({success:true,data:aS})
};var aH=function(aS){aI({change:true,data:aS})};var aQ=function(aS){aI({progress:true,data:aS})
};var aK=function(aS){aI({timeout:true,data:aS})};p(aL.details,{onload:aO,onreadychange:aH,onprogress:aQ,onerr:aG,ontimeout:aK,ondone:aM})
}else{if(aL.method=="addStorageListener"){if(typeof aN.tab!="undefined"){if(V||SV){console.log("storage add listener "+aL.name+" "+aL.id)
}j.addClientListener({tabid:aN.tab.id,id:aL.id,name:aL.name,time:(new Date()).getTime(),response:aI});
aP=function(){j.removeClientListeners(aL.name,aL.id,false)
}}else{console.log(az.getMessage("Unable_to_load_storage_due_to_empty_tabID_"));
aI({error:true})}}else{if(aL.method=="removeStorageListener"){if(typeof aN.tab!="undefined"){if(V){console.log("storage remove listener "+aL.name+" "+aL.id)
}j.removeClientListeners(aL.name,aL.id);aI({error:false})
}else{console.warn("Unable to remove storage listener due to empty tabID!");
aI({error:true})}}else{if(aL.method=="saveStorageKey"){if(typeof aN.tab!="undefined"){if(aL.name){var aR=s.getStorageByName(aL.name);
if(V||SV){console.log("storage ("+aL.name+"): set key "+aL.key+" to '"+aL.value+"'")
}aR.data[aL.key]=aL.value;aR.ts=aL.ts;s.setStorageByName(aL.name,aR);
j.notifyClientListeners(aL.name,null,function(aS){var aT={data:{},ts:0};
var aU=s.getStorageByName(aL.name);aT.data[aL.key]=aU.data[aL.key];
aT.ts=aU.ts;var aV={storage:aT};if(aU.data[aL.key]===undefined){aV.removed=aL.key
}aS(aV)})}}else{console.log(az.getMessage("Unable_to_save_storage_due_to_empty_tabID_"))
}aI({})}}}}if(aP){aJ.onDisconnect.addListener(aP)}if(V){console.log("back: connect.method "+aL.method+" end!")
}};return function(aG){if(!aa.late){aa.registerLateCallback(function(){aA(aG)
});return}var aH=function(aI){aF(aG,aI)};aG.onMessage.addListener(aH)
}})();var aw={ping:{allow:{insecure:true},exec:function(aH,aG,aF){aF({pong:true,instanceID:C,config:{layout:ao.values.layout}})
}},openInTab:{allow:{script:true,extpage:true},exec:function(aJ,aH,aF){var aG=function(aM){aE[aM.id]=true;
aF({tabId:aM.id})};var aI=["active"];var aK={url:aJ.url};
if(aJ.options){for(var aL=0;aL<aI.length;aL++){if(aJ.options[aI[aL]]!==undefined){aK[aI[aL]]=aJ.options[aI[aL]]
}}if(aJ.options.insert){aK.index=aH.tab.index+1}}chrome.tabs.create(aK,aG)
}},closeTab:{allow:{script:true,extpage:true},exec:function(aH,aG,aF){if(aH.tabId&&aE[aH.tabId]){chrome.tabs.remove(aH.tabId)
}aF({})}},getTab:{allow:{script:true},exec:function(aH,aG,aF){if(aG.tab&&aH.uid){if(!ai[aG.tab.id]){ai[aG.tab.id]={}
}if(!ai[aG.tab.id][aH.uid]){ai[aG.tab.id][aH.uid]={}
}aF({data:ai[aG.tab.id][aH.uid]})}else{console.log("bg: unable to process request",aG,aH);
aF({data:null})}}},getTabs:{allow:{script:true},exec:function(aJ,aH,aF){if(aJ.uid){var aI={};
for(var aG in ai){aI[aG]={};aI[aG]=ai[aG][aJ.uid]}aF({data:aI})
}else{console.log("bg: unable to process request",aH,aJ);
aF({data:null})}}},setTab:{allow:{script:true},exec:function(aJ,aH,aF){if(aH.tab&&aJ.uid){if(!ai[aH.tab.id]){ai[aH.tab.id]={}
}var aI={};for(var aG in aJ.tab){aI[aG]=aJ.tab[aG]}ai[aH.tab.id][aJ.uid]=aI
}else{console.log("bg: unable to process request",aH,aJ)
}aF({})}},copyToClipboard:{allow:{script:true,extpage:true},exec:function(aH,aG,aF){if(typeof aG.tab!="undefined"){ay.copy(aH.data)
}else{console.log("bg: unable to process request",aG,aH)
}aF({})}},setOption:{allow:{extpage:true},exec:function(aJ,aH,aF){var aI=(aH.extpage=="options"||aJ.origin=="options");
ao.values[aJ.name]=aJ.value;var aG=function(aK){if(aI){aF({items:aK,options:ao.values})
}else{ax();aF({})}};d(aG)}},buttonPress:{allow:{extpage:true},exec:function(aK,aI,aG){var aH=function(){aG({})
};if(aK.name=="reset_simple"){ae.reset(aH)}else{if(aK.name=="reset_factory"){ae.factoryReset(aH)
}else{if(aK.name=="create_tesla_data"){var aF=function(aL){ay.copy({content:F.UTF8.encode(aL.join("<br>")),type:"html"});
aH()};ac.createTeslaData(aF)}else{if(aK.name=="reset_chrome_sync"){ac.reset(aH)
}else{if(aK.name=="install_tests"){var aJ=aq.framework.prepare(t.saveScriptEx,aH);
if(aJ){console.error(aJ)}}else{if(aK.name=="enabled"){ao.values[aK.name]=!ao.values[aK.name];
aG({})}else{if(aK.name=="run_script_updates"){if(aK.scriptid){var aH=function(aL){aG({scriptid:aK.scriptid,updatable:aL})
};Y.check(true,false,aK.scriptid,aH)}else{Y.check(true,true);
aG({})}}else{console.log("bg: Warning: unknown button "+aK.name);
aG({})}}}}}}}}},modifyScriptOptions:{allow:{extpage:true},exec:function(aM,aN,aH){var aP=(aN.extpage=="options"||aM.origin=="options");
var aF=(aM.reload==undefined||aM.reload==true);var aJ=function(){if(aM.reorder){t.reorderScripts()
}if(V){console.log("modifyScriptOptions "+aP)}if(aF){if(aP){var aQ=function(aS){aH({items:aS,i18n:ao.values.i18n,options:ao.values})
};d(aQ)}else{if(aM.name){window.setTimeout(ax,100)}var aR=function(aT){var aS=c(aT);
aH({items:aS,i18n:ao.values.i18n,options:{enabled:ao.values.enabled,layout:ao.values.layout}});
if(aM.name&&ao.values.autoReload){chrome.tabs.sendMessage(aT.id,{method:"reload",frameId:0},function(aU){})
}};chrome.tabs.getSelected(null,aR)}}else{aH({})}};
if(aM.name&&aM.method=="modifyScriptOptions"){var aG=s.getByName(aM.name);
if(aG.script&&aG.cond){var aI=false;var aO=new x.Script();
for(var aK in aO.options){if(!aO.options.hasOwnProperty(aK)){continue
}if(typeof aM[aK]!=="undefined"){aG.script.options[aK]=aM[aK]
}}for(var aK in aO.options.override){if(!aO.options.override.hasOwnProperty(aK)||aK.search("merge_")==-1){continue
}if(typeof aM[aK]!=="undefined"){aG.script.options.override[aK]=aM[aK];
aI=true}}if(typeof aM.enabled!=="undefined"){aG.script.enabled=aM.enabled
}if(typeof aM.includes!=="undefined"){aG.script.options.override.use_includes=aM.includes;
aG.script.options.override.use_excludes=aM.excludes;
aG.script.options.override.use_matches=aM.matches;aI=true
}if(aI){aG.script=t.mergeCludes(aG.script)}s.setByName(aG.script.name,aG.script);
if(typeof aM.position!=="undefined"&&aF){t.reorderScripts(aM.name,aM.position)
}}}else{if(aM.nid&&aM.method=="modifyNativeScript"){var aL=function(aT){if(aT){if(aM.actionid=="installed"){if(aM.value=="false"){aB.uninstall(aT,aJ);
return true}}else{if(aM.actionid=="enabled"){aB.setEnabled(aT,aM.value,aJ);
return true}else{if(aM.actionid=="imported"){if(aM.value=="true"){var aR=aB.getUserscriptSource(aT,aJ);
if(aR){var aQ=function(aU){if(aU.installed){if(ao.values.native_import_post_action=="disable"){aB.setEnabled(aT,false,aJ);
return}else{if(ao.values.native_import_post_action=="uninstall"){aB.uninstall(aT,aJ);
return}}}aJ()};var aS={tabid:aN.tab.id,src:aR,ask:true,cb:aQ};
if(t.saveScriptEx(aS)){return true}}else{chrome.tabs.sendMessage(aN.tab.id,{method:"showMsg",msg:az.getMessage("Please_double_check_the_native_script_import_settings__")},function(aU){})
}}}}}aJ()}else{aH({})}};aB.getUserscriptById(aM.nid,aL);
return true}}aJ()}},modifyNativeScript:{allow:{extpage:true},exec:function(aH,aG,aF){return aw.modifyScriptOptions.exec(aH,aG,aF)
}},saveScript:{allow:{extpage:true},exec:function(aL,aI,aG){var aK=(aL.reload==undefined||aL.reload==true);
var aF=function(aO){if(aK){var aN=function(aP){aO.items=aP;
aO.options=ao.values;aG(aO)};d(aN)}else{aG({})}};if(aL.clean){var aM=function(aO){var aN=function(aP){aG({cleaned:aO.installed,items:aP,options:ao.values});
if(aO.installed){j.notifyClientListeners(aL.name,null,function(aQ){aQ({storage:s.getStorageByName(aL.name)})
})}};d(aN)};if(D){console.debug("bg: clean userscript "+aL.name)
}var aJ=s.getByName(aL.name);if(!aJ.script||!aJ.cond){console.error(az.getMessage("fatal_error")+" ("+aL.name+")!!!");
aM({installed:false})}else{if(!t.saveScriptEx({name:aL.name,tabid:aI.tab.id,force_url:null,url:aL.file_url,src:aJ.script.textContent,clean:true,ask:true,save:true,cb:aM})){if(aM){aM({installed:false})
}}}}else{if(aL.code){var aM=aG;if(aL.reload===undefined||aL.reload===true){aM=function(aN){t.reorderScripts();
aF(aN)}}var aH={name:aL.name,tabid:aI.tab.id,force_url:aL.force_url,url:aL.file_url,src:aL.code,lastModified:aL.lastModified,ask:!ao.values.editor_easySave&&!aL.force,save:true,cb:aM};
if(!t.saveScriptEx(aH)){aM({installed:false})}}else{q(aL.name);
t.reorderScripts();aF({})}}}},installScript:{allow:{insecure:true},exec:function(aJ,aI,aG){if(typeof aI.tab!="undefined"){if(aI.extpage&&aJ.code){var aH={name:aJ.name,tabid:aI.tab.id,url:aJ.file_url,src:aJ.code,ask:true,cb:aG};
if(!t.saveScriptEx(aH)){aG({installed:false})}}else{var aF=function(aL,aK){aG({data:null,found:aL,installed:aK});
if(aL){if(aK){ax()}}else{chrome.tabs.sendMessage(aI.tab.id,{method:"showMsg",msg:az.getMessage("Unable_to_get_UserScript__Sry_"),id:aJ.id},function(aM){})
}};t.installFromUrl(aJ.url,{tabid:aI.tab.id},aF)}}else{console.log(az.getMessage("Unable_to_install_script_due_to_empty_tabID_"))
}}},registerMenuCmd:{allow:{script:true},exec:function(aH,aG,aF){if(typeof aG.tab!="undefined"){if(V||MV){console.log("MC add "+aH.id)
}n.add({tabId:aG.tab.id,url:aG.tab.url,name:aH.name,accessKey:aH.accessKey,id:aH.menuId,response:aF})
}else{console.log("Unable to register menu cmd due to empty tabID!");
aF({run:false})}}},unRegisterMenuCmd:{allow:{script:true},exec:function(aH,aG,aF){if(V||MV){console.log("MC unreg "+aH.id)
}n.clearById(aH.id);aF({})}},execMenuCmd:{allow:{extpage:true},exec:function(aH,aG,aF){var aI=n.getById(aH.id);
if(aI){if(V||MV){console.log("MC exec "+aI.id)}aI.response({run:true,menuId:aI.id})
}else{console.error("bg: Error: unable to find MC id "+aI.id)
}aF({})}},getWebRequestInfo:{allow:{script:true},exec:function(aI,aG,aF){if(typeof aG.tab!="undefined"){var aH={webRequest:aD};
aF(aH)}else{console.log("Unable to run scripts due to empty tab id");
aF({})}}},unLoad:{allow:{script:true},exec:function(aH,aG,aF){if(!aH.topframe){if(V||UV){console.log("unload check "+aH.id+" url: "+aH.url)
}if(aH.id){aj.events.unload(aG.tab.id,aG.tab.frameId,aH.id)
}}}},prepare:{allow:{script:true},exec:function(aL,aM,aH){if(typeof aM.tab!="undefined"&&aM.tab.index>=0){var aN=aL.topframe?0:null;
var aG=aL.url+aL.params;var aO=ao.values.forbiddenPages.length==0||t.validUrl(aG,{exc:ao.values.forbiddenPages});
var aJ=aj.events.prepare(aM.tab.id,aN,aL.id,aG);if(aO){var aK=function(){m.setIcon(aM.tab.id);
m.setBadge(aM.tab.id)};if(aJ){var aF={enabledScriptsCount:aJ,raw:{},webRequest:aD,logLevel:ao.values.logLevel,unsafeWindow:ao.values.runtime_unsafeWindow};
if(aL.raw){for(var aI=0;aI<aL.raw.length;aI++){aF.raw[aL.raw[aI]]=Registry.getRaw(aL.raw[aI])
}}aH(aF)}else{aH({logLevel:ao.values.logLevel})}aj.events.run(aM.tab.id,aN,aL.id,aG,aK);
N.tab.resetFireCnt(aM.tab.id)}else{console.log("Forbidden page: '"+aG+"' -> Do nothing!");
if(aL.id){aj.set.forbidden(aM.tab.id,aN,aL.id)}aH({})
}}else{aH({})}return false}},scriptBlockerDetected:{allow:{script:true},exec:function(aI,aH,aF){if(aI.xml_style_detected||aI.url.search(".xml$")!=-1){console.warn("blocker: unable to get unsafeWindow...")
}else{var aG=function(aK,aL){var aJ=(aK&&aL)?az.getMessage("Please_reload_this_page_in_order_to_run_your_userscripts_"):null;
aF({alert:aJ})};ab.requestPermissionEx(aG)}aj.set.blocker(aH.tab.id);
m.setIcon(aH.tab.id)}},startFireUpdate:{allow:{extpage:true},exec:function(aI,aH,aF){var aG=function(aJ){aF({suc:aJ})
};N.checkUpdate(true,aI.force,aG)}},getFireItems:{allow:{extpage:true},exec:function(aJ,aI,aG){var aH=function(aO,aM,aN){if(aM==undefined){aM=null
}var aL=function(aQ){try{var aP={image:aQ,cnt:aO,scripts:aM,progress:aN};
aG(aP);aM=[]}catch(aR){console.warn("bg: warn: action menu closed? "+JSON.stringify(aR))
}};if(aJ.countonly){aL(null)}else{S.createIconEx(aO,aL)
}};if(!N.isReady()){aH(0,[],{action:N.status.action,state:N.status.progress});
return true}var aK=function(aL){var aM=at(aJ,aL);aH(aL.length,aM)
};if(aJ.tabid){if(aJ.countonly){N.tab.getCount(aJ.tabid,aH)
}else{N.tab.getItems(aJ.tabid,aK)}}else{if(aJ.url){if(aJ.url=="*"){var aF=function(aN){var aM=[];
for(var aL=0;aL<1000;aL++){aM.push(Math.floor(Math.random()*aN+1).toString())
}N.ids.getItems(aM,aK)};N.getMax("scripts","sid",aF)
}else{if(aJ.countonly){N.url.getCount(aJ.url,aH)}else{N.url.getItems(aJ.url,aK)
}}}else{aH([],[])}}}},notification:{allow:{script:true,extpage:true},exec:function(aI,aH,aG){var aJ=(aI.image&&aI.image!="")?aI.image:chrome.extension.getURL("images/icon128.png");
var aF=function(aK){aG({clicked:aK.clicked})};ar.show(aI.title,aI.msg,aJ,aI.delay,aF)
}},localFileCB:{allow:{script:true},exec:function(aH,aG,aF){if(!b.useIframeMessage){b.listener(null,aH.data)
}aF({})}},handler:function(aK,aM,aG){if(!aa.late){aa.registerLateCallback(function(){aw.handler(aK,aM,aG)
});return true}if(V||EV||MV){console.log("back: request ",aK," sender: ",aM)
}var aS=aw[aK.method];if(aS){if(aS.allow&&aS.exec){var aL=al.SELF.ID;
var aO=(!al.REQUESTS.HAS_SENDER_ID&&aM.tab)||aM.id===aL;
var aQ=null;var aI=al.REQUESTS.INTERNAL_PAGE_URL;var aJ=al.REQUESTS.GET_INTERNAL_PAGE_REGEXP();
var aH=aO&&(!aM.tab||(aM.tab.url.search(aI)==0));if(aO&&aH){if(aM.tab){var aN=aM.tab.url.match(aJ);
if(aN&&aN.length==2){aQ=aN[1]}}else{aQ="*"}aM.extpage=aQ
}if(V||EV||MV){console.log("back: request page:",aQ,"extpage:",aH)
}var aT=(aQ=="options");var aF=(aQ=="background");var aR=aO&&!aH;
if(aF||(aS.allow.insecure)||(aS.allow.extpage&&aH)||(aS.allow.options&&aT)||(aS.allow.script&&aR)){var aP=aS.exec(aK,aM,aG);
if(aP!==undefined){return aP}}else{if(D){console.warn("back: this context doesn't have the permission to call '"+aK.method+"' ")
}return false}}else{console.log("b: invalid implementation of "+aK.method);
return false}}else{console.log("back: unknown method "+aK.method);
return false}if(V){console.log("back: request.method "+aK.method+" end!")
}return true}};var k=(function(){var aI=[];var aG=["test"];
var aH=false;var aF={getLayouts:function(){if(!aH){aI.push({name:az.getMessage("Default"),value:"default"});
aG.forEach(function(aJ){if(Registry.getRaw("layout/"+aJ+"/options.js")){aI.push({name:aJ.charAt(0).toUpperCase()+aJ.slice(1),value:aJ})
}});aH=true}return aI}};return aF})();var n={commands:[],add:function(aF){n.commands.push(aF)
},list:function(){var aG=[];for(var aF in n.commands){if(!n.commands.hasOwnProperty(aF)){continue
}var aH=n.commands[aF];aG.push(aH)}return aG},listByTabId:function(aI){var aH=[];
for(var aF in n.commands){if(!n.commands.hasOwnProperty(aF)){continue
}var aK=n.commands[aF];if(aK.tabId==aI){var aG=false;
for(var aJ=0;aJ<aH.length;aJ++){if(aH[aJ].name==aK.name){aG=true;
break}}if(!aG){aH.push(aK)}}}return aH},clearByTabId:function(aF){n.getByTabId(aF)
},getByTabId:function(aI){var aH=[];var aF=n.commands;
n.commands=[];for(var aG in aF){if(!aF.hasOwnProperty(aG)){continue
}var aJ=aF[aG];if(aJ.tabId!=aI){n.commands.push(aJ)
}else{aH.push(aJ);if(V||MV){console.log("MC remove "+aJ.id)
}}}return aH},clearById:function(aF){n.getById(aF)},getById:function(aJ){var aH=null;
var aF=n.commands;n.commands=[];for(var aG in aF){if(!aF.hasOwnProperty(aG)){continue
}var aI=aF[aG];if(aI.id!=aJ){n.commands.push(aI)}else{aH=aI
}}if(V||MV){console.log("MC remove "+aH.id)}return aH
}};var at=function(aH,aL){var aJ=[];var aO="http://...";
if(aH.tabid&&!aj.get.empty(aH.tabid)){var aI=function(aQ,aP){aO=aP;
return true};U.forEach(aj.get.urls(aH.tabid),aI)}else{if(aH.url){aO=aH.url
}}aJ.push({name:az.getMessage("Enable_Sort_Cache"),id:"fire_sort_cache_enabled",checkbox:true,option:true,enabled:ao.values.fire_sort_cache_enabled,desc:""});
var aM=aL.length?" ("+aL.length+")":"";aJ.push({name:az.getMessage("Available_Userscripts")+aM,heading:true,scriptTab:true});
aJ=aJ.concat(R(aL,false,true));aJ.push({name:az.getMessage("Settings"),heading:true});
aJ.push({name:az.getMessage("General"),section:true});
var aN="",aK="";var aG=I.getConfig();if(aG.fire.db_version==0){aK="?"
}else{var aF=aG.fire.db_version*1000;aK=new Date(aF).toString()
}aN+=az.getMessage("Current_Index_")+"<br><br>";aN+=az.getMessage("Date_")+" "+aK+"<br>";
aN+=az.getMessage("Entries_")+" "+((aG.fire.entries)?aG.fire.entries:"?")+"<br><br><br>";
aJ.push({name:"TamperFire DB",fire:true,fireInfo:true,value:aN,versionDB:aF});
aJ.push({name:az.getMessage("Check_for_Updates"),fname:az.getMessage("Force_Update"),fire:true,fireUpdate:true});
aJ.push({name:"Search by URL",id:"searchByURL",search:true,value:aO,desc:""});
return aJ};var c=function(aK){var aG=aK?aK.url:null;
var aJ=aG&&aG.length>4&&aG.substr(0,4).replace(/file|http/,"")==""?aG:"";
if(V){console.log("createActionMenuItems "+aG)}var aF=[];
var aI=[];aI.push({name:"enabled",section:true,pos:"top"});
aI.push({name:az.getMessage("Enabled"),display:ao.values.enabled?null:"greyed",id:"enabled",button:true,reload:true,enabler:true});
if(ao.values.fire_enabled){aI.push({name:"fire",section:true,pos:"top"});
var aH=null;if(ao.values.fire_topOnly){aH=chrome.extension.getURL("fire.html?url="+encodeURIComponent(aG))
}else{aH=chrome.extension.getURL("fire.html?tab="+aK.id)
}aI.push({name:az.getMessage("_0_scripts_found"),image:"download",doneImage:"fire",tabid:aK.id,tamperfire:true,url:aH,newtab:true})
}aI.push({name:"scripts",section:true,pos:"right"});
var aL=r(aK);aI=aI.concat(aL);if(ao.values.enabled&&!aL.length){if(ao.values.forbiddenPages.length==0||t.validUrl(aG,{exc:ao.values.forbiddenPages})){aI.push({name:az.getMessage("No_script_is_running"),image:"info"})
}else{aI.push({name:az.getMessage("This_page_is_blacklisted_at_the_security_settings"),image:"critical"})
}}if(ao.values.enabled&&(ao.values.configMode<100||!aL.length)){aI.push({name:az.getMessage("Get_new_scripts___"),image:"script_download",url:"http://userscripts.org",newtab:true});
aI.push({name:az.getMessage("Add_new_script___"),image:"script_add",url:chrome.extension.getURL("options.html")+"?open=0&url="+encodeURIComponent(aJ),newtab:true})
}aF=aF.concat(aI);aF.push({name:"commands",section:true,pos:"left"});
var aM=u(aK.id);if(aM.length){aM.push({name:"commands2",section:true,pos:"left"})
}aM.push({name:az.getMessage("Check_for_userscripts_updates"),id:"run_script_updates",button:true,image:"update"});
aM.push({name:az.getMessage("Report_a_bug"),image:"bug",url:"http://tampermonkey.net/bug",newtab:true});
aM.push({name:az.getMessage("Please_consider_a_donation"),image:"donation",url:"http://tampermonkey.net/donate.html",newtab:true});
aM.push({name:"about",section:true,pos:"bottom"});aM.push({name:az.getMessage("Dashboard"),image:"utilities",url:chrome.extension.getURL("options.html")+"?"+["url="+encodeURIComponent(aJ),"selected=dashboard"].join("&"),newtab:true});
aM.push(am());aF=aF.concat(aM);return aF};var d=function(aG){var aI=[];
var aK=[];var aF;aI.push({name:az.getMessage("Installed_userscripts"),heading:true,scriptTab:true,id:"dashboard"});
var aJ=r(null,true);aF=aJ.length;aJ.push({name:az.getMessage("No_script_is_installed"),image:"info",visible:!aF});
aJ.push({name:az.getMessage("Get_some_scripts___"),image:"edit_add",url:"http://userscripts.org",newtab:true,visible:!aF});
var aH=function(aT){for(var aV=0;aV<aT.length;aV++){var aR=aT[aV];
var aU={name:aR.name,id:aR.id,icon:aR.icon,code:null,position:0,positionof:aF,enabled:aR.enabled,version:aR.version,description:aR.description,nativeScript:true};
aI.push(aU)}aI.push({name:"Version",id:null,version:true,value:chrome.extension.getVersion()});
if(chrome.extension.inIncognitoContext&&ao.values.incognito_mode=="temporary"){aI.push({globalhint:true,image:"critical",value:az.getMessage("All_modifications_are_only_kept_until_this_incognito_session_is_closed_")})
}aI.push({name:az.getMessage("New_userscript"),id:null,image:"script_add",icon:chrome.extension.getURL("images/txt.png"),code:ao.values.scriptTemplate,nnew:true,position:-1,positionof:aF,enabled:true,userscript:true});
aI=aI.concat(aJ);aI.push({name:az.getMessage("Settings"),heading:true,id:"settings",selected_default:true});
var aZ=[];var aY=[];var a0=[];var aP=[];var aN=[];var aQ=[];
var aX=[];var aW=[];var aM=[];var aL=[];var aS=[];var aO=null;
aZ.push({name:az.getMessage("General"),section:true});
aZ.push({name:az.getMessage("Config_Mode"),id:"configMode",level:0,option:true,select:[{name:az.getMessage("Novice"),value:0},{name:az.getMessage("Beginner"),value:50},{name:az.getMessage("Advanced"),value:100}],value:ao.values.configMode,desc:az.getMessage("Changes_the_number_of_visible_config_options")});
aZ.push({name:az.getMessage("Language"),id:"i18n",level:0,option:true,reload:true,warning:{msg:az.getMessage("A_reload_is_required")},select:[{name:"Browser Default",value:null},{name:az.getOriginalMessage("English"),value:"en"},{name:az.getOriginalMessage("German"),value:"de"},{name:az.getOriginalMessage("French"),value:"fr"},{name:az.getOriginalMessage("Russian"),value:"ru"},{name:az.getOriginalMessage("Spanish"),value:"es"},{name:az.getOriginalMessage("Polish"),value:"pl"},{name:az.getOriginalMessage("Chinese__Simplified_"),value:"zh_CN"},{name:az.getOriginalMessage("Chinese__Traditional_"),value:"zh_TW"},{name:az.getOriginalMessage("Japanese"),value:"ja"}],value:ao.values.i18n});
aZ.push({name:az.getMessage("Make_includes_more_safe"),id:"safeUrls",level:60,option:true,checkbox:true,enabled:ao.values.safeUrls,desc:az.getMessage("Includes_more_safe_example")});
aZ.push({name:az.getMessage("Fix_includes"),id:"tryToFixUrl",level:60,option:true,checkbox:true,enabled:ao.values.tryToFixUrl,desc:az.getMessage("Fix_includes_example")});
aZ.push({name:az.getMessage("Auto_reload_on_script_enabled"),level:20,id:"autoReload",option:true,checkbox:true,enabled:ao.values.autoReload,desc:az.getMessage("Auto_reload_on_script_enabled_desc")});
aZ.push({name:az.getMessage("Anonymous_statistics"),level:0,id:"statistics_enabled",option:true,checkbox:true,enabled:ao.values.statistics_enabled,desc:az.getMessage("Allow_Tampermonkey_to_collect_anonymous_statistics_via_Google_Analytics")});
aZ.push({name:az.getMessage("Debug_scripts"),level:100,id:"debug",option:true,checkbox:true,enabled:ao.values.debug,desc:""});
aZ.push({name:az.getMessage("Show_fixed_source"),level:100,id:"showFixedSrc",option:true,checkbox:true,enabled:ao.values.showFixedSrc,desc:""});
aZ.push({name:az.getMessage("Open_script_links_in"),id:"script_link_open_method",level:20,option:true,select:[{name:az.getMessage("Default"),value:"default"},{name:az.getMessage("Current_Tab"),value:"current_tab"},{name:az.getMessage("New_Tab"),value:"new_tab"}],value:ao.values.script_link_open_method,desc:""});
aZ.push({name:az.getMessage("LogLevel"),id:"logLevel",level:0,option:true,select:[{name:az.getMessage("Trace"),value:100},{name:az.getMessage("Verbose"),value:80},{name:az.getMessage("Debug"),value:60},{name:az.getMessage("Error"),value:0}],value:ao.values.logLevel,desc:""});
aY.push({name:az.getMessage("Native_Script_Import"),section:true,needsave:true});
aO={};if(ao.values.native_import){aO=al.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS===true?{image:"button_ok",msg:az.getMessage("TM_has_access_to_file_URIs")}:{image:"critical",msg:az.getMessage("Tampermonkey_needs_access_to_file_URIs__Visit_the_FAQ_"),url:"http://tampermonkey.net/faq.php#Q204"}
}aY.push({name:az.getMessage("Enable_Native_Script_Import"),id:"native_import",level:0,option:true,checkbox:true,enabled:ao.values.native_import,validation:aO});
aY.push({name:az.getMessage("Post_Import_Action"),id:"native_import_post_action",level:0,option:true,select:[{name:az.getMessage("None"),value:"none"},{name:az.getMessage("Disable_Extension"),value:"disable"},{name:az.getMessage("Uninstall_Extension"),value:"uninstall"}],value:ao.values.native_import_post_action,desc:az.getMessage("What_action_should_be_done_after_a_native_userscript_was_imported_sucessfully_")});
aO={};if(ao.values.native_import){aO=aB.isPathValid()?{image:"button_ok",msg:az.getMessage("Everything_is_setup_correctly_")}:{image:"critical",msg:az.getMessage("Tampermonkey_needs_to_know_the_absolute_path_to_your_browser_profile_folder_Visit_the_FAQ_"),url:"http://tampermonkey.net/faq.php#Q205"}
}aY.push({name:az.getMessage("Browser_Profile_Path"),id:"native_import_path",level:0,option:true,text:true,width:2,value:ao.values.native_import_path,validation:aO});
if(al.OPTIONS.HAS_TESLA){aL.push({name:az.getMessage("TESLA")+" BETA",section:true,level:50,needsave:true});
aL.push({name:az.getMessage("Enable_TESLA"),id:"sync_enabled",level:50,option:true,checkbox:true,enabled:ao.values.sync_enabled,desc:az.getMessage("Tampermonkey_External_Script_List_Access")});
aL.push({name:az.getMessage("Sync_Type"),id:"sync_type",enabler:true,level:50,option:true,select:[{name:"pastebin.com",value:a.types.ePASTEBIN},{name:"Chrome Sync (Beta)",value:a.types.eCHROMESYNC,enable:{sync_id:0,create_tesla_data:0}}],value:ao.values.sync_type});
aL.push({name:az.getMessage("Sync_Id"),id:"sync_id",enabledBy:"sync_type",level:50,text:true,value:ao.values.sync_id,option:true});
aL.push({name:az.getMessage("Create_Exportable_Data"),id:"create_tesla_data",enabledBy:"sync_type",button:true,ignore:true,level:60,warning:{msg:az.getMessage("Copy_exportable_data_to_clipboard_Ok_")}})
}aN.push({name:az.getMessage("Appearance"),section:true});
aN.push({name:az.getMessage("Layout"),id:"layout",level:0,option:true,select:k.getLayouts(),value:ao.values.layout,desc:""});
aO={};if(ao.values.notification_showUpdate=="off"){aO={image:"critical",msg:az.getMessage("Are_you_sure_that_you_don_t_want_to_be_notified_of_updates_")}
}aN.push({name:az.getMessage("Update_Notification"),id:"notification_showUpdate",level:50,option:true,select:[{name:az.getMessage("Off"),value:"off"},{name:az.getMessage("Show_notification"),value:"notification"},{name:az.getMessage("Open_changelog"),value:"changelog"}],value:ao.values.notification_showUpdate,validation:aO});
aN.push({name:az.getMessage("Icon_badge_info"),id:"appearance_badges",level:50,option:true,select:[{name:az.getMessage("Off"),value:"off"},{name:az.getMessage("Running_scripts"),value:"running"},{name:az.getMessage("Unique_running_scripts"),value:"running_unique"},{name:az.getMessage("Disabled_scripts"),value:"disabled"},{name:"TamperFire",value:"tamperfire"}],value:ao.values.appearance_badges,desc:""});
if(al.OPTIONS.HAS_TAMPERFIRE){aW.push({name:az.getMessage("TamperFire"),section:true});
aW.push({name:az.getMessage("Enable_TamperFire"),id:"fire_enabled",level:0,option:true,checkbox:true,enabled:ao.values.fire_enabled,desc:""});
aW.push({name:az.getMessage("Use_top_frame_URL_only"),id:"fire_topOnly",level:0,option:true,checkbox:true,enabled:ao.values.fire_topOnly,desc:""});
aW.push({name:az.getMessage("Enable_Sort_Cache"),id:"fire_sort_cache_enabled",level:100,checkbox:true,option:true,enabled:ao.values.fire_sort_cache_enabled,desc:""});
aW.push({name:az.getMessage("Update_interval"),id:"fire_updatePeriod",level:50,option:true,select:[{name:az.getMessage("Never"),value:0},{name:az.getMessage("Every_Day"),value:24*60*60*1000},{name:az.getMessage("Every_Week"),value:7*24*60*60*1000},{name:az.getMessage("Every_2_Weeks"),value:14*24*60*60*1000},{name:az.getMessage("Every_Month"),value:30*24*60*60*1000}],value:ao.values.fire_updatePeriod,desc:""})
}a0.push({name:az.getMessage("Editor"),section:true,level:20});
a0.push({name:az.getMessage("Enable_Editor"),id:"editor_enabled",level:100,option:true,checkbox:true,enabled:ao.values.editor_enabled,reload:true,warning:{msg:az.getMessage("A_reload_is_required")},desc:""});
a0.push({name:az.getMessage("Key_Mapping"),id:"editor_keyMap",level:50,option:true,reload:true,warning:{msg:az.getMessage("A_reload_is_required")},select:[{name:az.getMessage("Windows"),value:"windows"},{name:az.getMessage("Emacs"),value:"emacs"},{name:az.getMessage("Vim"),value:"vim"}],value:ao.values.editor_keyMap});
a0.push({name:az.getMessage("Indentation_Width"),id:"editor_indentUnit",level:50,option:true,select:[{name:az.getMessage("1"),value:1},{name:az.getMessage("2"),value:2},{name:az.getMessage("3"),value:3},{name:az.getMessage("4"),value:4},{name:az.getMessage("5"),value:5},{name:az.getMessage("6"),value:6},{name:az.getMessage("7"),value:7},{name:az.getMessage("8"),value:8},{name:az.getMessage("9"),value:9},{name:az.getMessage("10"),value:10},{name:az.getMessage("11"),value:11}],value:ao.values.editor_indentUnit,desc:""});
a0.push({name:az.getMessage("Indent_with"),id:"editor_indentWithTabs",level:50,option:true,select:[{name:az.getMessage("Tabs"),value:"tabs"},{name:az.getMessage("Spaces"),value:"spaces"}],value:ao.values.editor_indentWithTabs,desc:""});
a0.push({name:az.getMessage("TabMode"),id:"editor_tabMode",level:50,option:true,select:[{name:az.getMessage("Classic"),value:"classic"},{name:az.getMessage("Smart"),value:"smart"}],value:ao.values.editor_tabMode,desc:""});
a0.push({name:az.getMessage("Reindent_on_typing"),id:"editor_electricChars",level:50,option:true,checkbox:true,enabled:ao.values.editor_electricChars,desc:""});
a0.push({name:az.getMessage("Enable_autoSave"),id:"editor_autoSave",level:20,option:true,checkbox:true,enabled:ao.values.editor_autoSave,desc:""});
a0.push({name:az.getMessage("Enable_easySave"),id:"editor_easySave",level:20,option:true,checkbox:true,enabled:ao.values.editor_easySave,desc:""});
aP.push({name:az.getMessage("Script_Update"),section:true,level:0});
aP.push({name:az.getMessage("Check_disabled_scripts"),id:"scriptUpdateCheckDisabled",level:0,option:true,checkbox:true,enabled:ao.values.scriptUpdateCheckDisabled,desc:""});
aP.push({name:az.getMessage("Check_interval"),id:"scriptUpdateCheckPeriod",level:0,option:true,select:[{name:az.getMessage("Never"),value:0},{name:az.getMessage("Every_Hour"),value:1*60*60*1000},{name:az.getMessage("Every_6_Hours"),value:6*60*60*1000},{name:az.getMessage("Every_12_Hour"),value:12*60*60*1000},{name:az.getMessage("Every_Day"),value:24*60*60*1000},{name:az.getMessage("Every_Week"),value:7*24*60*60*1000}],value:ao.values.scriptUpdateCheckPeriod,desc:""});
aP.push({name:az.getMessage("Dont_ask_me_for_simple_script_updates"),id:"notification_silentScriptUpdate",level:80,option:true,checkbox:true,enabled:ao.values.notification_silentScriptUpdate,desc:""});
aP.push({name:az.getMessage("Hide_notification_after"),id:"scriptUpdateHideNotificationAfter",level:50,option:true,select:[{name:az.getMessage("Never"),value:0},{name:az.getMessage("15_Seconds"),value:15*1000},{name:az.getMessage("30_Seconds"),value:30*1000},{name:az.getMessage("1_Minute"),value:60*1000},{name:az.getMessage("5_Minutes"),value:5*60*1000},{name:az.getMessage("1_Hour"),value:60*60*1000}],value:ao.values.scriptUpdateHideNotificationAfter,desc:""});
if(al.RUNTIME.NEED_UNSAFEWINDOW_PROXY){aO=ao.values.runtime_unsafeWindow=="auto"?{}:{image:"critical",msg:az.getMessage("This_option_is_essential_for_many_userscripts_to_work__Visit_the_FAQ_"),url:"http://tampermonkey.net/faq.php#Q404"};
aX.push({name:az.getMessage("Runtime"),section:true,level:50});
aX.push({name:az.getMessage("UnsafeWindow_retrieval_method"),id:"runtime_unsafeWindow",level:50,option:true,select:[{name:az.getMessage("Auto"),value:"auto"},{name:az.getMessage("Native"),value:"native"},{name:az.getMessage("Unsafe"),value:"unsafe"},{name:az.getMessage("Sandbox"),value:"sandbox"}],value:ao.values.runtime_unsafeWindow,desc:az.getMessage("A_lot_of_userscripts_require_the_unsafeWindow_object_to_interact_with_the_pages_javascript_"),validation:aO})
}aQ.push({name:az.getMessage("Security"),section:true,level:50});
if(al.OPTIONS.HAS_CSP){aQ.push({name:az.getMessage("Allow_overwrite_javascript_settings"),id:"scriptblocker_overwrite",level:50,option:true,select:[{name:az.getMessage("Yes"),value:"yes"},{name:az.getMessage("No"),value:"no"}],value:ao.values.scriptblocker_overwrite,desc:az.getMessage("Tampermonkey_can_not_work_when_javascript_is_disabled")});
aQ.push({name:az.getMessage("Add_TM_to_CSP"),id:"webrequest_fixCSP",level:50,option:true,select:[{name:az.getMessage("Yes"),value:"yes"},{name:az.getMessage("No"),value:"no"}],value:ao.values.webrequest_fixCSP,desc:az.getMessage("Tampermonkey_might_not_be_able_to_provide_access_to_the_unsafe_context_when_this_is_disabled")});
aQ.push({name:az.getMessage("Allow_headers_to_be_modified_by_scripts"),id:"webrequest_modHeaders",level:50,option:true,select:[{name:az.getMessage("Yes"),value:"yes"},{name:az.getMessage("Auto"),value:"auto"},{name:az.getMessage("No"),value:"no"}],value:ao.values.webrequest_modHeaders,desc:""})
}if(!chrome.extension.inIncognitoContext){aO=ao.values.incognito_mode=="temporary"?{}:{image:"critical",msg:"Permanent mode is still a BETA feature!"};
aQ.push({name:az.getMessage("Store_data_in_incognito_mode"),id:"incognito_mode",level:50,option:true,select:[{name:az.getMessage("Temporary"),value:"temporary"},{name:az.getMessage("Permanent"),value:"permanent"}],value:ao.values.incognito_mode,validation:aO})
}aQ.push({name:az.getMessage("Forbidden_Pages"),id:"forbiddenPages",level:50,option:true,input:true,array:true,value:ao.values.forbiddenPages,desc:""});
aQ.push({name:az.getMessage("_require_blacklist"),id:"require_blacklist",level:80,option:true,input:true,array:true,value:ao.values.require_blacklist,desc:""});
aM.push({name:az.getMessage("Userscripts"),section:true,level:80});
aM.push({name:az.getMessage("New_script_template_"),id:"scriptTemplate",level:80,option:true,input:true,value:ao.values.scriptTemplate});
aS.push({name:az.getMessage("Reset_Section"),section:true,level:50});
aS.push({name:az.getMessage("Restart_Tampermonkey"),id:"reset_simple",level:50,button:true,reload:true,value:0,warning:{msg:az.getMessage("This_will_restart_Tampermonkey_Ok_")}});
aS.push({name:az.getMessage("Factory_Reset"),id:"reset_factory",level:80,button:true,reload:true,value:0,warning:{msg:az.getMessage("This_will_remove_all_scripts_and_reset_all_settings_Ok_")}});
aS.push({name:az.getMessage("Chrome_Sync_Reset"),id:"reset_chrome_sync",level:80,button:true,reload:false,value:0,warning:{msg:az.getMessage("This_will_remove_all_stored_data_from_google_sync_Ok_")}});
if(aq){aS.push({name:az.getMessage("Install_Tests"),id:"install_tests",level:80,button:true,reload:false,ignore:true,value:0,warning:{msg:az.getMessage("This_will_install_a_lot_of_test_scripts_")}})
}aI=aI.concat(aZ).concat(aN).concat(aP).concat(aX).concat(aL).concat(aY).concat(aW).concat(a0).concat(aQ).concat(aM).concat(aS);
aI.push({name:"EOS",section:true,endsection:true});
if(false){aI.push({name:az.getMessage("Registered_menu_cmds"),heading:true});
aK=u()}aI=aI.concat(aK);if(aG){aG(aI)}};aB.getAllUserscripts(aH)
};var am=function(){var aF="version="+chrome.extension.getVersion()+"&ext="+al.SELF.ID.substr(0,4);
return{image:"info",urls:[{name:" "+az.getMessage("Help"),url:"http://tampermonkey.net/faq.php?"+aF,newtab:true},{name:" "+az.getMessage("Changelog"),url:"http://tampermonkey.net/changelog.php?"+aF,newtab:true}]}
};var u=function(aI){var aH=[];var aF=(aI==null||aI==undefined)?n.list():n.listByTabId(aI);
for(var aG in aF){if(!aF.hasOwnProperty(aG)){continue
}var aK=aF[aG];var aJ={name:aK.name,id:aK.id,accessKey:aK.accessKey,image:"menu_cmd",menucmd:true};
aH.push(aJ)}return aH};var R=function(aH,aO,aI){var aK=[];
for(var aG in aH){var aL=aH[aG];var aN;if(aO||aI){aN=aL
}else{aN={name:aL.name,id:aL.id,system:aL.system,enabled:aL.enabled,position:aL.position}
}aN.file_url=aL.downloadURL||aL.fileURL;aN.positionof=aH.length;
aN.userscript=aL.options.user_agent?false:true;aN.user_agent=aL.options.user_agent;
if(!aL.icon64&&!aL.icon){aN.icon64=chrome.extension.getURL(aN.user_agent?"images/user_agent.png":"images/txt.png")
}if(aL.options){var aJ=new x.Script();for(var aF in aJ.options){if(!aJ.options.hasOwnProperty(aF)){continue
}aN[aF]=aL.options[aF]}}if(aO||aI){aN.code=aL.textContent;
aN.sync=aL.sync;if(aO&&ao.values.showFixedSrc){var aM=false;
aN.code=af.mkCompat(aL.textContent,aL,aM)}}aK.push(aN)
}return aK};var r=function(aJ,aH){if(aH==undefined){aH=false
}var aG=aJ?aJ.url:null;var aF=[];if(aJ){if(!aj.get.empty(aJ.id)){var aI=function(aL,aO){if(V||UV){console.log("Found at Tabs.get.urls["+aJ.id+"] -> "+aO)
}var aP=t.determineScriptsToRun(aO);for(var aN=0;aN<aP.length;
aN++){var aM=false;for(var aK=0;aK<aF.length;aK++){if(aF[aK].name==aP[aN].name){aM=true;
break}}if(!aM){aF.push(aP[aN])}}};U.forEach(aj.get.urls(aJ.id),aI)
}else{console.warn("bg: WARN: Tabs.get.urls["+aJ.id+"] is empty!")
}}else{aF=t.determineScriptsToRun(aG)}return R(aF,aH)
};var ay={copy:function(aG){var aF=document.createElement("iframe");
document.body.appendChild(aF);try{aF.contentDocument.designMode="on";
if(aG.type=="html"){aF.setAttribute("sandbox","allow-same-origin");
aF.contentDocument.documentElement.innerHTML=aG.content;
aF.contentDocument.execCommand("selectAll",false,null)
}else{aF.contentDocument.oncopy=function(aI){aI.clipboardData.setData(aG.mimetype||"text/plain",aG.content);
aI.preventDefault()}}aF.contentDocument.execCommand("copy",false,null);
aF.contentDocument.designMode="off"}catch(aH){console.error("bg: clipboard Error: "+aH.message)
}aF.parentNode.removeChild(aF);aF=null}};clip=ay;var v={permContentSettings:"contentSettings",permStorage:"storage",permissions:null,lock:false,clear:function(){if(v.lock){console.log("perm: clear, but locked")
}v.permissions=null},get:function(aF){var aG=function(aH){U.forEach(aH.permissions,function(aJ,aI){v.permissions[aJ]=true
});v.lock=false;if(aF){aF()}};v.lock=true;v.permissions={};
chrome.permissions.getAll(aG)},has:function(aH,aF){if(v.lock){var aI=function(){v.has(aH,aF)
};window.setTimeout(aI,50);return}if(!v.permissions){var aG=function(){v.has(aH,aF)
};v.get(aG);return}if(aF){aF(!!v.permissions[aH])}},ask:function(aI,aL,aK,aF){var aJ=chrome.extension.getURL("images/icon128.png");
var aH=function(aM){if(aF){aF(aM)}};var aG=function(aM){if(aM.granted){if(!v.permissions){v.permissions={}
}v.permissions[aI]=true;aH(aM.granted);return}aH(false)
};ar.getPermission(aL,aK,aJ,60000,aI,aG)},remove:function(aH,aF){var aG=function(aI){if(v.permissions){v.permissions[aH]=false
}if(aF){aF(aI)}};chrome.permissions.remove({permissions:[aH]},aG)
}};perm=v;var ab={asked:false,runCheck:false,hasPermission:false,init:function(){var aF=function(aG){ab.hasPermission=aG;
ab.runCheck=ab.hasPermission&&(ao.values.scriptblocker_overwrite=="yes");
if(D){console.log("bg: contentSettings: runCheck = "+ab.runCheck+" hasPerm = "+ab.hasPermission)
}};v.has(v.permContentSettings,aF)},askForPermission:function(aF){v.ask(v.permContentSettings,az.getMessage("A_script_blocker_was_detected_"),az.getMessage("Click_here_to_allow_TM_to_override_the_script_blocker"),aF)
},requestPermissionEx:function(aF){if(ao.values.scriptblocker_overwrite!="yes"){if(aF){aF()
}return}var aG=function(aI){if(aF){aF(aI,true)}if(aI&&!ab.runCheck){ab.runCheck=true;
ae.reset()}};var aH=function(aI){if(ab.asked){if(aF){aF(aI,false)
}}else{if(aI){aF(aI,false)}else{ab.askForPermission(aG)
}}ab.asked=true};v.has(v.permContentSettings,aH)},remove:function(aF){v.remove(v.permContentSettings,aF)
}};var ae={run:function(aM,aF){var aK=1;var aL=function(){if(aF){aF()
}window.location.reload()};var aG=function(){if(--aK==0){aL()
}};if(aM=="config"){var aJ=j.listValues();for(var aI in aJ){var aH=aJ[aI];
if(aH.search(al.CONSTANTS.PREFIX.SCRIPT)==-1){continue
}if(aH.search(al.CONSTANTS.PREFIX.COND)==-1){continue
}if(aH.search(al.CONSTANTS.PREFIX.STORE)==-1){continue
}if(aH.search(al.CONSTANTS.PREFIX.META)==-1){continue
}j.deleteValue(aH)}}else{if(aM=="factory"){if(N.isReady()){aK++;
N.clean(aG)}if(ab.hasPermission){aK++;ab.remove(aG)
}aK++;j.deleteAll(aG())}}aG()},reset:function(aF){ae.run(null,aF)
},factoryReset:function(aF){ae.run("factory",aF)},configReset:function(aF){ae.run("config",aF)
}};var f=function(){chrome.browserAction.setIcon({path:chrome.extension.getURL("images/icon_grey.png")});
chrome.browserAction.setPopup({popup:"action.html"});
chrome.browserAction.setTitle({title:"Tampermonkey"})
};var m={t:500,tob:{},toi:{},setIcon:function(aG,aH){if(m.toi[aG]){window.clearTimeout(m.toi[aG])
}var aF=function(){m.setIconInternal(aG,aH);delete m.toi[aG]
};m.toi[aG]=window.setTimeout(aF,m.t)},setIconInternal:function(aF,aG){if(aG==undefined){aG=ao
}var aN,aM,aL=null;var aK=false;var aH=false;var aJ=false;
if(aF&&!aj.get.empty(aF)){aK=aj.get.blocker(aF);aH=aj.get.stats(aF).running;
aJ=aj.get.forbidden(aF)}if(aJ){aG.images.icon="images/icon_grey_forbidden.png";
aL=az.getMessage("At_least_one_part_of_this_page_is_listed_at_the_forbidden_pages_setting_")
}else{if(aK){aG.images.icon="images/icon_grey_blocker.png";
aL=az.getMessage("Some_scripts_might_be_blocked_by_the_javascript_settings_for_this_page_or_a_script_blocker_")
}else{if(aH){aG.images.icon="images/icon.png"}else{aG.images.icon="images/icon_grey.png"
}}}aN={path:chrome.extension.getURL(aG.images.icon)};
aM={title:aL?aL:chrome.extension.manifest.name};if(aF!=null){aN.tabId=aF;
aM.tabId=aF}try{chrome.browserAction.setIcon(aN);chrome.browserAction.setTitle(aM)
}catch(aI){console.warn("bg: ERROR while setIcon! "+aI.message)
}},setBadge:function(aG){if(m.tob[aG]){window.clearTimeout(m.tob[aG])
}var aF=function(){m.setBadgeInternal(aG);delete m.tob[aG]
};m.tob[aG]=window.setTimeout(aF,m.t)},setBadgeInternal:function(aG){var aI=0;
var aH=function(){if(D){console.log("badge: set "+aI)
}if(aI==0){chrome.browserAction.setBadgeText({text:"",tabId:aG})
}else{chrome.browserAction.setBadgeText({text:aI.toString(),tabId:aG})
}};if(ao.values.appearance_badges=="off"){aI=0}else{if(ao.values.appearance_badges=="running"){if(aG&&!aj.get.empty(aG)){aI=aj.get.stats(aG).running
}}else{if(ao.values.appearance_badges=="running_unique"){if(aG&&!aj.get.empty(aG)){aI=aj.get.stats(aG,true).unique
}}else{if(ao.values.appearance_badges=="disabled"){if(aG&&!aj.get.empty(aG)){aI=aj.get.stats(aG).disabled
}}else{if(ao.values.appearance_badges=="tamperfire"){var aF=function(aJ){aI=aJ;
aH()};N.tab.getCount(aG,aF);return}}}}}aH()}};var Z={infoChanged:[],redirects:{},addInfoChangedListener:function(aF){Z.infoChanged.push(aF)
},runInfoChangedListener:function(){for(var aF=0;aF<Z.infoChanged.length;
aF++){Z.infoChanged[aF](aD)}},headerCheck:function(aH){if(aH.tabId>=0&&aD.verified==false){if(D||UV){console.log("bg: verify that webRequest is working at "+aH.type+" to "+aH.url)
}var aK=false;var aJ=new RegExp("^"+aD.testprefix);
for(var aG=0;aG<aH.requestHeaders.length;aG++){var aI=aH.requestHeaders[aG];
if(UV){console.log(" #: "+aI.name+" -> "+aI.value)}if(aI.name.search(aJ)==0){if(D){console.log("bg: found "+aI.name+" @webRequest :)")
}aK=true}}if(!aK&&aD.verifyCnt-->0){return}aD.headers=aK;
aD.verified=true;Z.runInfoChangedListener();if(D){console.debug("bg: verified webRequest "+(aD.headers?"":"not ")+"being working")
}try{chrome.webRequest.onSendHeaders.removeListener(Z.headerCheck)
}catch(aF){aD.headers=false;aD.verified=true;Z.runInfoChangedListener()
}}},detectRedirectToCache:function(aF){aa.registerLateCallback(function(){Z.detectRedirect(aF)
})},detectRedirect:function(aF){var aQ=aF.responseHeaders;
var aH=aF.requestId;var aO=false;var aR=false;var aP=false;
var aS=aF.type=="xmlhttprequest";var aK=aF.type=="main_frame";
var aI=aK||aF.type=="sub_frame";if(!aS&&!ao.values.webrequest_fixCSP&&!aI){return{}
}if(aS&&Z.redirects[aH]){aO=true}for(var aM=0;aM<aQ.length;
aM++){var aT=aQ[aM];var aL=aT.name.toLowerCase();if(aL=="location"){if(aI){aR=true
}else{if(aS){var aG=function(){var aU=aH;if(aO){window.clearTimeout(Z.redirects[aH].to)
}var aV=function(){delete (Z.redirects[aU])};Z.redirects[aU]={url:aT.value,to:window.setTimeout(aV,10000)}
};aG();break}}}else{if(ao.values.webrequest_fixCSP&&(aL=="x-webkit-csp"||aL=="x-content-security-policy"||aL=="content-security-policy")){var aJ=aT.value.replace(/script-src /,"script-src "+al.REQUESTS.INTERNAL_PAGE_URL+al.SELF.ID+" 'unsafe-inline' 'unsafe-eval' ");
if(D){console.log('csp: replace "'+aT.value+'" with "'+aJ+'"')
}aT.value=aJ;aQ[aM]=aT;aP=true}}}if(!aR&&aI){var aN={tabId:aF.tabId,frameId:aF.frameId,url:aF.url};
aj.events.response(aF.tabId,aF.frameId,aF.url)}if(aS&&aO){aQ.push({name:"TM-finalURL",value:Z.redirects[aH].url});
aP=true}if(aP){return{responseHeaders:aQ}}return{}},headerFix:function(aS){if(V||UV){console.log(aS.type)
}var aW=!aj.get.empty(aS.tabId);var aH=aS.type=="main_frame";
var aX=ab.runCheck;var aM=aH||aS.type=="sub_frame";
if(aM&&aX){var aT=B.parse(aS.url);var aK=aT.origin+"/*";
chrome.contentSettings.javascript.set({primaryPattern:aK,setting:"allow"});
if(V||UV||EV){var aG=function(){var aY=function(aZ){console.log("contentSettings: ("+(new Date()).getTime()+") state: "+JSON.stringify(aZ))
};chrome.contentSettings.javascript.get({primaryUrl:aS.url},aY)
};console.log("contentSettings: ("+(new Date()).getTime()+") allow URL "+aK);
aG();window.setTimeout(aG,20)}}var aJ=aH&&aj.get.user_agent(aS.tabId,aS.frameId);
var aF=aD.headers&&aS.type=="xmlhttprequest";if(!aJ&&!aF){return{}
}var aO=false;var aR={};var aL=[];var aN=new RegExp("^"+aD.prefix);
var aI;if(aJ){aI=aj.get.user_agent(aS.tabId,aS.frameId);
if(V||UV){console.log("bg: userscript user-agent spoof enabled! ("+aI+")")
}}if(V||UV){console.log("bg: process request to "+aS.url);
console.log(aS.requestHeaders)}for(var aQ=0;aQ<aS.requestHeaders.length;
aQ++){var aV=aS.requestHeaders[aQ];if(aF&&aV.name.search(aN)==0){aL.push(aV)
}else{if(aJ&&aV.name.toLowerCase()=="user-agent"){aO=true;
aR[aV.name]=aI}else{aR[aV.name]=aV.value}}}if(aF){for(var aQ=0;
aQ<aL.length;aQ++){var aV=aL[aQ];aO=true;aR[aV.name.replace(aN,"")]=aV.value
}if(!aD.verified){aO=true;aR[aD.testprefix]="true"}}if(aO){var aU=[];
for(var aP in aR){if(!aR.hasOwnProperty(aP)){continue
}if(aP!=""){aU.push({name:aP,value:aR[aP]})}}if(V||UV){console.log(aU)
}return{requestHeaders:aU}}return{}},sucRequest:function(aF){if(aF.tabId>0){console.log("bg: "+aF.requestId+" print "+aF.type+" request of tabId "+aF.tabId+" to "+aF.url)
}},checkRequestForUserscript:function(aH){var aF=true;
if(aF&&aH.tabId>0&&aH.method!="POST"&&an.isScriptUrl(aH.url)){var aG=an.getInstallPageUrl(aH.url);
if(RV){console.log("bg: user script detected @ "+aH.url+" -> open tab with "+aG)
}if(an.useNewTab()){chrome.tabs.create({url:aG},function(){});
return{redirectUrl:"javascript:history.back()"}}return{redirectUrl:aG}
}if(aF){aj.events.reset(aH.tabId,true);aj.events.request(aH.tabId,aH.frameId,aH.url)
}return{}},removeWebRequestListeners:function(){if(aD.use){try{Z.preCleanup();
chrome.webRequest.onBeforeRequest.removeListener(Z.checkRequestForUserscript);
chrome.webRequest.onBeforeSendHeaders.removeListener(Z.headerFix);
chrome.webRequest.onHeadersReceived.removeListener(Z.detectRedirect);
if(aD.headers){if(aD.verified==false){chrome.webRequest.onSendHeaders.removeListener(Z.headerCheck)
}if(V||UV){chrome.webRequest.onCompleted.removeListener(Z.sucRequest)
}}}catch(aF){}}aD.headers=false;aD.verified=true;Z.runInfoChangedListener()
},preInit:function(){if(aD.use){Z.tmp_cache=true;var aF={urls:["http://*/*","https://*/*"]};
chrome.webRequest.onHeadersReceived.addListener(Z.detectRedirectToCache,aF,["responseHeaders","blocking"]);
chrome.webRequest.handlerBehaviorChanged()}},preCleanup:function(){if(aD.use&&Z.tmp_cache){chrome.webRequest.onHeadersReceived.removeListener(Z.detectRedirectToCache);
delete Z.tmp_cache}},init:function(aG,aL){if(aD.use){try{Z.preCleanup();
var aJ={urls:["http://*/*","https://*/*"],types:["xmlhttprequest"]};
var aF={urls:["http://*/*","https://*/*","file://*/*"]};
var aH={urls:["http://*/*","https://*/*"]};var aK={urls:["http://*/*","https://*/*","file://*/*"],types:["main_frame"]};
chrome.webRequest.onBeforeRequest.addListener(Z.checkRequestForUserscript,aK,["blocking"]);
chrome.webRequest.onBeforeSendHeaders.addListener(Z.headerFix,aF,["requestHeaders","blocking"]);
chrome.webRequest.onHeadersReceived.addListener(Z.detectRedirect,aH,["responseHeaders","blocking"]);
if(aL){if(!aG){chrome.webRequest.onSendHeaders.addListener(Z.headerCheck,aJ,["requestHeaders"])
}if(V||UV){chrome.webRequest.onCompleted.addListener(Z.sucRequest,aJ,[])
}}chrome.webRequest.handlerBehaviorChanged();aD.verified=aG;
aD.headers=aL;aD.id=((new Date()).getTime()+Math.floor(Math.random()*6121983+1)).toString();
aD.testprefix=aD.prefix+(Math.floor(Math.random()*6121983+1)).toString();
aD.prefix=aD.prefix+aD.id+"_";Z.runInfoChangedListener()
}catch(aI){if(D){console.error("bg: error initializing webRequests "+aI.message)
}Z.removeWebRequestListeners()}}},finalize:function(){Z.removeWebRequestListeners()
}};var E={retries:5,onCommitedListener:function(aF){aj.events.commited(aF.tabId,aF.frameId,aF.url)
},wait:function(){if(!chrome.webNavigation||!chrome.webNavigation.onCommitted){if(al.RUNTIME.OPERA||E.retries--==0){return
}if(D||V){console.log("bg: waitForWebNav()")}window.setTimeout(E.wait,300);
return}chrome.webNavigation.onCommitted.addListener(E.onCommitedListener)
}};var aa={late:false,callbacks:[],init:function(){},registerLateCallback:function(aF){if(D||V){console.log("toea: register callback")
}aa.callbacks.push(aF)},setReady:function(){if(D||V){console.debug("toea: run "+aa.callbacks.length+" callbacks")
}aa.late=true;for(var aF=0;aF<aa.callbacks.length;aF++){aa.callbacks[aF]()
}aa.callbacks=[]}};var O=(function(){var aI=false;var aH=null;
var aG={init:function(aK){aH=aK;window.addEventListener("beforeunload",aJ,false);
window.setTimeout(aF,5000);window.setInterval(aF,Math.floor(al.MISC.UNLOAD_TIMEOUT/2)*1000)
}};var aJ=function(){if(aI){return}if(D){console.debug("Unloader.onbeforeunload()")
}aF();if(aH){aH()}aI=true};var aF=function(){aC.setItem(al.CONSTANTS.STORAGE.UNLOAD,(new Date()).getTime())
};return aG})();var au=function(aF,aG,aH){if(!aa.late){window.setTimeout(function(){au(aF,aG,aH)
},100);return}if(V){console.log("loadListener "+aH.url+" "+aG.status)
}if(an.isScriptUrl(aH.url)){an.openInstallPage(aH.id,aH.url)
}var aI=0;if(aG.status=="loading"){aj.events.loading(aH.id,aI,aH.url)
}else{if(aG.status=="complete"){aj.events.complete(aH.id,aI,aH.url)
}}};var L=function(aF,aG){};var A=function(aG,aF){aj.events.remove(aG)
};var y=function(){var aF=ao.values.incognito_mode=="temporary"&&chrome.extension.inIncognitoContext;
j.setTemporary(aF);if(aF){ao.values.native_import=false;
ao.values.sync_enabled=false;ao.values.fire_updatePeriod=0;
ao.values.scriptUpdateCheckPeriod=0;ao.values.sync_type=0;
ao.values.statistics_enabled=false}};var H=function(){G(ao.values.logLevel);
az.setLocale(ao.values.i18n);aB.setPath(ao.values.native_import_path);
if(ao.values.statistics_enabled){ak.init();window.onerror=function(aJ,aI,aH){ak.tE(aJ,chrome.extension.manifest.version+" "+aI,aH)
}}ab.init();aj.listeners.add.onReset(function(aH,aI){n.clearByTabId(aH);
j.notifyClientListeners(null,aH);if(!aI){m.setIcon(aH)
}});var aG=function(aH){m.setIcon(aH);m.setBadge(aH)
};aj.listeners.add.onCommited(aG);aj.listeners.add.onCompleted(aG);
if(ao.values.sync_enabled&&ao.values.sync_type){ac.enable();
ac.scheduleSync(1000,true);ac.schedulePeriodicalCheck()
}if(ao.values.fire_enabled){N.init()}var aF=function(aH){if(V){console.log("bg: webRequest changed "+JSON.stringify(aH))
}if(P){P.setWebRequest(aH)}};Z.addInfoChangedListener(aF);
Z.init(ao.values.webrequest_modHeaders!="auto",ao.values.webrequest_modHeaders!="no")
};var B=Registry.get("uri");uris=B;var F;var p;var P;
var af;var x;var a;var az;var aq;init=function(){if(V){console.log("bg: init extension, detected id: "+al.SELF.ID)
}aa.init();Z.preInit();chrome.tabs.onUpdated.addListener(au);
chrome.tabs.onRemoved.addListener(A);chrome.extension.onMessage.addListener(aw.handler);
chrome.extension.onConnect.addListener(aA);chrome.extension.onConnectExternal.addListener(function(aK){aK.disconnect()
});O.init(function(){Z.finalize();ac.finalize()});F=Registry.get("convert");
az=Registry.get("i18n");P=Registry.get("xmlhttprequest");
p=P.run;af=Registry.get("compat",al);x=Registry.get("parser");
a=Registry.get("syncinfo");aq=Registry.get("test");
f();var aG=function(){if(av){var aL="version="+av.newV+"&ext="+al.SELF.ID.substr(0,4)+"&updated=true";
var aK;if(av.first_run){aK="http://tampermonkey.net/installed.php?"+aL
}else{aL+="&old="+av.oldV;aK="http://tampermonkey.net/changelog.php?"+aL
}if(ao.values.notification_showUpdate=="off"){}else{if(ao.values.notification_showUpdate=="notification"){ar.showUpdate(az.getMessage("Updated_to__0version0",av.newV),az.getMessage("Click_here_to_see_the_recent_changes"),chrome.extension.getURL("images/icon128.png"),function(aN){if(aN.clicked){var aO={url:aK};
chrome.tabs.create(aO,function(){})}})}else{if(ao.values.notification_showUpdate=="changelog"){var aM={url:aK,active:(!!av.active)};
chrome.tabs.create(aM,function(){})}}}}};var aJ=function(){aG();
y();H();w();m.setIcon();aF();if(aq&&("3737.80".substr(0,3)==="###")){var aK=aq.framework.prepare(t.saveScriptEx);
if(aK){console.error(aK)}}};var aI=function(){ao.init(aJ);
cfgo=ao};var aH=function(){ap(aI)};j.init(aH);var aF=function(){window.setTimeout(Y.check,10000);
E.wait();if(D||V){console.debug("Listeners registered!")
}window.setTimeout(aa.setReady,1)}};init()})();