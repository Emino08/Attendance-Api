------ ARDUINO SERIAL COMMUNICATION API ----------------------------------------------------

Commands and their meaning

START - Initiates fingerprint  attendance taking
END - Terminates fingerprint attendance taking

ENROLL X - Enrolls a new fingerprint at ID X, automatically deletes the existing template
MATCH - returns the ID corresponding to the fingerprint
CONFIRM - confirms fingerprint recording process by blinking a green led two times
ERROR - shows error message to user by turning on a red LED
ATTENDANCE - Continuously takes attendance returning fingerprint id and invalidates with ERROR or NO MATCH or 250
0PROCESSING - notifies the user to wait by turning on a yellow LED

The START command is the entrypoint!!!


--------------------------------------- Hardware -----------------------------------------
Confirm led is connected to pin 13 
Processing Led is connected to pin 12
Error LED is connected to pin 11
------------------------------------------------------------------------------------------