function Coordinator(){function U(a){20<=window.innerWidth-a?(a=window.innerWidth-20,h.className=h.className.replace(/\s*evernoteClipperVisible/g,""),b.contentWindow.postMessage({name:"hideFilingDialogHacks",height:h.offsetHeight-12},Browser.extension.getURL("")),V(),l.className=l.className.replace(/\s*evernoteClipperVisible/g,""),b.contentWindow.postMessage({name:"hideUserToolsHacks"},Browser.extension.getURL(""))):a=window.innerWidth;f.setSize(a,window.innerHeight);f.center()}function O(){f&&(f.getElement().parentNode.removeChild(f.getElement()),
f.destroy(),document.body.style.overflow="",c&&(c.contentDocument.body.style.overflow=""));f=null;x={};document.body.className=document.body.className.replace(/\s*skitchon/g,"")}function sa(a,b,q,d){var c=document.createEvent("MouseEvents");d&&(b=window.innerWidth-b,q=window.innerHeight-q);c.initMouseEvent(a,!0,!0,window,1,null,null,b,q,!1,!1,!1,!1,1,null);document.querySelector(".skitch-layer-tool").dispatchEvent(c)}function ua(){/skitchon/.test(document.body.className)&&P?(v(),b.contentWindow.postMessage({name:"postCrop",
fromKeyboard:!0},Browser.extension.getURL("")),P=!1):/evernoteClipperVisible/.test(h.className)?W():g&&/evernoteClipperVisible/.test(g.className)?ca():/evernoteClipperVisible/.test(b.className)&&G()}function da(a){/evernoteClipperVisible/.test(b.className)&&!/skitchon/.test(document.body.className)&&W({data:{focus:a}})}function Q(a){/evernoteClipperVisible/.test(b.className)&&!/skitchon/.test(document.body.className)&&("expand"==a?contentPreview.expandPreview():"contract"==a?contentPreview.contractPreview():
"up"==a?contentPreview.moveToElementAbove():"down"==a&&contentPreview.moveToElementBelow())}function va(a,b){if(H)e[a](b)}function y(a){if(!a||a.constructor!==MouseEvent||/evernoteClipperVisible/.test(b.className))V(),h.className=h.className.replace(/\s*evernoteClipperVisible/g,""),ea(),l.className=l.className.replace(/\s*evernoteClipperVisible/g,""),b.contentWindow.postMessage({name:"hideFilingDialogHacks"},Browser.extension.getURL("")),b.contentWindow.postMessage({name:"hideUserToolsHacks"},Browser.extension.getURL("")),
window.focus()}function z(a){if(c){var b=c.scrollWidth;window.ClearlyComponent__reformat.$iframeBox[0].style.display="none";c.contentDocument.querySelector("#loading").style.display="none";c.contentDocument.documentElement.className=c.contentDocument.documentElement.className.replace(/\s*clearlyVisible/g,"");document.body.className=document.body.className.replace(/\s*clearlyVisible/g,"");document.documentElement.className=document.documentElement.className.replace(/\s*clearlyVisible/g,"");document.body.scrollLeft=
fa;document.body.scrollTop=ga;window.ClearlyComponent__reformat.$iframeBackground.animate({right:b+"px"},500,"clearlyEasingForBackground",function(){document.body.className=document.body.className.replace(/\s*clearlyBeforeVisible/g,"");document.documentElement.className=document.documentElement.className.replace(/\s*clearlyBeforeVisible/g,"");c.style.setProperty("top","-100%","important");c.style.setProperty("left","-100%","important");c.style.setProperty("height",document.body.clientHeight+"px",
"important");a&&("previewArticle"==a?contentPreview.previewArticle():"previewFullPage"==a?contentPreview.previewFullPage():"previewUrl"==a?contentPreview.previewUrl():"previewEmail"==a?contentPreview.previewEmail():"previewSelection"==a&&contentPreview.previewSelection())})}else a&&("previewArticle"==a?contentPreview.previewArticle():"previewFullPage"==a?contentPreview.previewFullPage():"previewUrl"==a?contentPreview.previewUrl():"previewEmail"==a?contentPreview.previewEmail():"previewSelection"==
a&&contentPreview.previewSelection())}function A(a,c){a&&a.for&&"screenshot"==a.for&&(I=!0,X=a.tool,ha=a.showSubtools,J=a.contextMenu,/evernoteClipperVisible/.test(h.className)||(K=!0),!J||/evernoteClipperVisible/.test(b.className)||/evernoteClipperVisible/.test(h.className)||(L.play(),Browser.sendToExtension({name:"captureScreenshot",contextMenu:J})));b.contentWindow.postMessage({name:"hideExtras"},Browser.extension.getURL(""));b.className=b.className.replace(/\s*evernoteClipperVisible/g,"");!c&&
g&&(g.className=g.className.replace(/\s*evernoteClipperVisible/g,""));y()}function ea(){m.className=m.className.replace(/\s*evernoteClipperVisible/g,"");m.blur()}function ca(){g.className=g.className.replace(/\s*evernoteClipperVisible/g,"");v();b.contentWindow.postMessage({name:"reactivateClipperTool"},Browser.extension.getURL(""))}function V(){k.className=k.className.replace(/\s*evernoteClipperVisible/g,"");b.contentWindow.postMessage({name:"hideShareDialogHacks",height:k.offsetHeight-12},Browser.extension.getURL(""))}
function ia(){f&&f.disableEvents();document.body.className=document.body.className.replace(/\s*skitchon/g,"");b.className=b.className.replace(/\s*(tempHidden|hidable)/g,"");document.body.style.overflow="";c&&(c.contentDocument.body.style.overflow="")}function G(a,ta,q){var d;a:{for(var e=[h,l,k,m,b],f=0;f<e.length;f++)try{if(void 0!==e[f].contentWindow.constructor||e[f].contentWindow.document.domain!==/:\/\/(.+?)\//.exec(Browser.extension.getURL(""))[1]){d=!1;break a}}catch(g){}d=!0}d?(Y=!(!a||!a.dontStartPreview),
/evernoteClipperVisible/.test(b.className)||a.contextMenu||"screenshot"==a.for?(A({for:a?a.for:null,contextMenu:a?a.contextMenu:null}),Browser.sendToExtension({name:"showLoggedInState"}),contentPreview.clear(),contentPreview.reset(),s=t=null,b.contentWindow.postMessage({name:"stopSkitch"},Browser.extension.getURL("")),O(),B=0,c&&(C||(C=!0,a=c.getAttribute("maxScrollY")||"0",Browser.sendToExtension({name:"trackEvent",userId:n,category:"Clearly",action:"scroll",label:p,value:100*parseInt(a)/(c.contentWindow.document.body.scrollHeight-
c.contentWindow.innerHeight)})),D||(D=!0,Browser.sendToExtension({name:"trackEvent",userId:n,category:"Clearly",action:"saved",label:p}))),z()):(clipResultCoordinator.hideClipResult(!1),v(a),Browser.sendToExtension({name:"showOpenState"}))):(E=[a,ta,q],ja())}function wa(){/evernoteClipperVisible/.test(b.className)&&b.contentWindow.postMessage({name:"save"},Browser.extension.getURL(""))}function ka(a){h.style.setProperty("height",a+"px","important");b.contentWindow.postMessage({name:"getFilingTop"},
Browser.extension.getURL(""))}function ja(){h.src=Browser.extension.getURL("content/filing_tools/filing_tools.html");l.src=Browser.extension.getURL("content/user_tools/user_tools.html");k.src=Browser.extension.getURL("content/share_tools/share_tools.html");m.src=Browser.extension.getURL("content/share_tools/email_sharing.html");b.src=Browser.extension.getURL("content/global_tools/global_tools.html")}function la(){window.ClearlyComponent__reformat.applyOptions(window.ClearlyComponent__reformat.availableThemes.newsprint);
window.ClearlyComponent__reformat.loadGoogleFontsRequiredByAppliedOptions();var a=c.scrollWidth;document.body.className+=" clearlyBeforeVisible";document.documentElement.className+=" clearlyBeforeVisible";window.ClearlyComponent__reformat.$iframeBox[0].style.display="none";window.ClearlyComponent__reformat.$iframeBackground[0].style.right=a+"px";fa=document.body.scrollLeft;ga=document.body.scrollTop;c.style.setProperty("top","0px","important");c.style.setProperty("left","0px","important");c.style.setProperty("height",
document.body.scrollHeight+"px","important");window.ClearlyComponent__reformat.$iframeBackground.animate({right:"0px"},500,"clearlyEasingForBackground",function(){c.contentDocument.querySelector("#loading").style.display="block";document.body.className+=" clearlyVisible";document.documentElement.className+=" clearlyVisible";c.contentDocument.documentElement.className+=" clearlyVisible";Y||b.contentWindow.postMessage({name:"makeHidable"},Browser.extension.getURL(""));window.focus();0==window.ClearlyComponent__reformat.pagesCount?
pageInfo.getCleanArticle(function(a){if(a&&0<a.length){window.ClearlyComponent__reformat.addNewPage(a[0],window.location.href);Z();for(var b=1;b<a.length;b++)window.ClearlyComponent__reformat.addNewPage(a[b],window.location.href);a=Math.max(document.body.scrollHeight,c.contentDocument.body.scrollHeight);c.style.setProperty("height",a+"px","important")}else pageInfo.getDefaultArticle(function(a){a&&(window.ClearlyComponent__reformat.addNewPage(a.outerHTML,window.location.href),Z())})},function(a,b){window.ClearlyComponent__reformat.addNewPage(a,
b);var d=Math.max(document.body.scrollHeight,c.contentDocument.body.scrollHeight);c.style.setProperty("height",d+"px","important")}):Z()})}function Z(){window.ClearlyComponent__reformat.$iframeBox[0].style.display="block";c.contentDocument.querySelector("#loading").style.display="none";window.scrollTo(0,0);var a=Math.max(document.body.scrollHeight,c.contentDocument.body.scrollHeight);c.style.setProperty("height",a+"px","important");Browser.sendToExtension({name:"bounce",message:{name:"taskFinished",
type:"clearly"}})}function v(a){a&&(Browser.sendToExtension({name:"main_recordActivity"}),h.contentWindow.postMessage({name:"reset"},Browser.extension.getURL("")),l.contentWindow.postMessage({name:"reset"},Browser.extension.getURL("")),b.contentWindow.postMessage({name:"reset"},Browser.extension.getURL("")),ma=a.username,n=a.userId,M=a.authTokens,R=a.premium,p="free",M.biz?p="business":R&&(p="premium"),h.contentWindow.postMessage({name:"initialize",alwaysTags:a.alwaysTags,gmailThread:pageInfo.isGmailThread(),
title:document.title.trim(),url:pageInfo.getCanonicalUrl()||document.location.href,userId:n,userType:p},Browser.extension.getURL("")),aa||(aa=!0,h.contentWindow.postMessage({name:"setKeyboardHandlers",handlers:w,keyboardShortcutsEnabled:H},Browser.extension.getURL(""))),Browser.sendToExtension({name:"getSmartFilingInfo",authTokens:M,query:pageInfo.getSearchQuery(),recText:pageInfo.getRecommendationText(!1),userId:n}),Browser.sendToExtension({name:"getNotebooks",authTokens:M,userId:n,username:ma}),
Browser.sendToExtension({name:"getTags",authTokens:M,userId:n}),b.contentWindow.postMessage({name:"setUsername",fullName:a.fullName},Browser.extension.getURL("")),b.contentWindow.postMessage({name:"setPossibleClipTypes",pageInfo:{pdf:pageInfo.getPdfUrl(),documentIsFrameset:pageInfo.documentIsFrameset,selection:pageInfo.getSelection()?!0:!1,gmail:pageInfo.isGmail(),gmailThread:pageInfo.isGmailThread()}},Browser.extension.getURL("")),b.className+=" needToLoadRest",l.contentWindow.postMessage({name:"setup",
auth:a.authTokens.pers,baseUrl:a.baseUrl,currentUser:a.fullName,premium:R},Browser.extension.getURL("")),l.className=R?l.className+" evernoteClipperPremium":l.className.replace(/\s*evernoteClipperPremium/g,""));b.className=b.className.replace(/\s*tempHidden/g,"");b.className+=" evernoteClipperVisible";I=!1}function xa(a){y();m.className+=" evernoteClipperVisible";m.contentWindow.postMessage({name:"setup",auth:a.auth,noteGuid:a.noteGuid,persAuth:a.persAuth,sharedAuth:a.sharedAuth,subject:a.subject,
userId:a.userId,userType:a.userType},Browser.extension.getURL(""));b.contentWindow.postMessage({name:"showShareDialogHacks",height:m.offsetHeight-12},Browser.extension.getURL(""))}function ya(){window.ClearlyComponent__reformat={callbacks:{frameCreated:function(){c=window.ClearlyComponent__reformat.iframe;c.contentWindow.addEventListener("scroll",function(){var a=c.contentWindow.scrollY;a>ba&&(ba=a,c.contentWindow.frameElement.setAttribute("maxScrollY",ba))});var a=c.contentDocument.createElement("div"),
b=c.contentDocument.createElement("div");a.setAttribute("id","loading");b.setAttribute("id","loading_spinner");a.appendChild(b);c.contentDocument.body.appendChild(a);a=c.contentDocument.createElement("style");a.setAttribute("id","loading_sign_css");a.setAttribute("type","text/css");b="#loading { position: fixed; top: 0; right: 0; width: 100%; height: 100%; z-index: 300; ";b=1.5>window.devicePixelRatio?b+("background-image: url('"+Browser.extension.getURL("clearly/images/loading--background.png")+
"'); "):b+("background-image: url('"+Browser.extension.getURL("clearly/images/loading--background@2x.png")+"'); ");b+="background-position: center center; background-repeat: no-repeat; } #loading_spinner { position: absolute; top: 0; left: 0; width: 100%; height: 100%; ";b=1.5>window.devicePixelRatio?b+("background-image: url('"+Browser.extension.getURL("clearly/images/loading--big.gif")+"'); "):b+("background-image: url('"+Browser.extension.getURL("clearly/images/loading--big@2x.gif")+"'); ");a.innerText=
b+"background-position: center center; background-repeat: no-repeat; }";c.contentDocument.body.appendChild(a);c.contentWindow.ClearlyComponent__highlight={callbacks:{},settings:{imgPath:Browser.extension.getURL("clearly/images/")},window:c.contentWindow,document:c.contentDocument,jQuery:window.jQuery};c.contentWindow.ClearlyComponent__highlight=initClearlyComponent__highlight(c.contentWindow.ClearlyComponent__highlight);c.contentWindow.ClearlyComponent__highlight.insertCSS();c.contentWindow.ClearlyComponent__highlight.addMouseHandlers();
la()}},settings:{cssPath:Browser.extension.getURL("clearly/css/"),pageLabel:Browser.i18n.getMessage("page")+" ",onCreateFrameUseThisId:"evernoteClearlyArticle",onCreateFrameDoNotInsertCSS:!0},window:window,document:document,jQuery:window.jQuery};window.ClearlyComponent__reformat=initClearlyComponent__reformat(window.ClearlyComponent__reformat);$.easing.clearlyEasingForBackground=function(a,b,c,d,e){a=(b/=e)*b;e=a*b;return c+d*(-2.5*e*a+10*a*a-14*e+7*a+0.5*b)};window.ClearlyComponent__reformat.createFrame()}
function na(a){function e(b,c){var d={name:"receiveNoteContent",clipType:a.data.type,html:b,pendingNoteKey:N,recommendationText:pageInfo.getRecommendationText(!1),share:a.data.share,hasTextHighlights:0<B,userId:n,userType:p,width:c};t&&(d.updateGuid=t);s&&(d.previousToken=s);Browser.sendToExtension(d);a.data.share||(contentPreview.reset(),B=0,s=t=null)}function q(){h.contentWindow.postMessage({name:"sendFilingInfo",pendingNoteKey:N,useDefaultNotebook:a.data.contextMenu},Browser.extension.getURL(""));
"screenshot"==a.data.type?(a.data.contextMenu||f.getFile(function(b){b={name:"receiveNoteContent",clipType:"skitch",content:'<img src="resource:0"></img>',contentClass:"evernote.skitch",pendingNoteKey:N,recommendationText:pageInfo.getRecommendationText(!1),resources:[{bytes:b.bytes,mime:b.mime}],share:a.data.share,userId:n,userType:p};t&&(b.updateGuid=t);s&&(b.previousToken=s);Browser.sendToExtension(b);for(var c in x)Browser.sendToExtension({name:"trackEvent",userId:n,category:"Skitch Tool",action:c,
label:p,value:x[c]})}),a.data.share||(contentPreview.reset(),B=0,s=t=null,O())):"clearly"==a.data.type?(clipper.clipClearly(window.ClearlyComponent__reformat.$iframePages[0],c.contentWindow,function(a,b){e(a,b)}),a.data.share||z(),D=!0,Browser.sendToExtension({name:"trackEvent",userId:n,category:"Clearly",action:"saved",label:p})):("article"==a.data.type?clipper.clipArticle(!0,e):"fullPage"==a.data.type?clipper.clipFullPage(!0,e):"selection"==a.data.type?clipper.clipSelection(!0,a.data.selectionText,
e):"url"==a.data.type?clipper.clipUrl(e):"pdf"==a.data.type?clipper.clipPdf(e):"email"==a.data.type?clipper.clipEmail(e):"image"==a.data.type&&clipper.clipImage(a.data.imageUrl,e),a.data.share||(contentPreview.clear(),O()));a.data.contextMenu&&b.contentWindow.postMessage({name:"stopSkitch"},Browser.extension.getURL(""))}if(Y)k.className+=" evernoteClipperVisible",h.contentWindow.postMessage({name:"getClipResultInfo"},Browser.extension.getURL(""));else{N=UUID.generateGuid();if(a.data.share)y(),k.className+=
" evernoteClipperVisible",q();else if(A(),Browser.sendToExtension({name:"showLoggedInState"}),clipResultCoordinator.showClipResult(N,q),c&&!C){C=!0;var d=c.getAttribute("maxScrollY")||"0";Browser.sendToExtension({name:"trackEvent",userId:n,category:"Clearly",action:"scroll",label:p,value:100*parseInt(d)/(c.contentWindow.document.body.scrollHeight-c.contentWindow.innerHeight)})}c&&"clearly"!=a.data.type&&(D=!0,Browser.sendToExtension({name:"trackEvent",userId:n,category:"Clearly",action:"didn't save",
label:p}))}}function u(a,c){/evernoteClipperVisible/.test(b.className)&&!/skitchon/.test(document.body.className)&&(a?b.contentWindow.postMessage({name:"switchMode",mode:a},Browser.extension.getURL("")):c&&b.contentWindow.postMessage({name:"switchMode",direction:c},Browser.extension.getURL("")))}function r(a,c,q,d){/skitchon/.test(document.body.className)&&b.contentWindow.postMessage({name:"switchSkitchTool",tool:a,subtool:c,location:q,charCode:d},Browser.extension.getURL(""))}function oa(a){if(/evernoteClipperVisible/.test(a.className))return a.className=
a.className.replace(/\s*evernoteClipperVisible/g,""),!1;y();a.className+=" evernoteClipperVisible";return!0}function W(a){a&&a.data&&(pa=a.data.focus);oa(h)?b.contentWindow.postMessage({name:"showFilingDialogHacks",height:h.offsetHeight-12,top:h.offsetTop+2},Browser.extension.getURL("")):b.contentWindow.postMessage({name:"hideFilingDialogHacks"},Browser.extension.getURL(""))}function za(a){a&&(-1<["INPUT","TEXTAREA"].indexOf(a.nodeName)||"true"===a.contentEditable)||Browser.sendToExtension({name:"toggleClipper"})}
function qa(){/clearlyVisible/.test(document.documentElement.className)?c.contentWindow.ClearlyComponent__highlight.disable():window.ClearlyComponent__highlight.disable()}function ra(a){f.enableEvents();document.body.className+=" skitchon";document.body.style.overflow="hidden";window.scrollTo(0,0);f.useTool(a.data.tool);"crop"==a.data.tool?(P=!0,A(),b.contentWindow.postMessage({name:"unmakeHidable"},Browser.extension.getURL(""))):"text"==a.data.tool&&a.data.location&&f.startActiveTool(a.data.location,
{value:String.fromCharCode(a.data.charCode),selectOnFocus:!1});qa()}var b,h,g,c,l,m,k,f,x={},P=!1,L,ba=0,fa=0,ga=0,ma,n,M,R,p,H=!0,e={},w={},F={},N,B=0,S=0,I=!1,X,ha=!1,J=!1,pa=null,K=!1,T=!1,C=!1,D=!1,Y=!1,aa=!1,E=[],t=null,s=null;this.msgHandlerToggleCoordinator=G;Browser.addMessageHandlers({doneSharing:function(a,b,c){t=a.guid;s=a.token},finishContextMenuScreenshot:function(a,b,c){I=!1},hideCoordinator:A,hideScrollbar:function(a,b,q){document.body.style.overflow="hidden";c&&(c.contentDocument.body.style.overflow=
"hidden")},logoutCallback:function(a,c,q){A();contentPreview.clear();b.contentWindow.postMessage({name:"stopSkitch"},Browser.extension.getURL(""));O();z()},receiveKeyboardShortcuts:function(a,b,c){H=a.keyboardShortcutsEnabled;b={};for(var d in a.keys){var f=[];-1<a.keys[d].indexOf("|")?(f=a.keys[d].split("|").map(function(a){return a.split(",")[0]}),c=f.join(" + ")):(c=a.keys[d].split(",")[0],f.push(c));b[c]=va;"startWebClipperShortcut"==d?e[c]=za:"closeWebClipperShortcut"==d?(e[c]=ua,w[d]=[c],F[d]=
[c]):"previewArticleShortcut"==d?e[c]=function(){u("article")}:"previewFullPageShortcut"==d?e[c]=function(){u("fullPage")}:"previewUrlShortcut"==d?e[c]=function(){u("url")}:"selectionModeShortcut"==d?e[c]=function(){u("selection")}:"takeScreenshotShortcut"==d?e[c]=function(){u("screenshot")}:"clearlyShortcut"==d?e[c]=function(){u("clearly")}:"pdfShortcut"==d?e[c]=function(){u("pdf")}:"emailShortcut"==d?e[c]=function(){u("email")}:"expandArticleShortcut"==d?e[c]=function(){Q("expand")}:"contractArticleShortcut"==
d?e[c]=function(){Q("contract")}:"moveArticleUpShortcut"==d?e[c]=function(){Q("up")}:"moveArticleDownShortcut"==d?e[c]=function(){Q("down")}:"selectNotebookShortcut"==d?e[c]=function(){da("notebook")}:"addTagsShortcut"==d?e[c]=function(){da("tags")}:"saveShortcut"==d?e[c]=wa:"arrowShortcut"==d?e[c]=function(){r("shape","arrow")}:"textShortcut"==d?e[c]=function(){r("text")}:"rectangleShortcut"==d?e[c]=function(){r("shape","rectangle")}:"roundedRectangleShortcut"==d?e[c]=function(){r("shape","roundedRectangle")}:
"ellipseShortcut"==d?e[c]=function(){r("shape","ellipse")}:"lineShortcut"==d?e[c]=function(){r("shape","line")}:"markerShortcut"==d?e[c]=function(){r("marker")}:"highlighterShortcut"==d?e[c]=function(){r("highlighter")}:"stampShortcut"==d?e[c]=function(){r("stamp")}:"pixelateShortcut"==d?e[c]=function(){r("pixelate")}:"cropShortcut"==d&&(e[c]=function(){r("crop")});if(-1<f.indexOf("91")){var g=JSON.parse(JSON.stringify(f));/windows/i.test(window.navigator.userAgent)?(g[f.indexOf("91")]="17",g.sort(function(a,
b){return a-b}),e[g.join(" + ")]=e[c],delete e[c],b[g.join(" + ")]=b[c],delete b[c],w[d]&&(w[d][0]=g.join(" + ")),F[d]&&(F[d][0]=g.join(" + "))):(g[f.indexOf("91")]="93",g.sort(function(a,b){return a-b}),e[g.join(" + ")]=e[c],b[g.join(" + ")]=b[c],w[d]&&w[d].push(g.join(" + ")),F[d]&&F[d].push(g.join(" + ")))}}Browser.addKeyboardHandlers(b);4==S&&(aa=!0,h.contentWindow.postMessage({name:"setKeyboardHandlers",handlers:w,keyboardShortcutsEnabled:H},Browser.extension.getURL("")))},receiveKeyboardShortcutsEnabled:function(a,
b,c){H=a.keyboardShortcutsEnabled},receiveScreenshot:function(a,c,e){f=Skitch.createSurface({width:window.innerWidth,allowZoom:!1,height:window.innerHeight,url:a.url,top:0,left:0,margin:0,success:function(){document.body.appendChild(f.getElement());window.postMessage({name:"screenshotDoneForFle"},"*");f.getElement().addEventListener("mousedown",function(){b.contentWindow.postMessage({name:"closeSubtools"},Browser.extension.getURL(""));b.style.removeProperty("width")});f.useTool(a.tool);f.enableEvents();
document.body.className+=" skitchon";b.contentWindow.postMessage({name:"makeHidable"},Browser.extension.getURL(""));window.scrollTo(0,0);contentPreview.clear();z();f.toast(Browser.i18n.getMessage("screenshotToast"));v()}});f.on("toolStarted",function(a){x[a]||(x[a]=0);x[a]++});f.on("toolStopped",function(a){"crop"==a&&(P=!1,v(),b.contentWindow.postMessage({name:"postCrop"},Browser.extension.getURL("")))});f.localize({CROP_APPLY_TEXT:Browser.i18n.getMessage("apply"),CROP_CANCEL_TEXT:Browser.i18n.getMessage("regForm_cancel"),
ZOOM_RESET_TEXT:Browser.i18n.getMessage("reset"),ZOOM_TIP_TEXT:Browser.i18n.getMessage("panInstruction")})},showCoordinator:v,startSubmission:function(a,b,c){na({data:a})},toggleCoordinator:G,pauseSkitch:function(){/skitchon/.test(document.body.className)&&b.contentWindow.postMessage({name:"stopSkitch"},Browser.extension.getURL(""))}});window.addEventListener("message",function(a){RegExp(a.origin,"i").test(Browser.extension.getURL(""))&&("userDropdownHeader"==a.data.name?handleUserDropdownHeaderEvents(a):
"setFilingToolsHeight"==a.data.name?ka(a.data.height):"receiveFilingTop"==a.data.name?(h.style.setProperty("top",Math.min(window.innerHeight-parseInt(h.style.height)-20,a.data.top)+"px","important"),/evernoteClipperVisible/.test(h.className)&&b.contentWindow.postMessage({name:"showFilingDialogHacks",height:h.offsetHeight-12,top:h.offsetTop+2},Browser.extension.getURL(""))):"startSubmission"==a.data.name?na(a):"toggleCoordinator"==a.data.name?G(a.data):"showOptions"==a.data.name?(g&&g.parentNode&&
g.parentNode.removeChild(g),g=document.createElement("iframe"),g.id="evernoteOptionsPage",g.addEventListener("load",function(){g.contentWindow.postMessage({name:"setKeyboardHandlers",handlers:F},Browser.extension.getURL(""))}),document.documentElement.appendChild(g),g.src=Browser.extension.getURL("options.html#iframe"),g.className="evernoteClipperVisible",A(null,!0),ia(),z(),contentPreview.gray()):"hideOptions"==a.data.name?ca():"useSkitchTool"==a.data.name?ra(a):"useSkitchColor"==a.data.name?(f.updateSelectedElementsColor(a.data.color),
f.useColor(a.data.color)):"setToolbarWidth"==a.data.name?b.style.setProperty("width",a.data.width,"important"):"dispatchEvent"==a.data.name?sa(a.data.type,a.data.x,a.data.y,!0):"hideSkitch"==a.data.name?ia():"toggleFilingTools"==a.data.name?W(a):"uiReady"==a.data.name?(S++,0<E.length&&4==S&&(G(E[0],E[1],E[2]),E=[]),window.focus()):"showClearly"==a.data.name?c?la():ya():"hideClearly"==a.data.name?z(a.data.after):"toggleUserTools"==a.data.name?oa(l)?b.contentWindow.postMessage({name:"showUserToolsHacks",
height:parseFloat(window.getComputedStyle(l).height)},Browser.extension.getURL("")):b.contentWindow.postMessage({name:"hideUserToolsHacks"},Browser.extension.getURL("")):"showCoordinator"==a.data.name?v():"showEmailDialog"==a.data.name?xa(a.data):"hideEmailDialog"==a.data.name?(k.className+=" evernoteClipperVisible",k.contentWindow.postMessage(a.data,Browser.extension.getURL("")),ea(),b.contentWindow.postMessage({name:"showShareDialogHacks",height:k.offsetHeight-12},Browser.extension.getURL(""))):
"zoomin"==a.data.name?/skitchon/.test(document.body.className)&&(f.zoom(1.1,{x:window.innerWidth/2,y:window.innerHeight/2}),U(f.getBox().width)):"zoomout"==a.data.name?/skitchon/.test(document.body.className)&&(f.zoom(1/1.1,{x:window.innerWidth/2,y:window.innerHeight/2}),U(f.getBox().width)):-1<["setNotebook","createTag","clearTag","clearTags"].indexOf(a.data.name)?b.contentWindow.postMessage(a.data,Browser.extension.getURL("")):"setShareToolsHeight"==a.data.name?(k.style.setProperty("height",a.data.height+
"px","important"),/evernoteClipperVisible/.test(k.className)&&b.contentWindow.postMessage({name:"showShareDialogHacks",height:k.offsetHeight-12},Browser.extension.getURL(""))):"hideAllTools"==a.data.name?(y(),clipResultCoordinator.hideClipResult(!0)):"hideShareTools"==a.data.name?V():"useHighlighter"==a.data.name?/skitchon/.test(document.body.className)?ra({data:{tool:"highlighter"}}):/clearlyVisible/.test(document.documentElement.className)?c.contentWindow.ClearlyComponent__highlight.enable():window.ClearlyComponent__highlight.enable():
"turnOffHTMLHighlighter"==a.data.name?qa():"setOptionsHeight"==a.data.name?a.data.height>window.innerHeight?(g.style.setProperty("height",window.innerHeight+"px","important"),g.style.setProperty("top","-webkit-calc(50% - "+window.innerHeight/2+"px)","important"),g.contentWindow.postMessage({name:"setPinchHeight",totalHeight:window.innerHeight},Browser.extension.getURL(""))):(g.style.setProperty("height",a.data.height+"px","important"),g.style.setProperty("top","-webkit-calc(50% - "+a.data.height/
2+"px)","important")):"tempHideGlobalTools"==a.data.name?b.className+=" tempHidden":"untempHideGlobalTools"==a.data.name?b.className=b.className.replace(/\s*tempHidden/g,""):"makeGlobalToolsHidable"==a.data.name?(b.className+=" hidable",b.style.removeProperty("width")):"eventFilter"!=a.data.name&&"eventClick"!=a.data.name||"globalTools"!==a.data.wnd||b.contentWindow.postMessage(a.data,Browser.extension.getURL("")))});window.addEventListener("keydown",function(a){/evernoteClipperVisible/.test(b.className)&&
(/Mac OS X/.test(window.navigator.userAgent)?a.metaKey&&a.preventDefault():/Windows/.test(window.navigator.userAgent)&&a.ctrlKey&&a.preventDefault(),-1<[8,13,27,39,37,65,70,66,83,77,80,69,67].indexOf(a.keyCode)&&(/skitchon/.test(document.body.className)||a.preventDefault()))});window.addEventListener("keypress",function(a){if(/skitchon/.test(document.body.className)&&!document.querySelector("textarea.skitch-tool-element-text-editor")){var b=f.getElement().offsetWidth/2,c=f.getElement().offsetHeight/
2;r("text",null,{x:b,y:c},a.charCode);a.preventDefault()}});Browser.sendToExtension({name:"getKeyboardShortcuts",shortcuts:"startWebClipperShortcut closeWebClipperShortcut previewArticleShortcut previewFullPageShortcut previewUrlShortcut selectionModeShortcut takeScreenshotShortcut clearlyShortcut pdfShortcut emailShortcut expandArticleShortcut contractArticleShortcut moveArticleUpShortcut moveArticleDownShortcut selectNotebookShortcut addTagsShortcut saveShortcut arrowShortcut textShortcut rectangleShortcut roundedRectangleShortcut ellipseShortcut lineShortcut markerShortcut highlighterShortcut stampShortcut pixelateShortcut cropShortcut".split(" ")});
window.addEventListener("click",y);window.addEventListener("mousedown",function(a){/evernoteClipperVisible/.test(b.className)?contentPreview.isPointOnVeil(a.pageX,a.pageY)&&a.preventDefault():g&&/evernoteClipperVisible/.test(g.className)&&a.preventDefault()});window.addEventListener("resize",function(){/skitchon/.test(document.body.className)&&U(f.getBox().width);ka(parseInt(h.style.height))});window.addEventListener("unload",function(){Browser.sendToExtension({name:"showLoggedInOrOutState"});if(!C&&
c){var a=c.getAttribute("maxScrollY")||"0";Browser.sendToExtension({name:"trackEvent",userId:n,category:"Clearly",action:"scroll",label:p,value:100*parseInt(a)/(c.contentWindow.document.body.scrollHeight-c.contentWindow.innerHeight)});C=!0;D||(D=!0,Browser.sendToExtension({name:"trackEvent",userId:n,category:"Clearly",action:"didn't save",label:p}))}});(function(){h=document.createElement("iframe");h.id="evernoteFilingTools";h.addEventListener("webkitTransitionEnd",function(){I?(K=!0,T&&(L.play(),
Browser.sendToExtension({name:"captureScreenshot",tool:X,contextMenu:J}),T=K=!1)):/evernoteClipperVisible/.test(h.className)&&(h.focus(),h.contentWindow.postMessage({name:"setFocus",focus:pa},Browser.extension.getURL("")))});l=document.createElement("iframe");l.id="evernoteUserTools";k=document.createElement("iframe");k.id="evernoteShareTools";m=document.createElement("iframe");m.id="evernoteEmailSharing";m.addEventListener("webkitTransitionEnd",function(){/evernoteClipperVisible/.test(m.className)&&
m.contentWindow.postMessage({name:"focusRecipients"},Browser.extension.getURL(""))});b=document.createElement("iframe");b.id="evernoteGlobalTools";b.addEventListener("webkitTransitionEnd",function(){I&&(T=!0,K&&(L.play(),Browser.sendToExtension({name:"captureScreenshot",tool:X,showSubtools:ha,contextMenu:J}),T=K=!1));/needToLoadRest/.test(b.className)&&(b.className=b.className.replace(/\s*needToLoadRest/g,""),Browser.sendToExtension({name:"getOption",option:"defaultClipAction"}))});ja();S++;document.documentElement.appendChild(h);
document.documentElement.appendChild(l);document.documentElement.appendChild(k);document.documentElement.appendChild(m);document.documentElement.appendChild(b);L=new Audio;L.src=Browser.extension.getURL("skitch/sounds/snap.wav");window.ClearlyComponent__highlight={callbacks:{highlightAdded:function(){B++},highlightDeleted:function(){B--}},settings:{imgPath:Browser.extension.getURL("clearly/images/")},window:window,document:document,jQuery:window.jQuery};window.ClearlyComponent__highlight=initClearlyComponent__highlight(window.ClearlyComponent__highlight);
window.ClearlyComponent__highlight.insertCSS();window.ClearlyComponent__highlight.addMouseHandlers()})();Object.preventExtensions(this)}Object.preventExtensions(Coordinator);
