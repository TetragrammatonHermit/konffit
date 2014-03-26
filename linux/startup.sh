#!/bin/sh

# run this from rc.local
# http://crunchbang.org/forums/viewtopic.php?id=14453

# Set trackpoint
sudo /home/jasal/konffit/linux/setmouse.sh

# Set xmodmap
xmodmap /home/jasal/konffit/linux/Xmodmap

#sudo ifconfig eth0 down
sudo iwconfig wlp3s0 txpower 1
