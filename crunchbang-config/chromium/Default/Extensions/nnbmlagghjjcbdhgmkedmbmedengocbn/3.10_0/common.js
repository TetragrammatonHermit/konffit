// Copyright 2011 Google Inc. All Rights Reserved.

var VIEWER_URL = 'https://docs.google.com/viewer?url=';

function getViewerUrl(url) {
  return VIEWER_URL + encodeURIComponent(url);
}

// String to use in url params to indicate other pages in the extension should
// do its teaser action.
var TEASER_PARAM_STRING = "teaser"

// Key is the value we use in local storage to save the setting for each format.
// Value is the a list of the extensions in a group, a readable descriptor, and
// if it should be on by default.
var FILE_TYPES = {
  "pdf":   [["pdf"], "Adobe Acrobat", true],
  "ai" :   [["ai"], "Adobe Illustrator", true],
  "psd":   [["psd"], "Adobe Photoshop", true],
  "pages": [["pages"], "Apple Pages", true],
  "dxf":   [["dxf"], "Autodesk AutoCad", true],
  "fnt":   [["fnt", "fon"], "Font", true],
  "xls":   [["xls", "xlsx"], "Microsoft Excel", true],
  "doc":   [["doc", "docx"], "Microsoft Office", true],
  "ppt":   [["pps", "ppt", "pptx"], "Microsoft PowerPoint", true],
  "otf":   [["otf"], "OpenType Font", true],
  "ps" :   [["eps", "ps"], "PostScript", true],
  "rar":   [["rar"], "Roshal ARchive", false],
  "svg":   [["svg"], "Scalable Vector Graphics", false],
  "tif":   [["tif", "tiff"], "TIFF", true],
  "ttf":   [["ttf"], "TrueType", true],
  "xps":   [["xps"], "XML Paper Specification", true],
  "zip":   [["zip"], "ZIP Archive", false]
};

// Turn list attributes into named ones.
$.each(FILE_TYPES, function(key, value) {
  FILE_TYPES[key].ext_array = value[0];
  FILE_TYPES[key].ext_readable = value[0].join(", ");
  FILE_TYPES[key].ext_regex = value[0].join("|");
  FILE_TYPES[key].name_readable = value[1];
  FILE_TYPES[key].enabled_default = value[2];
});
