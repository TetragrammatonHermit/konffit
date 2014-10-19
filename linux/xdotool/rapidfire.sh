a=0
while [ "$a" -lt 150 ]
do
    xdotool click 1
    sleep 0.01
    a=`expr $a + 1`
done
