Instructions to run
Install - Node.js v18.12.0 and npm v8.19.2

Within Terminal - 
To Setup - npm install
To Test - npm test
To Run - (while in project folder) node driver_assignments.js $STREETSFILE.EXT $DRIVERSFILE.EXT


Approach - 
The approach is to create a 'best attempt' at creating the highest SS. 

This is done by 
 - separating the streets into groups of odds and evens, 
 - separating the drivers into 
    1. a group of drivers, with a count that matches the even count, whose names have the highest vowel count, sorted so we start with the highest vowel count
    2. the remaining drivers sorted by consonant count. 
 - Parse vowel sorted drivers first, matching to the highest SS street in order
 - Parse consonant sorted drivers last, again matching to the highest SS in order
 - combine the two lists and write to file for easy consumption

What to do better - 
This is a matrix problem that can be represented by a 2-dimensional array such as 
```
   D1  D2  D3  D4  D5
S1 1   6   11  16  21
S2 2   7   12  17  22
S3 3   8   13  18  23
S4 4   9   14  19  24
S5 5  10   15  20  25
```

In a perfect world with more time I would write an algorithm that finds the subset of 5 matches that has the highest value. 
