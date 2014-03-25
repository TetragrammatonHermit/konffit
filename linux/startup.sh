#!/bin/sh

# run this from rc.local
# http://crunchbang.org/forums/viewtopic.php?id=14453

# Set trackpoint
sudo /home/jasalt/konffit/linux/setmouse.sh

# Set xmodmap
xmodmap /home/jasalt/konffit/linux/Xmodmap

sudo ifconfig eth0 down
sudo iwconfig wlan0 txpower 1 
