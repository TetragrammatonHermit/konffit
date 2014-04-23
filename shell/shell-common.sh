# Aliases and other stuff for both osx and linux
#
# source from .zshrc .bash_profile or whatever

alias rp="source ~/.zshrc"
alias myip="ifconfig wlan0"

alias bitch,=sudo

alias j="autojump"

alias gf="git commit -am  'Quick commit' && git push"

export EDITOR='emacsclient -c -n'
export EDITOR=$EDITOR

## Emacsclient bindings
# terminal
alias et='emacsclient -t'
# gui client with wait
alias e='emacsclient -c'
# gui client without waiting
alias em='emacsclient -c -n'

alias serve="python2 -m SimpleHTTPServer 3333"

# Google translate (https://github.com/soimort/google-translate-cli)
alias te="trs {fi=en} " # To English
alias tf="trs {en=fi} " # To Finnish

# Paste last output
zmodload -i zsh/parameter
insert-last-command-output() {
  LBUFFER+="$(eval $history[$((HISTCMD-1))])"
}
zle -N insert-last-command-output
bindkey "^V" insert-last-command-output
