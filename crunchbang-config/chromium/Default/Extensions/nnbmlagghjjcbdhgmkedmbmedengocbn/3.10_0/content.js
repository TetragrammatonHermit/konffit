// Copyright 2011 Google Inc. All Rights Reserved.
var DOM_UPDATE_REPROCESS_WAIT_TIME_MS = 1000;  // 1s
var DOM_UPDATE_MAX_WAIT_TIME_MS = 5000;  // 5s
var pattern;
var targetHref;
// Timer used to reprocess the page on updates after a delay.
var linkCheckTimer = undefined;
// If the handleDomUpdate has been called.
var domUpdated = false;
var options;

/**
 * Checks a link to see if it points to a potential gview supported file.
 * If so, adds a mousedown handler to rewrite the link to point at the Docs
 * Viewer.
 */
function checkLink() {
  var href = this.href;
  if (pattern.test(href)) {
    // Rewrite link
    var docLink = getViewerUrl(href);
    // Set a wrapping OnMouseDown to change the href url before the link is
    // loaded by the browser.
    // We defer manipulating the url until click time as doing it sooner can
    // interfer with other things that may be using the url verbatim.
    var prevOnMouseDown = this.onmousedown ? this.onmousedown : function () {}
    this.onmousedown = function(e) {
      prevOnMouseDown(e);
      // Only trigger on left click.
      if (e.button == 0) {
        this.href = docLink;
      }
    }
  }
};

// Process links if there have been no dom updates.  Otherwise wait and repeat.
// We will get a lot of calls due to DOMSubtreeModified, so we want to not
// reprocess the whole page repeatedly amongst updates.
// opt_delayStart is the time we originally started a delayed processing cycle.
function processLinksOrDelay(opt_delayStart) {
  var elapsed_time = opt_delayStart ?
      (new Date().getTime()) - opt_delayStart : 0;
  // If there are no dom updates or we've delayed long enough then reprocess
  // the page.
  if (!domUpdated || elapsed_time > DOM_UPDATE_MAX_WAIT_TIME_MS) {
    clearTimeout(linkCheckTimer);
    linkCheckTimer = undefined;
    $('a').each(checkLink);
  } else if (linkCheckTimer == undefined || opt_delayStart) {
    // There have been updates, so if no timer is set or we previously delayed
    // then delay again.
    var time = opt_delayStart || new Date().getTime();
    clearTimeout(linkCheckTimer);
    linkCheckTimer = setTimeout(function() { processLinksOrDelay(time); },
                                DOM_UPDATE_REPROCESS_WAIT_TIME_MS);
    domUpdated = false;
  }
}

function handleDomUpdate(e) {
  domUpdated = true;
  processLinksOrDelay();
}

function getDomainsPref() {
  var domains = [];
  if (options["domains"]) {
    domains = options["domains"].split("\n");
  }
  domains.push("docs.google.com");
  return domains;
}

function getFileTypesPref() {
  // Lookup enabled formats.
  var typesList = [];
  $.each(FILE_TYPES, function(key, value) {
    if ("true" == options[key] || 1 == options[key]) {
      typesList.push(value.ext_regex);
    }
  });
  return typesList;
}

function init() {
  // Ignore checks on blacklisted domains
  if (new RegExp('(' + getDomainsPref().join('|') + ')$')
      .test(window.location.hostname)) {
    return;
  }

  // Match a string that contains one of our valid extensions before the first ?
  // or # if present otherwise at the end of the string.
  // This pattern MUST NOT match the docs viewer url as that is what we will
  // rewrite urls to be as well they may occur naturally in pages.
  pattern = new RegExp('^[^\\?#]+\\.(' + getFileTypesPref().join('|')
      + ')((#|\\?).*)?$', 'i');

  // Check all the links in the page
  $('a').each(checkLink);

  // Look for dom changes.  Prefer new MutationObservers in v18.
  // NOTE: Disable MustationSummary/Observers usage as there's a memory leak in
  // it.
  if (false && typeof MutationSummary == 'function') {
    // Use Mutation Observers
    observer = new MutationSummary({
      queries: [{element: 'a'}],
      callback: function(summaries) {
        summaries[0].added.forEach(function(aElm) {
          checkLink.apply(aElm);
        });
      }
    });
  } else {
    // DOMSubtreeModified is the only event that seems to work for all page
    // updates.  It may be a bit noisy though.
    $(document.body).bind('DOMSubtreeModified', handleDomUpdate);
  }
}

// Request options first
var keys = [];
$.each(FILE_TYPES, function(key, value) {
  keys.push(key);
});
keys.push("domains");
chrome.extension.sendRequest({'type': 'option', 'keys': keys},
  function(result) {
    options = result;
    init();
   });
