#### Run after inserting usb-kb
## Keylayout
setxkbmap -rules evdev -model evdev -layout us -variant altgr-intl

## Set modifier keys
xmodmap /home/js/konffit/linux/Xmodmap

## Key repeat delay and rate
xset r rate 190 25

