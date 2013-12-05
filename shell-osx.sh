alias nwk="/Applications/node-webkit.app/Contents/MacOS/node-webkit"

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
alias emacs="/usr/local/Cellar/emacs/24.3/bin/emacs"
# Wait for close
alias ecw="/usr/local/Cellar/emacs/24.3/bin/emacsclient -c $*"
# Don't wait
alias  ec="/usr/local/Cellar/emacs/24.3/bin/emacsclient --no-wait $*"
# Emacs in terminal
alias ect='/usr/local/Cellar/emacs/24.3/bin/emacsclient -t -a \"\" $*'
