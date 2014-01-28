/* 
Smart zoom!
Randall Farmer (zoomextension at GMail)
Context menu support by Sethaurus (henry at ironi nospam dot st)
Public domain, 2010-11
No warranty

Tap Shift, then click a column of text to zoom in on it, and/or press +/-/0 to adjust the font size. Esc unzooms.

Changes:
0.1.1   Change shortcut from 'z' to tapping Shift.
0.1.2   Stop interpreting tab switches as Shift taps on Mac.
0.1.3   Silly, but don't interpret shift-click as Shift tap.
0.1.4   Ignore Shift-Ctrl and Shift-Alt as well as Shift-Cmd.
0.1.5   Tapping Shift a second time will cancel zoom operation.
        (Wanted to reserve double-tap for something else, but want to 
        cancel often enough that it needs to be quick.)
0.1.6   Link hover effects/pointers suppressed while zooming
        Rect follows as you scroll around
        Quit ignoring Shift taps in plugins
        Quit ignoring Shift taps in forms as long as no content entered
        Ignore Shift tap while zoomed
        Removed 32x32 icon
        Prettier rect: maroon border and shadow to make it pop
0.1.7   Context menu support from Sethaurus

0.1.8 hopes
        Fix bad scroll pos zooming in on content far down the page
        Same fix helps some page layouts w/margin: auto+width: 100%
        Unzoom to top screen of page, or put the previously zoomed area in the center of the viewport
        Avoid zooming in on narrow columns <350px
        Blacklist paths (google.com/calendar) as well as domains

Hopes and dreams:
0.2     Organize code and fix resulting bugs 
0.3     Add BG page and features needing it (iframe zoom, CSS rewriting)
0.4     More ways to zoom
            - Zoomy zoom
            - Keyboard zoom; heuristics for a good first guess
0.5     Try for sentience
            - Auto font zoom
            - Text only
            - User-controlled options.  Whitelist?
0.6     Eek:  Fat links?  Help popup?


TODO:
    Better fidelity to zoom rect.  Compare highlighted elem. dimensions before and after zoom; adjust new scrollLeft/scrollTop based on that.
    Unzoom: stick zoomed area to bottom then center of screen, not top.
    Escape and repeat Shift being ignored
    Blacklist apps under www.google.com.
    Min/max for ZR size.
        Simple:
            If the original is <350
                Move up the DOM seeking something in 350-700 range
                If you get nothing, 500px rect including the biggest one <500px
            If the original is >700
                Take it
        
        // Try not to get fooled into thinking icons and tiny images
        // are "narrow columns"
        var loc = locate(e);
        while ( loc.width < 75 ) {
            e = e.parentNode;
            loc = locate(e);
        }
        // Step up from possibly-narrow column until you reach min width
        var initial = e;
        var loc = locate(e);
        var initial_loc = loc;
        while ( e.width < 350 ) {
            e = e.parentNode;
            loc = locate(e);
        }
        // TODO: enclose whole element if width still <700?
        // TODO: step up by small increments like now
        
        // Special case: if original column was narrow, but we stepped 
        // up to something huge (possibly the whole page), use 500px
        // instead of the page width.  Handy for narrow sidebars on some 
        // pages.
        if ( initial_loc.width < 350 && loc.width > 700 ) {
            e = initial;
            loc = initial_loc;
            // Expand rect towards center
            if ( loc.x > window.innerWidth / 2 )
                loc.x -= 500 - loc.width;
            loc.width = 500;
        }
        
        Orthogonal to that, you could try to step up the DOM for a tall column like we step up for slightly larger enclosing blocks now.  Would hep on the Google results page, would send you straight to full page for wide, squat navbars (we could just ignore).
        
        Complicated (includes snapping to height):
            - If initial column is >500 it's the winner
            - If col is <300, you can:
                - Extend to 300 going towards center
                    (Not bad for Facebook toolbar, many sidebars)
                - Extend to height going towards center
                    (Not bad for Wiki images and infoboxes)
                - Move up the DOM
                    (Not bad for NYT homepage -- 546px)
            - If it's 300-500:
                - Move up the DOM and only take the choice if it's 
                  closer to 500 than the initial col.
                    (Not bad for links on Slatest entries)
            - Whenever there are multiple choices, pick the one nearest 500px

    Fix Facebook dyn elements zoom.

Message passing design
    Zooming "broadcasts" a message to all frames in this tab -- figure out how to do that(!)
    If that works, set document.documentElement.style.zoom across all frames and doResizeText across all frames
    Try CSS tweaker
        Get text via XMLHTTP in BG page
        Create disabled <style> tags
        Extract rules with font-size
        Dump them all in a new stylesheet, remove the old
        Modify fixed font sizes in the new stylesheet
        Possible that some pages do funky things such that repeating the rules will mess things up.  Tough? 

Known problem areas that might be improved:

* The keyboard shortcuts could be better designed
* Zoom-in rectangle isn't always positioned sensibly.
* Font resizing doesn't happen until all content is loaded and doesn't apply to dynamic content.  (Can't fully fix this but can improve what we have: munge CSS rules and/or enforce a minimum size on DOMNodeInserted.)
* Zoom out is jarring -- the top line of text stays in place, when it should be the center or the mouse pointer that stays in place.

Problems that probably won't get fixed:

* Doesn't work with many dynamic web applications like GMail.
* Doesn't integrate with Chrome's full-page zoom.
* Zoom rectangle doesn't respond when mouse pointer is over Flash.

Feature ideas

* Keyboard nav -- I'm imagining tricks with elementFromPoint
* Configurable keystrokes, escape hatch to detach handlers if our 
  shortcuts conflict with the app's.
* Bookmarklet version
    * Click bookmarklet, click page, you're zoomed
* Readability tie-in
    * Smart zoom -- Shift, Z zooms in on best guess
    * Autozoom by domain
    * Text-only -- T to click and render text-only, TT to use best guess
    * Auto-text-only by domain
* More settings and CSS overrides
    * Fonts and colors

Lower-priority bugs

* Fn+Shift+function key -- my key combo to raise/lower volume without making a noise -- counts as a shift tap.  There seem to be no events fired that'd distinguish it from one.  O well.
* The code is just ugly.
    * Use a class instead of globals
    * Name things better
        * top and left instead of x and y
        * descriptive var and method names (e.g., no cumulativeFactor)
    * Do what's standard/proper (e.g., no implicit "window.")
    * Reduce repetition/verbosity, including unneeded arithmetic.
* Maybe it should be possible to zoom after already zoomed.  There's code for this, but it's buggy.
    * If zoom rect nearly encloses viewport, it should just set scale=1
    * measurementIsBroken hack is slow -- maybe we can reverse enginer what Chrome does wrong when there's full page zoom + body zoom.
    * Facebook news feed is an example of where it wants to zoom twice
* Could detect more pages where it's likely to fail and punt.
* +/-/0 don't work before page DOM is ready.

This code is public domain; the extension icon is the GNOME searchtool icon, covered by the LGPL:

    This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option) any later version. This library is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose. See the GNU Lesser General Public License for more details.
    http://www.gnu.org/licenses/lgpl-3.0.txt

*/

