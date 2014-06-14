//// General browser behaviour configurations ////

// Enable contrib content on
load_paths.unshift("chrome://conkeror-contrib/content/");

// Set default download directory
cwd=get_home_directory();
cwd.append("Downloads");

// No new window for downloads
//download_buffer_automatic_open_target=OPEN_NEW_BUFFER;

// Keybinds
define_key(content_buffer_normal_keymap, "back_space", "back");
define_key(content_buffer_normal_keymap, "M-left", "back");
define_key(content_buffer_normal_keymap, "M-right", "forward");
define_key(content_buffer_normal_keymap, "C-l", "caret-forward-line");

// As a matter of courtesy to Vim
define_key(content_buffer_normal_keymap, "j", "caret-forward-line");
define_key(content_buffer_normal_keymap, "k", "caret-backward-line");
define_key(content_buffer_normal_keymap, "h", "caret-cmd_scrollLeft");
define_key(content_buffer_normal_keymap, "l", "caret-cmd_scrollRight");

define_key(content_buffer_normal_keymap, "M-q", "unfocus");
define_key(content_buffer_normal_keymap, "d", "follow-new-buffer-background");

// Trello steals switch-to-buffer
define_key(content_buffer_normal_keymap, "C-x C-b", "switch-to-buffer");


// Reload conkerorrc with C-c r
interactive("reload-config", "reload conkerorrc",
            function(I) {
                load_rc();
                I.window.minibuffer.message("config reloaded");
            }
           );
define_key(default_global_keymap, "C-c r", "reload-config");

//  Midclick opens links in new background buffers
require("clicks-in-new-buffer.js");
clicks_in_new_buffer_target = OPEN_NEW_BUFFER_BACKGROUND;
clicks_in_new_buffer_button = 1;

// Use char-hints
hint_digits="asdfjklghweioqrupxcmzv";

// Set bigger hinting
register_user_stylesheet(
    "data:text/css," +
        escape(
            "@namespace url(\"http://www.w3.org/1999/xhtml\");\n" +
                "span.__conkeror_hint {\n"+
                "  font-size: 17px !important;\n"+
                "  line-height: 16px !important;\n"+
                "}"));

// Set external editor to emacscllient
editor_shell_command = "emacsclient -c";
view_source_use_external_editor = true;
// Open external links in new buffer
url_remoting_fn = load_url_in_new_buffer;

url_completion_use_bookmarks = true;
url_completion_use_history = true;

//browser_prevent_automatic_form_focus_mode(true);
//google_search_bind_number_shortcuts();

session_pref('browser.history_expire_days', 7);


//// GUI additions ////

// Graphical navigation buttons to modeline
require("mode-line-buttons.js");
mode_line_add_buttons(standard_mode_line_buttons, true);

// Show favicons in modeline
require("favicon");
add_hook("mode_line_hook", mode_line_adder(buffer_icon_widget), true);
read_buffer_show_icons = true;

// Show buffer count in modeline
add_hook("mode_line_hook", mode_line_adder(buffer_count_widget), true);

// Show loading buffer count widget in modeline
add_hook("mode_line_hook", mode_line_adder(loading_count_widget), true);

// Show # of buffers being loaded
add_hook("mode_line_hook", mode_line_adder(loading_count_widget), true);

// Disable clock
remove_hook("mode_line_hook", mode_line_adder(clock_widget));


//// Enable page-specific modes ////

require("gmail");
require("facebook");
//require("github");
require("twitter");


//// Enable some stock modules ////

require("adblockplus.js"); // Must have
//require("new-tabs.js");
//require("tab-bar.js");
