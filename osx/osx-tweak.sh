# Disable dashboard (not completely disabled?)
defaults write com.apple.dashboard mcx-disabled -boolean NO

# Disable safe sleep (save 16gb space, fall asleep faster)
sudo pmset hibernatemode 0