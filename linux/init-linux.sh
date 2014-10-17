#!/bin/sh -f
### Linux system startup script to setup input devices ###
# Run as sudo to get everything working

## Keylayout
setxkbmap -rules evdev -model evdev -layout us -variant altgr-intl

## Set modifier keys
xmodmap $HOME/konffit/linux/Xmodmap

## Key repeat delay and rate
xset r rate 190 25

## Natural scrolling (vert, horiz) with trackpoint and touchpad ##
# Written on (X)ubuntu 14.04, TP X220
# Remember to disable natural scroll in system preferences

# What input devices do we have:
# $> xinput list
# SynPS/2 Synaptics TouchPad id=10 [slave  pointer  (2]
# TPPS/2 IBM TrackPoint id=17 [slave  pointer  (2)]

# What are the scrollwheel buttons
# $> xinput test [id]
# wheel buttons are: horiz 4,5 vert 6,7

# Remap scroll emulation axes for trackpad

xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation" 1
xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Button" 2
xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Axes" 7 6 5 4

# Reverse the scroll distance setting on touchpad
# $> xinput list-props "SynPS/2 Synaptics TouchPad"
# Synaptics Scrolling Distance (272): 100, 100

xinput set-prop "SynPS/2 Synaptics TouchPad" "Synaptics Scrolling Distance" -100 -100

# Coasting (Coasting Speed) sucks when using ctrl after scrolling a web-page

xinput set-prop "SynPS/2 Synaptics TouchPad" 287 0 0

# TODO Disable sucky clickpad (ClickPad) 
# xinput set-prop "SynPS/2 Synaptics TouchPad" 268 0
