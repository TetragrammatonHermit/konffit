a=0
while [ "$a" -lt 250 ]
do
    xdotool click 1
    sleep 0.01
    a=`expr $a + 1`
done