(function() {

// Punt on some popular apps where it doesn't work anyway -- iframes, 
// or stuff is positioned relative to the window, or both
var domainBlacklist = /\b(gmail\.com|(reader|books|docs|voice|wave|calendar|picasaweb|maps|sites|mail)\.google\.com|(mail|office)\.live\.com|mail\.yahoo\.com|orkut\.com|zoho\.com)$/i;

// Enable to use -webkit-transform scale instead of zoom
var doScale = false;

if (domainBlacklist.test(window.location.host)
    && !/testZoomExtension=1/.test(window.location) ) {
    console.log('Zoom disabled on ' + window.location.host)
    return;
}

var body = document.body;
var target = undefined;
var highlighted = undefined;
var isZoomMode = false;
var justZoomed = false;

var overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.zIndex = 2000000000;
overlay.style.border = 'solid maroon 3px';
overlay.style.backgroundColor = 'rgba(0,0,255,0.2)';
overlay.style.opacity = 0.5;
overlay.style.webkitBoxShadow = '5px 5px 5px black';
// Distinctive, but doesn't scream "click to magnify".
// Really says "drag me" more than anything.
//overlay.style.cursor = 'all-scroll';
overlay.style.webkitTransition = 'opacity 0.25s, top 0.2s, left 0.2s, height 0.2s, width 0.2s';

// Determines if we're affected by bug with fullpage zoom + style.zoom
var measuringStick = document.createElement('div');
measuringStick.style.display='none';
measuringStick.style.width='1000px';

// -webkit-transform scale won't adjust scrollbars on its own
var expander = document.createElement('div');
expander.style.position = 'absolute';
expander.style.height = expander.style.width = '0px';

function closest(e, filter) {
    while (e) {
        if (filter(e)) return e;
        e = e.parentNode;
    }
}
function isBlock(e) {
    // Torn between trying not to zoom in on tiny things (narrow columns 
    // of headines below the fold on nytimes.com) and trying to zoom in 
    // on some narrowish sidebars (e.g., Facebook's)
    // 
    // Phone browsers have it easy -- you can pinch to zoom if they get 
    // it wrong!
    // 
    // Providing shortcuts to move up/down the block hierarchy would be
    // hot.
    // 
    // For folks that use this heavily, something like "preferred zoom 
    // factor" would be ideal.
    return (
        /block|table/i.test(document.defaultView.getComputedStyle(e).display) 
        && e.offsetWidth > 130
    );
}
var currentScale = 1;
function placeOverlay(x, y, width, height) {
    if (!overlay.parentNode) body.appendChild(overlay);
    overlay.style.left = x + 'px';
    overlay.style.top = y + 'px';
    overlay.style.width = width + 'px';
    overlay.style.height = height + 'px';
    if ( overlay.style.opacity == 0 ) {
        overlay.style.display='block';
        overlay.style.opacity = 0.5;
        overlay.style.pointerEvents='auto';
    }
}
function hideOverlay() {
    if ( overlay.style.opacity > 0 ) {
        overlay.style.opacity = 0;
        overlay.style.pointerEvents='none';
    }
}
function locate(e, applyScrollOffsets) {
    //var boundaries = e.getBoundingClientRect()
    var result = {
        x: e.offsetLeft,
        y: e.offsetTop,
        scrollX: e.scrollLeft,
        scrollY: e.scrollTop,        
        width: e.offsetWidth,
        height: e.offsetHeight
    }
    if ( e.offsetParent ) {
        var parentLoc = locate(e.offsetParent);
        result.x += parentLoc.x;// - parentLoc.scrollX;
        result.y += parentLoc.y;// - parentLoc.scrollY;
    }
    return result;
}
function encloses(a, b) { // a encloses b
    // DOM-encloses doesn't mean physically encloses if there's
    // relative positioning
    locA = locate(a);
    locB = locate(b);
    return ( locA.x <= locB.x
             && locA.y <= locB.y
             && locA.x+locA.width >= locB.x+locB.width
             && locA.y+locA.height >= locB.y+locB.height );
}

// This is only relevant to re-zooming, which is disabled.  But
// Chrome's measurements suddenly change when both docElem.style.zoom
// and full-page zoom are applied.  Detect it so we can temporarily set 
// zoom=1 to work around.
function measurementIsBroken() {
    if ( !measuringStick.parentNode ) 
        body.appendChild(measuringStick);
    return (document.documentElement.style.zoom
            && document.documentElement.style.zoom != 1
            && parseInt(getComputedStyle(measuringStick).width) != 1000);
}
function fullPageZoomFactor() {
    if ( !measuringStick.parentNode ) 
        body.appendChild(measuringStick);
    return parseFloat(getComputedStyle(measuringStick).width)/1000;
}
var posX, posY, fromX, fromY, areaWidth, areaHeight;
function scaleOut() {
    var currentX = body.scrollLeft/currentScale;
    var currentY = body.scrollTop/currentScale;
    fromX = currentX;
    if ( fromX < 0 ) fromX = 0;
    fromY = currentY;
    if ( fromY < 0 ) fromY = 0;
    areaWidth = window.innerWidth;
    areaHeight = window.innerHeight;
    hideOverlay();
}
var loaded, cumulativeFactor = 1;
var keyUp = function(e) {
    if ( !body && document.body ) body = document.body;
    var ae = document.activeElement;
    if ( ae
         && textEntered
         && ( (ae.contentEditable && !/false/i.test(ae.contentEditable))
              || /^(textarea|input|select|applet)$/i.test(ae.tagName) ) ) {
        return;
    }
    
    // Shift released: enter zoom mode
    if ( e.keyIdentifier == 'Shift' 
         && !(e.metaKey || e.ctrlKey || e.altKey)
         && possibleShiftTap ) {
        possibleShiftTap = false;
        isZoomMode = !isZoomMode;
        if ( currentScale > 1 )
            isZoomMode = 0;
        if ( isZoomMode )
            doMouseMove(e, true);
        else
            hideOverlay();
    }
    // Esc while zoomed in: zoom out
    else if ( currentScale > 1
              && e.keyCode == 27 ) {
        isZoomMode = true;
        doZoom();
    }
    // Font size shortcuts instead of/after zooming
    else if ( 
        ( isZoomMode || justZoomed )
        && /^U\+00(2B|5F|29|BB|BD|30|3D|2D)$/.test(e.keyIdentifier) 
    ) {
        var enlarge = /U\+00(BB|2B|3D)/.test(e.keyIdentifier);
        var reset = /U\+00(29|30)/.test(e.keyIdentifier);
        if ( reset )
            return doResizeText(null, 1/cumulativeFactor);
        else
            doResizeText(enlarge);
        isZoomMode = false;
        justZoomed = true;
        hideOverlay();
        e.stopPropagation();
        e.preventDefault();
        return false;
    }
    // `: Get extension out of the way
    else if ( /^U\+00(60|7E|C0)$/.test(e.keyIdentifier) ) {
        tearDown();
        e.stopPropagation();
        e.preventDefault();
        return false;
    }
    // Most other keys: exit zoom mode
    else if ( /^(Meta|Ctrl|Alt|U\+)/.test(e.keyIdentifier) ) {
        possibleShiftTap = false;
        textEntered = true;
        // Space/Shift+Space needn't cancel zoom mode
        if ( !/^(U\+0020)$/.test(e.keyIdentifier) ) {
            hideOverlay();
            isZoomMode = false;
            justZoomed = false;
        }
    }
    if ( isZoomMode )
        doMouseMove(e, true);
}
window.addEventListener('scroll', function(e) {
    if ( isZoomMode )
        doMouseMove(e, true);
});
var textEntered = false;
var possibleShiftTap = false;
var keyDown = function(e) {
    if ( e.keyIdentifier == 'Shift' )
        possibleShiftTap = true;
    else
        possibleShiftTap = false;
}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
var mouseDown = function(e) {
    possibleShiftTap = false;
}
document.addEventListener('mousedown', mouseDown);
function doResizeText(enlarge, specificFactor, elements) {
    // If DOM isn't finished loading, don't resize half
    // the content.
    if (!loaded) return;

    var factor = enlarge ? 1.1 : 1/1.1;
    if ( specificFactor ) factor = specificFactor;

    // If there's a rounding error zoom factor stored, ignore it.
    // (Mostly useful in my debugging.)
    if ( factor > .97 && factor < 1.03 ) 
        factor = 1;
    cumulativeFactor *= factor;

    // And if we're resizing back to 100% and have a rounding
    // error, store it as 1.
    if ( cumulativeFactor > .97 && cumulativeFactor < 1.03 ) 
        cumulativeFactor = 1;
    window.localStorage.fontSizeZoomFactor = cumulativeFactor;
    
    // And don't futz with all these font sizes if we don't 
    // need to.
    if ( factor == 1 && !elements )
        return;
    
    var effectiveFactor = factor / fullPageZoomFactor();

    if (!elements)
        elements = document.getElementsByTagName('*');

    // Changing one element's size can indirectly change 
    // children's sizes.  So capture all sizes, then set
    // them all in a second pass
    var sizes = [];
    for ( var i = 0; i < elements.length; ++i ) {
        var size = getComputedStyle(elements[i]).fontSize;
        if (!size) {
            sizes.push('');
            continue;
        }
        // computedStyle returns px for me, but if it doesn't 
        // someday, punt.
        if (!/px/.test(size)) return;
        sizes.push(
            (parseFloat(size)
             * effectiveFactor) + 'px'
        )
    }
            
    for ( var i = 0; i < elements.length; ++i )
        elements[i].style.fontSize =
            sizes[i];
}
var curX, curY, curTop, curLeft, loc;
function doMouseMove(e, isFake) {
    if ( !isFake ) {
        curX = e.pageX;
        curY = e.pageY;
        if ( !body && document.body ) body = document.body;
        curLeft = body.scrollLeft;
        curTop = body.scrollTop;
    }
    if ( !isZoomMode ) return;
    // Always zoom out when zoomed in
    if ( currentScale > 1 ) return scaleOut();
    if ( !(curX||curY) ) return;
    if ( !body && document.body ) body = document.body;
    // Adjust x/y if page was scrolled since mouse was moved
    if ( isFake 
         && (curLeft != body.scrollLeft
             || curTop != body.scrollTop) ) {
        curX += body.scrollLeft - curLeft;
        curY += body.scrollTop - curTop;
        curLeft = body.scrollLeft;
        curTop = body.scrollTop;
    }
    posX = curX / currentScale; 
    posY = curY / currentScale;
    var target;
    overlay.style.pointerEvents='none';
    target = 
        document.elementFromPoint(
            curX-body.scrollLeft,
            curY-body.scrollTop
        );
    overlay.style.pointerEvents='auto';
    
    var highlight = closest(target, isBlock);
    
    // Look for an enclosing node that's up to 100px bigger, repeat
    var highlightWidthThresh = highlight.offsetWidth + 100;
    while ( highlight.parentNode
            && encloses(highlight.parentNode, highlight)
            && highlight.parentNode.offsetWidth < highlightWidthThresh ) {
        highlight = highlight.parentNode;
        highlightWidthThresh = highlight.offsetWidth + 100;
    }
    
    var elemChanged = (highlighted != highlight);
    
    highlighted = highlight;
    loc = locate(highlighted);

    // Calculate location; if it'll require the slow hackaround, only
    // do it when we've changed elements.
    // 
    // Commented out because re-zooming is disabled (see below)
    /*
    var measurementBroken = measurementIsBroken();
    if ( highlighted != highlight || !measurementBroken ) {
        highlighted = highlight;
        var oldZoom;
        if ( measurementBroken ) {
            oldZoom = document.documentElement.style.zoom;
            document.documentElement.style.zoom = 1;
        }
        loc = locate(highlighted);
        if ( measurementBroken )
            document.documentElement.style.zoom = oldZoom;
    }
    */
    
    var height = loc.width*window.innerHeight/window.innerWidth;
    var top = posY - height/2;
    if ( top + height > body.scrollHeight ) top -= top + height - body.scrollHeight;
    if ( top < 0 ) top = 0;
    
    fromX = loc.x - 10;
    fromY = top;
    areaWidth = loc.width + 20;
    areaHeight = height;
    
    var scale = window.innerWidth/areaWidth;
    var currentX = body.scrollLeft/currentScale;
    
    if ( elemChanged )
        console.log(areaWidth);

    // Disabled "smart re-zooming" code.
    // 
    // Are left and zoom near current values?  If so, zooming is useless,
    // so hide the overlay and zoom out if user double-clicks.
    // 
    // This logic isn't proving to be good enough -- it tries to zoom in 
    // on part of the column too often -- so we always zoom out.  Would
    // be nice to rehabilitate it.
    if ( scale < currentScale * 1.1 
      /* && fromX > currentX - 130 
         && fromX < currentX + 130 */)
        return scaleOut();
    placeOverlay(fromX, fromY, areaWidth, areaHeight);
}
window.addEventListener('mousemove', doMouseMove);
var oldDocStyles;
var hiddenFixedElements = [];
function doZoom(e) {
    if ( !isZoomMode ) return;
    isZoomMode = false;
    justZoomed = true;
    if ( !body && document.body ) body = document.body;
    
    // Desired scale
    var scale = window.innerWidth/areaWidth;

    // Keep body dimensions from changing after zoom
    var docElem = document.documentElement;
    var oldDocStyles;
    if ( scale > 1 ) {
        oldDocStyles = {width: docElem.style.width};
        docElem.style.width = docElem.offsetWidth + 'px';
        document.body.overflow = 'scroll';
    }
    else {
        if ( oldDocStyles ) {
            docElem.style.width = oldDocStyles.width;
            oldDocStyles = undefined;
        }
    }

    // Desired scrollTop and scrollLeft -- fromX/fromY
    // Desired body height/width -- offsetH/W * final zoom
    var physHeight = body.offsetHeight * scale;
    var physWidth = body.offsetWidth * scale;
    
    // Fix scrollbars
    //if (!expander.parentNode) body.appendChild(expander);
    //expander.style.top = physHeight + 'px';
    //expander.style.left = physWidth + 'px';

    // Scale body
    if ( doScale ) {
        body.style.webkitTransformOrigin = 'top left';
        body.style.webkitTransform = 'scale(' + scale + ')';
    }
    // Or zoom it
    else {
        document.documentElement.style.zoom = scale;
    }
    currentScale = scale;
    
    window.scrollTo(fromX*scale, fromY*scale);
    
    // Find and hide fixed elements, in a timer so it doesn't delay
    // showing zoomed page (I hope)
    if ( scale > 1 )
        window.setTimeout(function() {
            hiddenFixedElements = [];
            var elements = document.getElementsByTagName('*');
            for ( var i = 0; i < elements.length; ++i ) {
                if (getComputedStyle(elements[i]).position == 'fixed' &&
                    getComputedStyle(elements[i]).display == 'block') {
                    hiddenFixedElements.push(elements[i]);
                    elements[i].style.display = 'none';
                }
            }
        }, 0)
    else
        for ( var i = 0; i < hiddenFixedElements.length; ++i )
            hiddenFixedElements[i].style.display = 'block';
    
    // Hide overlay without transition
    overlay.style.display = 'none';
    overlay.style.opacity = 0;

    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    scaleOut();
    return false;
}
window.addEventListener('click',  doZoom, true);
function loaded() {
    loaded = true;
    body = document.body;
    if ( window.localStorage.fontSizeZoomFactor )
        doResizeText(undefined, window.localStorage.fontSizeZoomFactor);
}
window.addEventListener('DOMContentLoaded', loaded)
function removeListeners() {
    window.removeEventListener('DOMContentLoaded', loaded)
    window.removeEventListener('click',  doZoom, true);
    document.removeEventListener('keyup', keyUp)
    window.removeEventListener('mousemove', doMouseMove);
}
// We've been asked to leave the page alone
function tearDown() {
    // We could unzoom text or set factor to 0
    // Leaving that to the user -- unzooming automatically can mess up
    // the page and may not be user's intent
    if ( currentScale > 1 ) doZoom();
    hideOverlay();
    removeListeners();
}

var ContextMenu = {
	lastEvent: null,
	captureEvent: function(e) {
		ContextMenu.lastEvent = e;
	},
	triggerZoom: function() {
		// Simulate an ordinary zoom at the site of the previous right-click
		isZoomMode = true;
		doMouseMove(ContextMenu.lastEvent, false);
		doZoom(ContextMenu.lastEvent);
	}
};

// When a right-click occurs, store the event in case we need its position
document.addEventListener("contextmenu", ContextMenu.captureEvent);

// When the context menu item is clicked, we will receive an empty request
// from the background page. We should zoom to the position of the last
// recorded right-click event.
chrome.extension.onRequest.addListener(ContextMenu.triggerZoom);
})()
