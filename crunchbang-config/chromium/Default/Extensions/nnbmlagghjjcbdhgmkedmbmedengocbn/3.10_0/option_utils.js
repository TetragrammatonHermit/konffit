function getOption(key) {
  return localStorage[key];
}

function setOption(key, value) {
  localStorage[key] = value;
}

function optionIsSet(key) {
  var value = getOption(key);
  return "true" == value || 1 == value;
}

function isFirstRun() {
  return getOption("doc") == undefined;
}

function setDefaultOptions() {
  // Check for existence of built in PDF support
  var hasPdfPlugin = false;
  $.each(navigator.plugins, function() {
    if (this.name == "Chrome PDF Viewer") {
      hasPdfPlugin = true;
      return false;
    }
  });

  // Don't handle PDF if the native plugin is available
  if (hasPdfPlugin) {
    setOption("pdf", false);
  }

  // Default domains
  setOption("domains", ["sites.google.com", "office.live.com"].join("\n"));
}

$(function() {
  if (isFirstRun()) {
    setDefaultOptions();
  }

  // Check for any undefined/new file types whose values aren't set and give
  // them defaults.
  $.each(FILE_TYPES, function(key, value) {
    if (getOption(key) == undefined) {
      setOption(key, value.enabled_default);
    }
  });
});
