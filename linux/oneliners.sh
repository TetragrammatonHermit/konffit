# List find different filetypes in folder
#http://stackoverflow.com/questions/1842254/how-can-i-find-all-of-the-distinct-file-extensions-in-a-folder-hierarchy 

find . -type f | perl -ne 'print $1 if m/\.([^.\/]+)$/' | sort -u

# Find inside files -R=recursive -l=showfilename
grep -Rl 'directory'
