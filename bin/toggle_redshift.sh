# Toggle redshift on/off.

redshift_pid=`pidof redshift`
size=${#redshift_pid}

if [ $size -gt 1 ];
then
    echo "Killing" &&
    killall redshift;
else
    echo "Starting" &&
    redshift; fi

# Find out whether the touchpad is enabled or not.
# tp_enabled=`xinput list-props $tp_id | grep Device\ Enabled | awk '{ print $4 }'`
