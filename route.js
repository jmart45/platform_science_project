class Route {
    constructor(driver, street, suitabilityScore) {
        this.driver = driver;
        this.street = street;
        this.suitabilityScore = suitabilityScore;
    }

    getDriver() {
        return this.driver;
    }

    getStreet() {
        return this.street;
    }

    getSuitabilityScore() {
        return this.suitabilityScore;
    }
}

module.exports = Route;