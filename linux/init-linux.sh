#!/bin/sh -f
### Linux system startup script ###

## Keylayout
setxkbmap -rules evdev -model evdev -layout us -variant altgr-intl

## Set modifier keys
xmodmap /home/jasal/konffit/linux/Xmodmap

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
xinput set-prop 13 387 7 6 5 4
xinput set-prop 1 387 7 6 5 4

xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation" 1
xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Button" 2
xinput set-prop "TPPS/2 IBM TrackPoint" "Evdev Wheel Emulation Axes" 7 6 5 4

# Reverse the scroll distance setting on touchpad
# $> xinput list-props "SynPS/2 Synaptics TouchPad"
# Synaptics Scrolling Distance (272): 100, 100

xinput set-prop 10 "Synaptics Scrolling Distance" -100 -100
xinput set-prop 11 "Synaptics Scrolling Distance" -100 -100

# TODO load distro specific stuffs conditionally when needed
