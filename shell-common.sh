# Aliases and other stuff for both osx and linux
#
# Symlink this to home and source from .zshrc .bash_profile or whatever

alias rp="source ~/.zshrc"
alias back='cd $OLDPWD'
alias myip="ifconfig en1"
alias cl="clear"

# Package managers
alias pi="pip install"

#CD's
alias cdd="cd ~/Desktop/"
alias cddo="cd ~/Documents/"

#Yeoman / grunt
alias g="grunt"
alias gs="grunt server"
alias gt="grunt test"

alias yac="yo angular"
alias yav="yo angular:view"
alias yar="yo angular:route"
alias yas="yo angular:service"
alias yaf="yo angular:filter"
alias yad="yo angular:directive"

# Paste last output
zmodload -i zsh/parameter
insert-last-command-output() {
  LBUFFER+="$(eval $history[$((HISTCMD-1))])"
}
zle -N insert-last-command-output
bindkey "^V" insert-last-command-output
