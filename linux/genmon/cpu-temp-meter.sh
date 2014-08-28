#!/bin/bash
# XFCE4 genmon plugin script
# Print current cpu temp
sensorReadings=$(sensors | grep "id 0" | cut -c18-26 )
echo "<txt>"$sensorReadings"</txt>"
