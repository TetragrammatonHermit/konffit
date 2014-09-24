#!/bin/sh

# Lock xscreensaver on resume from a suspend.

# getXuser gets the X user belonging to the display in $displaynum.
# If you want the foreground X user, use getXconsole!
getXuser() {
        user=`pinky -fw | awk '{ if ($2 == ":'$displaynum'" || $(NF) == ":'$displaynum'" ) { print $1; exit; } }'`
        if [ x"$user" = x"" ]; then
                startx=`pgrep -n startx`
                if [ x"$startx" != x"" ]; then
                        user=`ps -o user --no-headers $startx`
                fi
        fi
        if [ x"$user" != x"" ]; then
                userhome=`getent passwd $user | cut -d: -f6`
                export XAUTHORITY=$userhome/.Xauthority
        else
                export XAUTHORITY=""
        fi
        export XUSER=$user
}

if pidof xscreensaver > /dev/null; then
    for x in /tmp/.X11-unix/*; do
        displaynum=`echo $x | sed s#/tmp/.X11-unix/X##`
        getXuser;
        if [ x"$XAUTHORITY" != x"" ]; then
            export DISPLAY=":$displaynum"
            case "$1" in
                resume|thaw)
                    sudo -u $XUSER xscreensaver-command -unthrottle
                ;;
                suspend|hibernate)
                    sudo -u $XUSER xscreensaver-command -throttle
                    sudo -u $XUSER xscreensaver-command -lock
                ;;
            esac
        fi
    done
fi
