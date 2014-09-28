#!/bin/bash
# Set at Settings/Sessions and Startup/Application Autostart
terminator &
sleep 1
# Set input devices
sudo $HOME/konffit/linux/init-linux.sh

redshift &

sleep 6

# Disable powerbutton led
sudo $HOME/konffit/bin/pledoff
