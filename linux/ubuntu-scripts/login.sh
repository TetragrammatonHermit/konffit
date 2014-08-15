#!/bin/bash
# Set at Settings/Sessions and Startup/Application Autostart
sleep 2
# Set input devices
sudo $HOME/konffit/linux/init-linux.sh

redshift &

sleep 8

# Disable powerbutton led
sudo $HOME/konffit/bin/pledoff
