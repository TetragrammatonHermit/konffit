alias cdc="cd /Volumes/C/"

alias slp="pmset sleepnow"
alias manp="man-preview"
alias pbc="pbcopy"
alias pbp="pbpaste"
alias rt="trash"

alias bi="brew install"
alias cask="brew cask"
alias bci="brew cask install"

alias o="open ." # Open current folder in Finder

alias sano="say -v Mikko" # Say something in Finnish
alias kello="date \"+Kello on %H %M\" | sano"

# Start emacs server
alias emacs="open /Applications/Emacs"
alias ecw="/usr/local/bin/emacsclient -c $*"
alias ec="/usr/local/bin/emacsclient --no-wait $*"
alias ect='/usr/local/bin/emacsclient -t -a \"\" $*'
