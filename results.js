class Results {
    constructor() {
        this.suitabilityScoreTotal = 0;
        this.routes = [];
    }

    incrementScore(value) {
        this.suitabilityScoreTotal += value;
    }

    getScore() {
        return this.suitabilityScoreTotal;
    }

    addRoute(route) {
        this.routes.push(route);
    }

    concatRoutes(routes) {
        this.routes = this.routes.concat(routes);
    }

    getRoutes() {
        return this.routes;
    }
}

module.exports = Results;