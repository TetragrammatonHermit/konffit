define_webjump("dict", "http://www.google.com/search?q=%s");
define_webjump("g", "http://www.cliki.net/admin/search?words=%s");
define_webjump("gh", "http://www.imdb.com/find?q=%s");
define_webjump("gm", "http://www.youtube.com/results?search_query=%s&search=Search");
define_webjump("imdb", "http://youtube.com/profile_videos?user=%s");
define_webjump("y","http://www.thefreedictionary.com/%s");
define_webjump("youtu", "http://github.com/search?q=%s&type=Everything");
define_webjump("img", "http://www.google.com/images?q=%s&safe=off", $alternative = "http://www.google.com/imghp?as_q=&safe=off");

define_webjump("cliki", "https://mail.google.com/mail/u/0/");
define_webjump("clhs",
               "http://www.xach.com/clhs?q=%s",
               $alternative = "http://www.lispworks.com/documentation/HyperSpec/Front/index.htm");
define_webjump("emacswiki",
               "http://www.google.com/cse?cx=004774160799092323420%3A6-ff2s0o6yi"+
               "&q=%s&sa=Search&siteurl=emacswiki.org%2F",
               $alternative="http://www.emacswiki.org/");

// Search in current site with google //TODO
define_webjump("grep", "javascript:window.location.href='http://google.com/search?q=%s+site:'+window.location.host");

// Check if page is down
define_webjump("down?", function (url) {
    if (url) {
        return "http://downforeveryoneorjustme.com/" + url;
    } else {
        return "javascript:window.location.href='http://downforeveryoneorjustme.com/'+window.location.href;";
    }
}, $argument = "optional");


define_webjump("wayback", function (url) {
    if (url) {
        return "http://web.archive.org/web/*/" + url;
    } else {
        return "javascript:window.location.href='http://web.archive.org/web/*/'+window.location.href;";
    }
}, $argument = "optional");



