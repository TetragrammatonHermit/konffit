#!/usr/bin/env python
import pafy
import sys

if len(sys.argv) is not 2:
    import ipdb; ipdb.set_trace()
    print "Pass youtube video url or id as single command line argument"

# https://www.youtube.com/watch?v=vV4yebIievU
# vV4yebIievU

videoid = sys.argv[1] # First arg is script path, second is 
video = pafy.new(videoid)
audio = video.getbestaudio()
audio.download()

