## * Run this after xfce-installation

# Set quake terminal keybinding to F4
xfconf-query -c xfce4-keyboard-shortcuts -p /commands/custom/F4 -n -t string -s "xfce4-terminal --drop-down"
