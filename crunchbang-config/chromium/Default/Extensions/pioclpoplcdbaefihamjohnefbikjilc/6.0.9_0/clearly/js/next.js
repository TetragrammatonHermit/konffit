function initClearlyComponent__next(_paramInstance){if(_paramInstance){}else{return false;}
var $N=_paramInstance;switch(true)
{case(!($N.detectComponentInstance)):case(!($N.callbacks)):case(!($N.callbacks.newPageFound)):return false;}
if($N.settings){}else{$N.settings={};}
var _default=function(_setting,_default_value){if($N.settings[_setting]){}else{$N.settings[_setting]=_default_value;}};_default('onCreateNextPageFramesUseThisIdPrefix','clearly_next_page_frame__');_default('onCreateNextPagesContainerUseThisId','clearly_next_pages_container');_default('onCreateNextPagesContainerDoNotInsertCSS',false);_default('onLoadingNextPageFramesUseThisAttribute','clearly_next_page_loaded');_default('onLoadingNextPageFramesUseThisAttributeValue','yes');var $D=$N.detectComponentInstance;var $=$D.jQuery;$N.window=$D.window;$N.$window=$D.$window;$N.document=$D.document;$N.$document=$D.$document;$N.debug=$D.debug;$N.log=$D.log;$N.debugRemember=$D.debugRemember;$N.debugOutline=$D.debugOutline;$N.debugTimerStart=$D.debugTimerStart;$N.debugTimerEnd=$D.debugTimerEnd;$N.escape_html=$D.escape_html;$N.pages=[];$N.parseOptions={'_next_page_keywords':['next page','next','vorw&#228;rts','weiter','&#27425;&#12408;'],'_next_page_keywords_not':['article','story','post','comment','section','chapter']};$N.createNextPagesContainer=function()
{_container_id=$N.settings.onCreateNextPagesContainerUseThisId;var _containerElement=$N.document.createElement('div');_containerElement.setAttribute('id',_container_id);if($N.settings.onCreateNextPagesContainerDoNotInsertCSS){}else
{var _cssElement=$N.document.createElement('style'),_cssText=''+'#'+_container_id+' { '+'margin: 0; padding: 0; border: none; '+'position: absolute; '+'width: 10px; height: 10px; '+'top: -100px; left: -100px; '+'} '+'#'+_container_id+' iframe { '+'margin: 0; padding: 0; border: none; '+'position: absolute; '+'width: 10px; height: 10px; '+'top: -100px; left: -100px; '+'} '+'';_cssElement.setAttribute('id',_container_id+'__css');_cssElement.setAttribute('type','text/css');if(_cssElement.styleSheet){_cssElement.styleSheet.cssText=_cssText;}
else{_cssElement.appendChild($N.document.createTextNode(_cssText));}}
var _body=$N.document.getElementsByTagName('body')[0];if(_cssElement){_body.appendChild(_cssElement);}
_body.appendChild(_containerElement);$N.nextPages=_containerElement;$N.$nextPages=$($N.nextPages);};$N.getURLPath=function(_url){return _url.substr(_url.indexOf('/',(_url.indexOf('/'+'/')+2)));};$N.getURLDomain=function(_url){return _url.substr(0,_url.indexOf('/',(_url.indexOf('/'+'/')+2)));};$N.nextPage__loadToFrame=function(_pageNr,_nextPageURL)
{$.ajax({'url':_nextPageURL,'type':'GET','dataType':'html','async':true,'timeout':(10*1000),'success':function(_response,_textStatus,_xhr){$N.nextPage__ajaxComplete(_pageNr,_response,_textStatus,_xhr);},'error':function(_xhr,_textStatus,_error){$N.nextPage__ajaxError(_pageNr,_xhr,_textStatus,_error);}});};$N.nextPage__ajaxError=function(_pageNr,_xhr,_textStatus,_error){};$N.nextPage__ajaxComplete=function(_pageNr,_response,_textStatus,_xhr)
{if(_response>''){}else{return;}
var _html=_response;_html=_html.replace(/<\s+/gi,'<');_html=_html.replace(/\s+>/gi,'>');_html=_html.replace(/\s+\/>/gi,'/>');_html=_html.replace(/<script[^>]*?>([\s\S]*?)<\/script>/gi,'');_html=_html.replace(/<script[^>]*?\/>/gi,'');_html=_html.replace(/<noscript[^>]*?>([\s\S]*?)<\/noscript>/gi,'');$N.$nextPages.append(''+'<iframe'+' id="'+$N.escape_html($N.settings.onCreateNextPageFramesUseThisIdPrefix)+$N.escape_html(''+_pageNr)+'"'+' scrolling="no" frameborder="0"'+'></iframe>'+'');var _check_interval=false;var _check=function()
{var _iframe=$N.document.getElementById($N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr);if(_iframe){}else{return;}
var _doc=(_iframe.contentDocument||_iframe.contentWindow.document);if(_doc){}else{return;}
$N.window.clearInterval(_check_interval);$N.$nextPages.find('#'+$N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr).bind('load',function()
{if($N.$nextPages.find('#'+$N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr).attr($N.settings.onLoadingNextPageFramesUseThisAttribute)==$N.settings.onLoadingNextPageFramesUseThisAttributeValue){return;}
var _doc=$N.$nextPages.find('#'+$N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr).contents().get(0);if(_doc){}else{return;}
if((_doc.readyState=='interactive')||(_doc.readyState=='complete')){}else{return;}
$N.$nextPages.find('#'+$N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr).attr($N.settings.onLoadingNextPageFramesUseThisAttribute,$N.settings.onLoadingNextPageFramesUseThisAttributeValue);$N.nextPage__loadedInFrame(_pageNr,_doc.defaultView);});_doc.open();_doc.write(_html);_doc.close();};_check_interval=$N.window.setInterval(_check,50);};$N.nextPage__loadedInFrame=function(_pageNr,_pageWindow)
{var _found=$D.getContent__findInPage(_pageWindow),_foundHTML=_found._html,_removeTitleRegex=new RegExp($D.articleTitleMarker__start+'(.*?)'+$D.articleTitleMarker__end,'i');var _firstFragment=$D.nextPage__getFirstFragment(_foundHTML);switch(true)
{case($D.levenshteinDistance(_firstFragment,$N.nextPage__firstFragment__firstPage)<100):case($D.levenshteinDistance(_firstFragment,$N.nextPage__firstFragment__lastPage)<100):return false;default:$N.nextPage__firstFragment__lastPage=_firstFragment;break;}
_foundHTML=$D.getContent__find__isolateTitleInHTML(_foundHTML,($N.document.title>''?$N.document.title:''));_foundHTML=_foundHTML.replace(_removeTitleRegex,'');_foundHTML=$D.getContent__find__isolateTitleInHTML(_foundHTML,$D.articleTitle);_foundHTML=_foundHTML.replace(_removeTitleRegex,'');var _page={'_url':_pageWindow.location.href,'_html':_foundHTML,'_elements':[_found._targetCandidate.__node]};$N.pages.push(_page);if($N.callbacks.newPageFound){$N.callbacks.newPageFound(_page);}
$N.nextPage__find(_pageWindow,_found._links);return false;};$N.nextPage__find=function(_currentPageWindow,_linksInCurrentPage)
{var _pageNr=($N.pages.length+1);var _possible=[];if(_possible.length>0){}else{_possible=$N.nextPage__find__possible(_currentPageWindow,_linksInCurrentPage,0.5);}
if(_possible.length>0){}else
{if($N.debug){$N.log('no next link found');}return;}
if($N.debug){$N.log('possible next',_possible);}
var _nextLink=false;(function()
{if(_nextLink){return;}
for(var i=0,_i=_possible.length;i<_i;i++)
{for(var j=0,_j=$N.parseOptions._next_page_keywords.length;j<_j;j++)
{if(_possible[i]._caption.indexOf($N.parseOptions._next_page_keywords[j])>-1)
{if(_possible[i]._caption.length>$N.parseOptions._next_page_keywords[j].length*2)
{continue;}
for(var z=0,_z=$N.parseOptions._next_page_keywords_not.length;z<_z;z++)
{if(_possible[i]._caption.indexOf($N.parseOptions._next_page_keywords_not[z])>-1)
{_nextLink=false;return;}}
_nextLink=_possible[i];return;}}}})();(function()
{if(_nextLink){return;}
for(var i=0,_i=_possible.length;i<_i;i++)
{if(_possible[i]._caption==(''+_pageNr))
{_nextLink=_possible[i];return;}}})();(function()
{if(_nextLink){return;}
for(var i=0,_i=_possible.length;i<_i;i++)
{if(_possible[i]._title>''){}else{continue;}
if($D.measureText__getTextLength(_possible[i]._caption)<=2){}else{continue;}
for(var j=0,_j=$N.parseOptions._next_page_keywords.length;j<_j;j++)
{if(_possible[i]._title.indexOf($N.parseOptions._next_page_keywords[j])>-1)
{if(_possible[i]._title.length>$N.parseOptions._next_page_keywords[j].length*2)
{continue;}
for(var z=0,_z=$N.parseOptions._next_page_keywords_not.length;z<_z;z++)
{if(_possible[i]._title.indexOf($N.parseOptions._next_page_keywords_not[z])>-1)
{_nextLink=false;return;}}
_nextLink=_possible[i];return;}}}})();if(_nextLink){}else{return;}
if($N.debug)
{$N.debugOutline(_nextLink._node,'target','next-page');$N.log('NextPage Link',_nextLink,_nextLink._node);}
$N.nextPage__loadToFrame(_pageNr,_nextLink._href);};$N.nextPage__find__possible=function(_currentPageWindow,_linksInCurrentPage,_distanceFactor)
{var _mainPageHref=$N.window.location.href,_mainPageDomain=$N.getURLDomain(_mainPageHref),_mainPagePath=$N.getURLPath(_mainPageHref);var _links=$.map(_linksInCurrentPage,function(_element,_index)
{var _href=_element.__node.href,_path=$N.getURLPath(_href),_title=(_element.__node.title>''?_element.__node.title.toLowerCase():''),_caption=_element.__node.innerHTML.replace(/<[^>]+?>/gi,'').replace(/\&[^\&\s;]{1,10};/gi,'').replace(/\s+/gi,' ').replace(/^ /,'').replace(/ $/,'').toLowerCase(),_distance=$D.levenshteinDistance(_mainPagePath,_path);var _caption2='';for(var i=0,_i=_caption.length,_code=0;i<_i;i++)
{_code=_caption.charCodeAt(i);_caption2+=(_code>127?('&#'+_code+';'):_caption.charAt(i));}
_caption=_caption2;switch(true)
{case(!(_href>'')):case(_mainPageHref.length>_href.length):case(_mainPageDomain!=$N.getURLDomain(_href)):case(_href.substr(_mainPageHref.length).substr(0,1)=='#'):case(_distance>Math.ceil(_distanceFactor*_path.length)):return null;default:for(var i=0,_i=$N.pages.length;i<_i;i++)
{if($N.pages[i]._url==_href){return null;}}
return{'_node':_element.__node,'_href':_href,'_title':_title,'_caption':_caption,'_distance':_distance};}});_links.sort(function(a,b)
{switch(true)
{case(a._distance<b._distance):return-1;case(a._distance>b._distance):return 1;default:return 0;}});return _links;};$N.start=function()
{$N.nextPage__firstFragment__firstPage=$D.nextPage__firstFragment__firstPage;$N.nextPage__firstFragment__lastPage=$D.nextPage__firstFragment__lastPage;$N.pages=[{'_url':$N.window.location.href}];$N.nextPage__find($N.window,$D.nextPage__firstLinks);};return $N;}