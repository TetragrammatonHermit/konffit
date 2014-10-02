# Common unix shell modifications

# Python Virtualenv
alias va="source ./venv/bin/activate"
alias vd="deactivate"

# Python package manager
alias pii="pip install"
alias pis="pip search"
alias pir="pip uninstall"
alias pif="pip freeze"

# Reconfigure shell
alias rp="source ~/.zshrc"

# Emacsclient gui
alias ec="emacsclient -n"

# Emacsclient terminal
alias ect="emacsclient -t"

alias serve="python -m SimpleHTTPServer 3333"

# Quick commit
alias qc="git commit -a -m 'up' && git push"

#CD's
alias cdd="cd ~/Desktop/"
alias cddo="cd ~/Documents/"

# http://www.soimort.org/translate-shell/
alias te="trans fi:en"
alias tf="trans en:fi"

alias bfg="java -jar ~/konffit/bin/bfg-1.11.8.jar"
