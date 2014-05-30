#!/bin/bash

# http://www.thinkwiki.org/wiki/How_to_configure_the_TrackPoint

# echo -n 1 > /sys/devices/platform/i8042/serio1/serio2/press_to_select
echo -n 255 > /sys/devices/platform/i8042/serio1/serio2/sensitivity
echo -n 200 > /sys/devices/platform/i8042/serio1/serio2/speed
echo -n 255 > /sys/devices/platform/i8042/serio1/serio2/draghys
echo -n 4 > /sys/devices/platform/i8042/serio1/serio2/mindrag

#xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation" 1
#xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Button" 2
#xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Timeout" 200
#xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Axes" 6 7 4 5

# http://www.thinkwiki.org/wiki/How_to_configure_the_TrackPoint

# Enable tap
#synclient TapButton1=1
