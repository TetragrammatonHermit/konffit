var prefix = 'keep';
  var launchGoogleKeep = function () {
    chrome.app.window.create(prefix + 'index.html', {
      type: 'shell',
      width: 360,
      height: 540,
      minWidth: 360,
      minHeight: 540,
      id: 'google-keep'
    });
  };
  chrome.app.runtime.onLaunched.addListener(launchGoogleKeep);
