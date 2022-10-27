var expect = require('chai').expect;
const Calculator = require("../calculator");

var drivers = ["Roland Pur","Tiger Bix","Ainga Ionka","Shrlt Fhlrg"];
var streets = ["123 thisStreetSucks lane","897 anotherstreet circle","5123 things drive","12312 purposefullyvague street"];
const specCalc = new Calculator(streets, drivers);

describe("Calculator.countVowels", () => {
    it("Should return the number of vowels in a string", () => {
        expect(specCalc.countVowels(drivers[2])).to.equal(6);
        expect(specCalc.countVowels(drivers[3])).to.equal(0);
    });
});

describe("Calculator.getConsts", () => {
    it("Should return the number of consonants in a string", () => {
        expect(specCalc.countConsts(drivers[0])).to.equal(6);
        expect(specCalc.countConsts(drivers[1])).to.equal(5);
    });
});

describe("Calculator.parseStreetName", () => {
    it("Should return the street name only", () => {
        expect(specCalc.parseStreetName(streets[0])).to.equal("thisStreetSucks");
    });
});

describe("Calculator.generateFactors", () => {
    it("Should generate factors for prime number", () => {
        expect(specCalc.generateFactors(31).toString()).to.equal([31].toString());
    });

    it("Should NOT generate factors for 0", () => {
        expect(specCalc.generateFactors(0).toString()).to.equal([].toString());
    });

    it("Should generate factors for large number", () => {
        expect(specCalc.generateFactors(10000).toString()).to.equal([2, 4, 5, 8, 10, 16, 20, 25, 40, 50, 80, 100, 125, 200, 250, 400, 500, 625, 1000, 1250, 2000, 2500, 5000, 10000].toString());
    });

    it("Should generate factors for small number", () => {
        expect(specCalc.generateFactors(2).toString()).to.equal([2].toString());
        expect(specCalc.generateFactors(4).toString()).to.equal([2,4].toString());
    });
});

describe("Calculator.shareFactors", () => {
    it("Should return true for numbers that share only 1 common factor", () => {
        expect(specCalc.shareFactors(12,27)).to.be.true;
    });

    it("Should return true for numbers that share many common factors", () => {
        expect(specCalc.shareFactors(10000,5000)).to.be.true;
    });

    it("Should return false for numbers that do not share a common factor", () => {
        expect(specCalc.shareFactors(557,500)).to.be.false;
    });
});

describe("Calculator.generateSS", () => {
    let evenFactor = 1.5;
    let oddFactor = 1;
    let factorBoost = 1.5
    context("when street name length is even", () => {
        it("Should return correct SS for lengths that do NOT share a common factor", () => {
            //street name length 6, driver name length 7, driver vowels 2 - 2*evenFactor
            expect(specCalc.generateSS("123 puddle drive","Tom King")).to.equal(2*evenFactor);
        });

        it("Should return correct SS for lengths that do share a common factor", () => {
            //street name length 10, driver name length 15, driver vowels 6 - 6*evenFactor*factorBoost
            expect(specCalc.generateSS("123 hungrypaul drive","Elizabeth Yoddle")).to.equal(6*evenFactor*factorBoost);
        });
    });

    context("when street name length is odd", () => {
        it("Should return correct SS for lengths that do NOT share a common factor", () => {
            //street name length 7, driver name length 6, driver consonants 3 - 3*oddFactor
            expect(specCalc.generateSS("123 stretch drive","Ion Sol")).to.equal(3*oddFactor);
        });

        it("Should return correct SS for lengths that do share a common factor", () => {
            //street name length 7, driver name length 7, driver consonants 5 - 5*oddFactor*factorBoost
            expect(specCalc.generateSS("123 stretch drive","Pliny Te")).to.equal(5*oddFactor*factorBoost);
        });
    });
});

describe("Calculator.getSortedDrivers", () => {
    it("Should return object with correctly sorted drivers", () => {
        let expectedObject = {
            vowelArr: [ 'Ainga Ionka' ],
            constArr: [ 'Tiger Bix', 'Roland Pur', 'Shrlt Fhlrg' ]
        }
        expect(specCalc.getSortedDrivers(1).vowelArr.toString()).to.equal(expectedObject.vowelArr.toString());
        expect(specCalc.getSortedDrivers(1).constArr.toString()).to.equal(expectedObject.constArr.toString());
    });
});

describe("Calculator.generateRoutes", () => {
    it("Should return Results object with correctly set score", () => {
        expect(specCalc.generateRoutes().getScore()).to.equal(39.5);
    });

    it("Should return Results object with correctly set routes", () => {
        let routes = specCalc.generateRoutes().getRoutes();
        let expectedResults = [
            {
                driver: 'Ainga Ionka',
                street: '5123 things drive',
                score: 13.5
            },
            {
                driver: 'Shrlt Fhlrg',
                street: '123 thisStreetSucks lane',
                score: 15
            },
            {
                driver: 'Roland Pur',
                street: '12312 purposefullyvague street',
                score: 6
            },
            {
                driver: 'Tiger Bix',
                street: '897 anotherstreet circle',
                score: 5
            }
        ]
        for (let i = 0; i < routes.length; i++) {
            expect(routes[i].getDriver()).to.equal(expectedResults[i].driver);
            expect(routes[i].getStreet()).to.equal(expectedResults[i].street);
            expect(routes[i].getSuitabilityScore()).to.equal(expectedResults[i].score);
        }
    });
});