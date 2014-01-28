// Saves options.
function saveOptions() {
  $.each(FILE_TYPES, function(key, value) {
    setOption(key, $("#" + key).prop("checked"));
  });
  setOption("domains", $("#domains").val().trim().toLowerCase());

  // Update status to let user know options were saved.
  $("#status").show();
  setTimeout(function() {
    $("#status").hide();
  }, 1000);
  // TODO(shanemc): Reload the options so the user sees what actualy got stored
  // in case of an error.  Need to break up restoreOptions to do the button
  // creation once, and the 'checked' updating when desired.
}

// Restores select box state to saved values.
function restoreOptions() {
  var list = $("#file-types");
  $.each(FILE_TYPES, function(key, value) {
    // If there is a name for the format use it and bold it.
    var name = value.name_readable != "" ? "<b>" + value.name_readable +
        "</b>: " : "";
    list.append(
        $("<li/>").append(
            $("<input/>", {'type': 'checkbox', 'id': key,
                           'checked': optionIsSet(key)})).append(
                           $("<label/>", {'id': key + "_label",
                                          'html': name + value.ext_readable,
                             'for': key})));
  });
  $("#domains").val(getOption("domains"));
}

function doTeaser() {
  // Nothing special to do right now.
}

// Stuff to do when the page loads.
function onLoad() {
  $(restoreOptions);

  // Do Teaser if set in url.
  if (document.location.href.indexOf(TEASER_PARAM_STRING) > 0) {
    $(doTeaser);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  restoreOptions();
  $("#submit-button")[0].addEventListener('click', saveOptions);
});
