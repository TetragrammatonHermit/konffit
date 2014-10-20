#!/bin/bash

# Start builtin Pulseaudio equalizer
# See Arch Linux wiki for information on installation etc.
# https://wiki.archlinux.org/index.php/PulseAudio
# https://wiki.archlinux.org/index.php/PulseAudio/Examples


# Start required modules
pactl load-module module-dbus-protocol
pactl load-module module-equalizer-sink

# Run equalizer GUI
qpaeq &

# Run mixer GUI
# TODO: not running in background?
pavucontrol > /dev/null 2>&1
