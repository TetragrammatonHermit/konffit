#!/bin/sh

# run this from rc.local
# http://crunchbang.org/forums/viewtopic.php?id=14453

# Set trackpoint
sudo /home/jasalt/konffit/linux/setmouse.sh

sudo ifconfig eth0 down

# Set xmodmap
xmodmap /home/jasalt/konffit/linux/Xmodmap

