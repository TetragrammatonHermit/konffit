// background.js primarily serves to provide central storage and
// communication to the code running in each tab.

// Handles requests from code running on each page.
function handleMessage(request, sender, sendResponse) {
  switch(request.type) {
    case "option":
      var response = {};
      $.each(request.keys, function(index, key) {
        response[key] = getOption(key);
      });
      sendResponse(response);
      break;
    default:
      sendResponse({});
  }
}
chrome.extension.onRequest.addListener(handleMessage);

// *** Handle context menus.

// Returns an array of urls which will match in-page links for the files we
// want to put the menu on.
function getArrayOfExtensionUrls() {
  items = [];
  $.each(FILE_TYPES, function(key, value) {
    $.each(value.ext_array, function(index, ext) {
      // Format:  <scheme>://<host><path>
      items.push("*://*/*." + ext);
    });
  });
  return items;
}

function openInNewTab(info, tab) {
  var viewer_url = getViewerUrl(info.linkUrl);
  chrome.tabs.create({"url": viewer_url});
}

// Create context Menu.
var hrefFilter = getArrayOfExtensionUrls();
// We only provide "open in new tab" as the other open scenarios "new window"
// "incognito window" require extra permissions users don't like giving.  We
// had it for a day but removed it.  Can look at the file history to see that
// code if desired.
var newTabMenu = chrome.contextMenus.create(
    {"title": chrome.i18n.getMessage('open_in_new_tab'),
     "contexts": ["link"], "onclick": openInNewTab});

// *** Handle new-version stuff.
// These "constants" and logic should stay here, so we have a single point of
// entry into the teaser in the right place.

// Local Storage key for the rev number.
var TEASER_REV_STRING = "TeaserRev";
// Increment this to make the teaser code run on update.
var TEASER_REV = 1;

if (getOption(TEASER_REV_STRING) != TEASER_REV) {
  setOption(TEASER_REV_STRING, TEASER_REV);

  // Teaser Code.  Change this for each new version we want a teaser.

  // Open the options and tell it to do its teaser operation if any.
  var options_url = chrome.extension.getURL("options.html") + "?" +
    TEASER_PARAM_STRING;
  chrome.tabs.create({"url": options_url});
}
