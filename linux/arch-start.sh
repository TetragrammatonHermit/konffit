# Set oh-my-zsh plugins
plugins=(git autojump archlinux npm python pip pyenv screen sudo web-search extract)

# Set keyboard layout and remap modifier keys
setxkbmap -rules evdev -model evdev -layout us -variant altgr-intl
xmodmap /home/jasalt/konffit/linux/Xmodmap

# Reload zsh configuration
alias rp="source /home/jasalt/.zshrc"

# Open gui file manager in current dir
alias o="spacefm . >/dev/null 2>&1 &"

# Emacsclient gui
alias ec="emacsclient -n"

# Emacsclient terminal
alias ect="emacsclient -t"
