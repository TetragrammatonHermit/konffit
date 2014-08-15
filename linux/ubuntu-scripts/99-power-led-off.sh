#!/bin/bash
# Disable annoying power led after wakeup
# Install: symlink to /etc/pm/sleep.d/
case "$1" in
    thaw|resume)
        sleep 10
        sudo /home/js/konffit/bin/pledoff 2>/dev/null
        ;;
    *)
        ;;
esac
exit $?
