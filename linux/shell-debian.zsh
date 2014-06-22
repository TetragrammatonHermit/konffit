# Set oh-my-zsh plugins
plugins=(git autojump debian npm python pip pyenv screen sudo web-search extract)

# Set keyboard layout and remap modifier keys
setxkbmap -rules evdev -model evdev -layout us -variant altgr-intl
xmodmap /home/jasalt/konffit/linux/Xmodmap

# Open gui file manager in current dir
alias o="thunar ."

source ~/konffit/shell/aliases.sh
