chrome.tabs.getSelected(null,function(p){chrome.tabs.sendRequest(p.id,{name:"checkVersion"})});
$(document).ready(function(){function p(a){console.log("updateBookmark",a);if(a.generated==true){var b=a.bm;a.unread===true&&$("#read-later").addClass("unread").text("Mark as Read");$("#onload").hide();if(b.saved==true){$("#remove").show();$("#remove").attr("data-gtooltip","Saved "+b.datetime+". Click to remove");$("#bookmark-save").text("Edit").addClass("saved");$("#cached").show().unbind("click").bind("click",function(){chrome.tabs.getSelected(null,function(c){var d="https://www.diigo.com/cached?url="+
encodeURIComponent(c.url);chrome.tabs.create({url:d,index:c.index+1})})})}if(b!=undefined){$("#diigobm-title-input").val(b.title);$("#diigobm-url-input").val(b.url)}else chrome.tabs.getSelected(function(c){$("#diigobm-title-input").val(c.title);$("#diigobm-url-input").val(c.url)});b.mode==2&&$("#op-private").find(".op-checkbox-container").addClass("checked");b.unread==true&&$("#op-readlater").find(".op-checkbox-container").addClass("checked");a=ParseTags.unparseTags(b.tags);console.log(a);blank(a)||
$("#diigobm-tag-input").val(a+" ")}}function q(a,b){var c=$("#diigobm-tag-input"),d=ParseTags.parseTags(c.val(),true),e=$.inArray(a,d);if(b===undefined)e>=0?d.splice(e,1):d.push(a);else if(b)e==-1&&d.push(a);else e>=0&&d.splice(e,1);d=ParseTags.unparseTags(d);if(d.length)d+=" ";c.val(d);D(c[0]);r()}function r(){var a=$("#diigobm-tag-input"),b=ParseTags.parseTags(a.val(),true);$("#tag-cloud-container").find(".Diigo-Bookmark-Tag-item").each(function(){var c=$(this),d=c.text();$.inArray(d,b)!=-1?c.addClass("selected"):
c.removeClass("selected")});$("#diigobm-recent-tag, #diigobm-recommend-tag, #diigobm-group-tag").find(".diigo-tag").each(function(){var c=$(this),d=c.text();console.log(d,b);$.inArray(d,b)!=-1?c.addClass("selected"):c.removeClass("selected")})}function D(a){var b=a.value.length;setTimeout(function(){a.focus();if(a.createTextRange){var c=a.createTextRange();c.move("character",b);c.select()}else if(a.selectionStart>=0){a.focus();a.setSelectionRange(b,b)}},13)}function o(a,b){for(var c=document.createDocumentFragment(),
d=0;d<b.length;d++){var e=document.createElement("div");e.className="diigo-tag";e.innerText=b[d];$(e).toggleClass("selected",$.inArray(b[d],g.bm.tags)>=0).toggleClass("inused",$.inArray(b[d],g.mytag)>=0);c.appendChild(e)}if(a=="recommended")$(c).appendTo($("#diigobm-recommend-tag").show());else if(a=="group"){$("#diigobm-group-tag").find(".loading").hide();$("#diigobm-group-tag").find(".diigo-tag").remove();$(c).appendTo($("#diigobm-group-tag"))}}function E(a){return some(g.bm.lists,function(b){return b.id==
a})}function F(a){return some(g.bm.groups,function(b){return b.name==a})}function v(a){return/^(https|http|ftp|rtsp|mms)+:\/\//.test(a)?true:false}function w(){var a=true,b=$("#diigobm-url-input").val();if($("#diigobm-title-input").val().match(/^\s*$/)){a=false;$("#diigobm-title").find(".diigo-alert-tip").show()}if(!v(b)||b.match(/^\s*$/))if(a==true){a=false;$("#diigobm-url").find(".diigo-alert-tip").show()}if(a!=false){a={};a.title=$("#diigobm-title-input").val();if(a.title.match(/^\s*$/))a.title=
g.bm.title;a.url=$("#diigobm-url-input").val();if(a.url.match(/^\s*$/)||!v(a.url))a.url=g.bm.url;a.description=$("#diigobm-des-input").val();a.tags=ParseTags.parseTags($("#diigobm-tag-input").val(),true);a.mode=$("#op-private").find(".op-checkbox-container").hasClass("checked")?2:0;a.unread=$("#op-readlater").find(".op-checkbox-container").hasClass("checked")?true:false;b=$("#diigobm-list").find("select").val();a.shareLists=b==-1||b==-2||b==0?[]:[b];b=$("#diigobm-group").find("select").val();a.shareGroups=
b==-1||b==-2||b==0?[]:[b];a.shareAnnotations=$("#Diigo-Bookmark-checkShareExisting").find(".op-checkbox-container").hasClass("checked")?true:false;a.cache=$("#op-cache").find(".op-checkbox-container").hasClass("checked")?true:false;var c={url:a.url,mode:a.mode,title:a.title,tags:a.tags,description:a.description,unread:a.unread,urlId:g.bm.urlId,cache:a.cache,groups:a.shareGroups,shareExistingAnnotations:a.shareAnnotations,lists:a.shareLists};chrome.tabs.getSelected(null,function(d){c.tabId=d.id;x.WebAPI.saveBookmark(c);
window.close()})}}function G(a){var b=[];a.sort(function(j,h){return j.count<=h.count?1:-1});a=a.slice(0,101);var c=a[0].count,d=a.length;a.sort(function(j,h){return j.name.toLowerCase()<=h.name.toLowerCase()?-1:1});for(var e=0;e<d;e++)b[e]=a[e].count;b=arrayUnique(b);d=b.length;b.sort(function(j,h){return j<h?1:-1});var f=Math.ceil(d/10);d=b.slice(1,1+f);e=b.slice(1+f,1+2*f);b=b.slice(1+2*f,1+3*f);return{topTags:a,maxCount:c,first:d,second:e,third:b}}function H(a){if(a.length==0){var b=document.getElementById("tag-cloud-container");
a=document.createElement("div");a.id="no-tag";a.innerHTML="You haven't create any tags yet,:)";b.appendChild(a)}else if(!($("#tag-cloud-container").find("a").length>0)){var c=G(a);b=c.topTags;var d=c.maxCount;a=c.first;var e=c.second,f=c.third,j=b.length;c=document.createDocumentFragment();for(var h=0;h<j;h++){var i=document.createElement("a");i.className="Diigo-Bookmark-Tag-item";i.href="#";i.innerText=b[h].name;var k=b[h].count;if(k==d){i.style.fontSize="20px";i.style.fontWeight="bold"}a.forEach(function(l){if(k==
l){i.style.fontSize="18px";i.style.fontWeight="bold"}});e.forEach(function(l){if(k==l){i.style.fontSize="16px";i.style.fontWeight="bold"}});f.forEach(function(l){if(k==l){i.style.fontSize="16px";i.style.fontWeight="regular"}});c.appendChild(i)}b=document.getElementById("tag-cloud-container");b.appendChild(c);$("#tag-cloud-container").on("click","a",function(l){/Diigo\-Bookmark\-Tag\-item/.test(l.target.className)&&q($(this).text())})}}function s(a){var b=$("#diigobm-list").find("select").empty().unbind().removeClass("processing");
b.append(Utils.dom.buildOne("option",{value:0},["Add to a List"]));b.append(Utils.dom.buildOne("option",{value:-1},[Array(20).join("-")]));$(Utils.dom.buildOne("option",{value:-2},["Create a List..."])).appendTo(b);b.append(Utils.dom.buildOne("option",{value:-1},[Array(20).join("-")]));forEach(a,function(c){b.append(Utils.dom.buildOne("option",{value:c.id},[c.title+(E(c.id)?" (added)":"")]))});b.append(Utils.dom.buildOne("option",{value:-5},[Array(20).join("-")]));$(Utils.dom.buildOne("option",{value:-3},
["Refresh"])).appendTo(b);b.change(function(){var c=b.val();if(c==-2){$("#diigobm-list-add").show();$("#diigobm-list").hide();$("#diigobm-list-addInput").focus();b.val(0)}else if(c==-3){$(this).addClass("processing");chrome.tabs.getSelected(null,function(d){chrome.tabs.sendRequest(d.id,{name:"refreshMyStuff"})});b.val(-1)}});b.val(0).change()}function y(a){var b=$("#diigobm-group").find("select").empty().unbind().removeClass("processing");b.append(Utils.dom.buildOne("option",{value:0},["Share to a Group"]));
b.append(Utils.dom.buildOne("option",{value:-1},[Array(20).join("-")]));$(Utils.dom.buildOne("option",{value:-2},["Create a Group..."])).appendTo(b);b.append(Utils.dom.buildOne("option",{value:-5},[Array(20).join("-")]));forEach(a,function(c){b.append(Utils.dom.buildOne("option",{value:c.name},[c.displayName+(F(c.name)?" (shared)":"")]))});b.append(Utils.dom.buildOne("option",{value:-5},[Array(20).join("-")]));$(Utils.dom.buildOne("option",{value:-3},["Refresh"])).appendTo(b);b.change(function(){var c=
b.val();if(c==-2){chrome.tabs.create({url:"https://groups.diigo.com/create"});b.val(-1)}else if(c==-3){$(this).addClass("processing");chrome.tabs.getSelected(null,function(d){chrome.tabs.sendRequest(d.id,{name:"refreshMyStuff"})});b.val(-1)}if(c!=0&&c!=-1&&c!=-2&&c!=-3){$("#diigosc-group-tag").show();g.isAnnotated&&$("#bottom").find("div:first-child").show();console.log(g);if(g.groupTagsDict[c]!=undefined)o("group",g.groupTagsDict[c]);else{$("#diigobm-group-tag").show();chrome.tabs.getSelected(null,
function(d){chrome.tabs.sendRequest(d.id,{name:"loadGroupTagsDictionary",groupName:c})})}}});b.val(0).change()}function z(a){console.log(a);var b=a.bm;a.generated===true&&$("#onload").hide();if(b.saved==true){$("#remove").show();$("#top-bar>span").text("Edit bookmark")}$("#remove").attr("data-gtooltip","Saved "+b.datetime+". Click to remove");if(b!=undefined){$("#diigobm-title-input").val(b.title);$("#diigobm-url-input").val(b.url)}else chrome.tabs.getSelected(function(f){$("#diigobm-title-input").val(f.title);
$("#diigobm-url-input").val(f.url)});b.mode==2&&$("#op-private").find(".op-checkbox-container").addClass("checked");b.unread==true&&$("#op-readlater").find(".op-checkbox-container").addClass("checked");if(b.description.length>0)$("#diigobm-des-input").text(b.description);else a.selection&&$("#diigobm-des-input").text('"'+a.selection+'"');b=ParseTags.unparseTags(b.tags);console.log(b);blank(b)||$("#diigobm-tag-input").val(b+" ");s(a.lists);y(a.groups);b=a.lastUsedTags;if($("#diigobm-recent-tag").find(".diigo-tag").length==
0)if(b.length>0){for(var c=document.createDocumentFragment(),d=0;d<b.length;d++){var e=document.createElement("div");e.className="diigo-tag";e.innerText=b[d];c.appendChild(e)}$("#diigobm-recent-tag").append(c)}else $("#diigobm-recent-tag").hide();r();$("#diigobm-recommend-tag").find(".diigo-tag").length==0&&chrome.tabs.getSelected(null,function(f){chrome.tabs.sendRequest(f.id,{name:"getRecommendedTags"})});H(a.myTagsWithCount)}function I(){$("#search-input").on("keydown",function(e){if(e.which==13){e=
$("#search-input").val();A(e)}});$("#search-btn").on("click",function(){var e=$("#search-input").val();A(e)});$("#viewAllLink").on("click",function(){var e="https://www.diigo.com/search?adSScope=my&what="+encodeURIComponent($("#search-input").val());chrome.tabs.create({url:e})});$("#recent-result-tab").on("click",".result-link",function(){$(".result-link").removeClass("current");$(this).addClass("current");t($(this).attr("id"))});$("#recent-result-iframe").load(function(){$("#recent-result-tab-loading").hide()});
$("#search-result-iframe").load(function(){$("#search-result-main").show();$("#search-result-loading").hide()});$("#backLink").off("click").on("click",function(){u("recent")});var a=JSON.parse(localStorage.lastSearch);if(a.tab=="recent")B("recent");else a.tab=="search"&&B("search",a.key);a=x.GlobalData.myTags;for(var b=[],c=0;c<a.length;c++)b.push(a[c]);b=removeFromArray("no_tag",b);console.log(b);a={resultsClass:"diigolet ac_results ac_search",data:b,mode:"multiple",multipleSeparator:" ,",id:"diigolet-ac",
moveToSelect:true};try{new AutoComplete("#search-input",a)}catch(d){debug(d)}}function t(a){$("#recent-result-tab-loading").show();if(a=="recentTab")$("#recent-result-iframe").attr({src:"https://www.diigo.com/chrome/items"});else a=="unreadTab"&&$("#recent-result-iframe").attr({src:"https://www.diigo.com/chrome/items?read=no"})}function u(a){if(a==="recent"){$("#search-input").val("");$("#recent-result").addClass("current rotateSlideIn-r");$("#search-result").addClass("rotateSlideOut-r");t("recentTab");
localStorage.lastSearch=JSON.stringify({tab:"recent",key:"null"});setTimeout(function(){$(".tab").removeClass("rotateSlideIn-r rotateSlideOut-r");$("#search-result").removeClass("current")},1E3)}else if(a==="search"){$("#search-result").addClass("current rotateSlideIn-l");$("#recent-result").addClass("rotateSlideOut-l");setTimeout(function(){$(".tab").removeClass("rotateSlideIn-l rotateSlideOut-l");$("#recent-result").removeClass("current")},1E3)}}function B(a,b){if(a=="recent"){$("#recent-result").addClass("current");
$("#search-result").removeClass("current");t("recentTab")}else if(a=="search"){$("#recent-result").removeClass("current");$("#search-result").addClass("current");$("#search-result-main").hide();$("#search-result-loading").show();$("#search-input").val(b);var c="https://www.diigo.com/chrome/meta?what="+encodeURIComponent(b);$("#viewAllLink").attr("data-href","https://www.diigo.com/search?adSScope=my&what="+encodeURIComponent(b));$("#search-result-iframe").attr({src:c})}}function A(a){if(a=="")$("#recent-result").hasClass("current")||
u("recent");else{$("#search-result").hasClass("current")||u("search");localStorage.lastSearch=JSON.stringify({tab:"search",key:a});$("#search-result-main").hide();$("#search-result-loading").show();var b="https://www.diigo.com/chrome/meta?what="+encodeURIComponent(a);$("#viewAllLink").attr("data-href","https://www.diigo.com/search?adSScope=my&what="+encodeURIComponent(a));$("#search-result-iframe").attr({src:b})}}function C(){var a=navigator.userAgent.toLowerCase(),b=a.indexOf("macintosh")!=-1||a.indexOf("mac os x")!=
-1;if(b){$("#diigobm-url").addClass("mac");$("#list-group select").css("text-indent","7px")}else $("#diigobm-url").addClass("win");$("#link-icon").on("click",function(){var f=$("#diigobm-url");if(b)f.toggleClass("mac-unfold");else f.hasClass("unfold")?f.addClass("fold").removeClass("unfold"):f.addClass("unfold").removeClass("fold")}).Gtooltip({position:"top"});$("#diigobm-title-input,#diigobm-url-input").on("focus",function(){$(this).parent().find(".diigo-alert-tip").hide()}).on("input",function(){$(this).parent().find(".diigo-alert-tip").hide()});
$("#diigobm-tag-dropdown").on("click",function(){$(this).toggleClass("cloud");if($("#tag-cloud").css("display")=="none"){$("#tag-suggestion").hide();$("#tag-cloud").show()}else{$("#tag-suggestion").show();$("#tag-cloud").hide()}});$("#diigobm-recent-tag").on("click","a",function(){$("#diigobm-recent-tag").find(".diigo-tag").each(function(){q($(this).addClass("selected").text(),true)})});$("#diigobm-options,#Diigo-Bookmark-checkShareExisting").on("click",".op-checkbox-container",function(){$(this).toggleClass("checked")});
$("#diigobm-title-input,#diigobm-des-input,#diigobm-tag-input").on("focus",function(){$(this).parent().addClass("focus")}).on("blur",function(){$(this).parent().removeClass("focus")});$("#bm-main").on("keydown",function(f){if(f.keyCode==13){if(f.target.tagName.toLowerCase()!="textarea"||f.ctrlKey)w()}else f.keyCode==27&&window.close()});$("#op-cache").find(".op-checkbox-container").removeClass("checked");$("#remove").Gtooltip();a=[];g.myTagsWithCount.sort(function(f,j){return f.count<=j.count?1:-1});
for(var c=g.myTagsWithCount.length,d=0;d<c;d++)a[d]=g.myTagsWithCount[d].name;a={resultsClass:"diigolet ac_results",data:a,mode:"multiple",multipleSeparator:" ,",id:"diigolet-ac"};try{new AutoComplete("#diigobm-tag-input",a)}catch(e){debug(e)}$("#diigobm-tag-input").bind("input",function(){r()});$("#diigobm-list-addInput").on("focus",function(){$("#diigobm-list-add .diigo-alert-tip").hide()});$("#diigobm-list-addBtn").on("click",function(){if(!$(this).hasClass("processing")){var f=$("#diigobm-list-addInput").val(),
j=$("#diigobm-list-add .diigo-alert-tip"),h=[],i=g.lists.length,k;for(k=0;k<i;k++)h.push(g.lists[k].title);console.log(h,$.inArray(f,h));if(f.match(/^\s*$/))j.show().find("span").text("Input a name");else if($.inArray(f,h)!==-1)j.show().find("span").text("Name exsited !");else{$(this).addClass("processing");chrome.tabs.getSelected(null,function(l){chrome.tabs.sendRequest(l.id,{name:"createList",data:f})})}}});$("#diigobm-list-addCancel").on("click",function(){$("#diigobm-list-add .diigo-alert-tip").hide();
$("#diigobm-list-add").hide();$("#diigobm-list").show();$("#diigobm-list-addInput").val("")});$("#diigobm-recent-tag,#diigobm-recommend-tag,#diigobm-group-tag").on("click","div",function(f){/diigo\-tag/.test(f.target.className)&&q($(this).text())});$("#bottom").on("click",function(f){switch(f.target.id){case "diigobm-saveBtn":w();break;case "diigobm-cancelBtn":window.close();break}});$("#diigobm-tag-input").focus()}function n(a){chrome.tabs.executeScript(a,{file:"js/checkTab.js"},function(){debug("executeScript callback")})}
var g={groupTagsDict:{}},m,x=chrome.extension.getBackgroundPage();chrome.tabs.getSelected(window.id,function(a){chrome.browserAction.getBadgeText({tabId:a.id},function(b){if(b=="New"){chrome.browserAction.setBadgeText({text:""});chrome.tabs.create({url:"https://www.diigo.com/extension/chrome/new.html"});localStorage.isClickedOnNew="true";window.close()}})});chrome.cookies.get({url:"https://www.diigo.com",name:"diigoandlogincookie"},function(a){if(a){console.log(a);(m=a.value.split("-.-")[1])&&$("#sign-out-btn").text("Sign Out ("+
m+")");$("#action a").click(function(b){var c;b=b.target.id;if(b!="more"){if(b)switch(b){case "home":c="https://www.diigo.com/user/"+m;break;case "unread":c="https://www.diigo.com/user/"+m+"?type=bookmark&read=no";break;case "my-network":c="https://www.diigo.com/network/"+m;break;case "my-groups":c="https://groups.diigo.com/user/"+m;break;case "option":c=chrome.extension.getURL("");c+="options.html";break;case "changelog":c="https://www.diigo.com/extension/chrome/new.html";break;case "sign-out-btn":c=
"https://www.diigo.com/sign-out";break}chrome.tabs.getSelected(null,function(d){chrome.tabs.create({url:c,index:d.index+1})})}});$("#main").show();chrome.tabs.getSelected(null,function(b){var c=b.url;if(c.match(/https?:\/\/*\/*/gi)==null||c.match(/https:\/\/chrome.google.com\/extensions/i)||!/http|https|file|ftp/.test(c.slice(0,5)))$("ul").addClass("disabled").find("li").off("click");else{chrome.tabs.sendRequest(b.id,{name:"ifbookmark"});console.log("ifbookmark")}})}else $("#sign-in").show()});chrome.extension.onRequest.addListener(function(a,
b){if(a.name=="isSaved"){var c=a.data;if(c.saved===true){$("#bookmark-save").text("Edit").addClass("saved");$("#cached").show().bind("click",function(){chrome.tabs.getSelected(null,function(d){var e="https://www.diigo.com/cached?url="+encodeURIComponent(d.url);chrome.tabs.create({url:e,index:d.index+1})})})}c.unread===true&&$("#read-later").addClass("unread").text("Mark as Read")}else if(a.name=="sendCtx"){console.log("sendCtx",a.data);chrome.tabs.getSelected(null,function(d){console.log(b.tab.id,
d.id,b);if(b.tab.id==d.id){g=$.extend(g,a.data);p(a.data)}})}else if(a.name=="sendRetags"){console.log(a.data);o("recommended",a.data)}else if(a.name=="sendGtags"){console.log(a.data);o("group",a.data)}else if(a.name=="popupclose")window.close();else if(a.name=="shownew")window.close();else if(a.name=="updateLists")s(a.data);else if(a.name=="updateGroups")y(a.data);else if(a.name=="updateGroupTag"){g.groupTagsDict=a.data;c=$("#diigobm-group").find("select").val();console.log(c);o("group",g.groupTagsDict[c])}else if(a.name==
"listCreateSuccessAndUpdateLists"){s(a.lists);c=a.newlist;$("#diigobm-list").find("select").find("option[value="+c+"]").attr("selected",true);$("#diigobm-list-addBtn").removeClass("processing");$("#diigobm-list-addInput").val("");$("#diigobm-list-add").hide();$("#diigobm-list").show()}else a.name=="listCreateFailureAndUpdateLists"&&$("#diigobm-list-addBtn").removeClass("processing")});$("#sign-in-btn").click(function(){window.open("https://www.diigo.com/sign-in?referInfo="+encodeURIComponent("/images/diigo-logo.png#SIGNED_IN"))});
$("#sign-up-btn").click(function(){var a="https://www.diigo.com/account/thirdparty/openid?openid_url=https://www.google.com/accounts/o8/id&redirect_url="+encodeURIComponent("https://www.diigo.com/chrome_diigo_extension_done")+"&request_from=chrome_diigo_extension";window.open(a)});$("#bookmark").on("click","div",function(a){switch(a.target.id){case "bookmark-save":chrome.tabs.getSelected(null,function(b){n(b.id);$("#main").hide();$("#bm-main").show();chrome.tabs.sendRequest(b.id,{name:"makeSnapshot"});
C();z(g)});break;case "bookmark-annotate":chrome.extension.sendRequest({name:"showToolbar"});window.close();break}});$("#bookmark-annotate").hover(function(){$(this).parent().addClass("annotate-hover")},function(){$(this).parent().removeClass("annotate-hover")});$("#bookmark-save").hover(function(){$(this).parent().addClass("tag-hover")},function(){$(this).parent().removeClass("tag-hover")});$("li").on("click","b",function(){$(this).parent().trigger("click")});$("ul").on("click","li",function(a){switch(a.target.id){case "save-bookmark":chrome.tabs.getSelected(null,
function(b){n(b.id);$("#main").hide();$("#bm-main").show();chrome.tabs.getSelected(null,function(c){chrome.tabs.sendRequest(c.id,{name:"makeSnapshot"})});C();z(g)});break;case "read-later":chrome.tabs.getSelected(null,function(b){n(b.id);var c=$("#read-later").hasClass("unread")?true:false;chrome.tabs.sendRequest(b.id,{name:"readlater",ifUnread:c});console.log("readlater");window.close()});break;case "screenshot":chrome.tabs.getSelected(null,function(b){n(b.id);chrome.tabs.sendRequest(b.id,{name:"screenshot"});
window.close();console.log("send")});break;case "share":chrome.tabs.getSelected(null,function(b){n(b.id);chrome.tabs.sendRequest(b.id,{name:"share"});window.close()});break;case "search":$("#main").hide();$("#search-main").show();I();window.addEventListener("message",function(b){console.log(b.data.action);var c=b.data.action;if(c=="openUrl"){var d=b.data.url;chrome.tabs.getSelected(null,function(e){chrome.tabs.sendRequest(e.id,{name:"redirect",url:d})})}else if(c=="searchTag"){b=b.data.tag.indexOf(" ")!=
-1?'#"'+b.data.tag+'"':"#"+b.data.tag;$("#search-input").val(b);$("#search-btn").trigger("click")}},false);break}});$("#action #more").on("click",function(){$(this).toggleClass("unfold")});$("#tag-edit").on("click",function(){chrome.tabs.create({url:"https://www.diigo.com/cloud/"+m})});$("#remove").on("click",function(){chrome.tabs.getSelected(null,function(a){chrome.tabs.sendRequest(a.id,{name:"qdeletebookmark"});window.close()})})});
