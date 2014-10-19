a=0
while [ "$a" -lt 190 ]
do
    xdotool click 1
    xdotool mousemove_relative 0 5
    sleep 0.01
    a=`expr $a + 1`
done
