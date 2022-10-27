var Results = require('./results');
var Route = require('./route')

class Calculator {
    constructor(streets, drivers) {
        this.streets = streets;
        this.drivers = drivers;
        this.vowels = ['a','e','i','o','u'];
        this.consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
        this.evenFactor = 1.5;
        this.oddFactor = 1;
        this.factorBoost = 1.5;
    }

    generateRoutes() {
        let results = new Results();

        let oddStreets = [];
        let evenStreets = this.streets.filter(street => {
            if (this.isEven(this.parseStreetName(street).length)) {
                return true;
            } else {
                oddStreets.push(street);
                return false;
            }
        });

        /* 
            object with two properties containing on array sorted by vowel count
            and another array with the remaining drivers sorted by consonant count
            { 
              vowelArr: vowelSortedArr,
              constArr: constSortedArr
            }
        */
        let sortedDrivers = this.getSortedDrivers(evenStreets.length);

        let evenRoutes = this.getBestSuitabilityScores(evenStreets, sortedDrivers.vowelArr);
        let oddRoutes = this.getBestSuitabilityScores(oddStreets, sortedDrivers.constArr);

        results.concatRoutes(evenRoutes.getRoutes());
        results.concatRoutes(oddRoutes.getRoutes());
        results.incrementScore(evenRoutes.getScore());
        results.incrementScore(oddRoutes.getScore());

        return results;
    }

    getBestSuitabilityScores(streets, drivers) {
        let subsetResults = new Results();
        for (let i = drivers.length-1; i >= 0; i--) {
            let currMaxSSIndex = 0;
            let currMaxSS = 0;
            for (let j = streets.length-1; j >= 0 ; j--) {
                let currSS = this.generateSS(streets[j], drivers[i]);
                if (currSS > currMaxSS) {
                    currMaxSS = currSS;
                    currMaxSSIndex = j;
                }
            }

            let newRoute = new Route(drivers[i], streets[currMaxSSIndex], currMaxSS);

            subsetResults.addRoute(newRoute);
            subsetResults.incrementScore(currMaxSS);
            drivers.splice(i, 1);
            streets.splice(currMaxSSIndex, 1);
        }

        return subsetResults;
    }

    generateSS(street, driver) {
        let ss = 0;
        const streetName = this.parseStreetName(street);

        if (this.isEven(streetName.length)) {
            ss = this.countVowels(driver) * this.evenFactor;
        } else {
            ss = this.countConsts(driver) * this.oddFactor;
        }

        if (this.shareFactors(streetName.length, driver.replace(" ", "").length)) {
            ss = ss * this.factorBoost;
        }

        return ss;
    }

    //sort by vowels descending until count is reached, then by consonants descending
    getSortedDrivers(count) {
        this.drivers.sort((a, b) => {
            if (this.countVowels(a) < this.countVowels(b)) {
                return -1;
            } else {
                return 1;
            }
        });

        let constSortedArr = this.drivers.slice(0,this.drivers.length-count);
        let vowelSortedArr = this.drivers.slice(this.drivers.length-count);

        constSortedArr.sort((a, b) => {
            if (this.countConsts(a) < this.countConsts(b)) {
                return -1;
            } else {
                return 1;
            }
        });

        return { 
            vowelArr: vowelSortedArr,
            constArr: constSortedArr
        };
    }

    shareFactors(streetLength, driverLength) {
        let streetFactors = this.generateFactors(streetLength);
        let driverFactors = this.generateFactors(driverLength);

        for (let i = 0; i < streetFactors.length; i++) {
            if (driverFactors.indexOf(streetFactors[i]) > -1) {
                return true;
            }
        }

        return false;
    }

    generateFactors(number) {
        let factors = [];

        //start at 2, 1 is a universal factor, and 0 will never be a factor
        for (let i = 2; i < (number/2)+1; i++) {
            if (number % i === 0) {
                factors.push(i);
            } 
        }

        if (number !== 0) {
            factors.push(number);
        }
        
        return factors;
    }

    //assumes {NUM} {STREET} {STREETTYPE} format
    parseStreetName(street) {
        return street.split(' ')[1];
    }

    isEven(number) {
        return number % 2 === 0;
    }

    countVowels(name) {
        let counter = 0; 
        for (let i = 0; i < name.length; i++) {
            if (this.vowels.includes(name[i].toLowerCase())) {
                counter++;
            }
        }
        return counter; 
    }

    countConsts(name) {
        let counter = 0; 
        for (let i = 0; i < name.length; i++) {
            if (this.consonants.includes(name[i].toLowerCase())) {
                counter++;
            }
        }
        return counter; 
    }
}

module.exports = Calculator;