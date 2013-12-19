# Aliases and other stuff for both osx and linux
#
# Symlink this to home and source from .zshrc .bash_profile or whatever

alias rp="source ~/.zshrc"
alias back='cd $OLDPWD'
alias myip="ifconfig en1"
alias cl="clear"

alias bitch,=sudo

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



# # Translate
# translate2(){ wget -qO- "http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=$1&langpair=$2|${3:-en}" | sed 's/.*"translatedText":"\([^"]*\)".*}/\1\n/'; }

# translate() { lng1="$1";lng2="$2";shift;shift; wget -qO- "http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=${@// /+}&langpair=$lng1|$lng2" | sed 's/.*"translatedText":"\([^"]*\)".*}/\1\n/'; }
