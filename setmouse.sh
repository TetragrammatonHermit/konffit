#!/bin/bash

# Set trackpoint settings TODO: load automagically
# http://www.thinkwiki.org/wiki/How_to_configure_the_TrackPoint
# http://askubuntu.com/questions/37824/what-is-the-best-way-to-configure-a-thinkpads-trackpoint
echo -n 1 > /sys/devices/platform/i8042/serio1/serio2/press_to_select
echo -n 255 > /sys/devices/platform/i8042/serio1/serio2/sensitivity
echo -n 200 > /sys/devices/platform/i8042/serio1/serio2/speed
echo -n 255 > /sys/devices/platform/i8042/serio1/serio2/draghys
echo -n 4 > /sys/devices/platform/i8042/serio1/serio2/mindrag
