konffit
=======

Config-files for syncing across machines.

Installing shell aliases

    sudo apt-get install git zsh curl
    curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
    chsh -s /bin/zsh
    cd
    git clone git@github.com:jasalt/konffit.git
    echo "source ~/konffit/shell-common\necho ~/konffit/shell-linux" >> .zshrc
        (On osx change shell-linux to shell-osx)

## TODO
- Moom config
    - Rethink shortcuts (current iokl)
- ohmyzsh plugins
- st2 config + plugins
- osx keyboard shortcut config possible?

## Recommendations
### Essential browser addons
- Adblock plus
- Vimium for Chrome / Vimperator for Firefox (for moving around)
- Smart zoom for Chrome (for Safari-like zooming on columns, great for narrow browser windows)
- Tabcloud for Chrome (for quickly saving all current tabs for near future)