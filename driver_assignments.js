var Calculator = require('./calculator');
var fs = require('fs');

//BEGIN WELCOME
console.log("Welcome to our Shipment Assignment Calculator.");
console.log("This script accepts two arguments.");
console.log("The first argument it accepts is the filename (with extension) of a newline separated list of streets.");
console.log("The second argument it accepts is the filename (with extension) of a newline separated list of drivers.");
//END WELCOME

const fileName = "route_assignments.json"
const streets = getStreetList();
const drivers = getDriverList();

const calc = new Calculator(streets, drivers);

//All major work happens here
const routes = calc.generateRoutes();

console.log("Writing results to: " + fileName);
fs.writeFile(fileName, JSON.stringify(routes), (error) => {
    if (error) throw error;
});

function getStreetList() {
    const strtAddrFile = process.argv.slice(2)[0];
    console.log("Street Name File: " + strtAddrFile);

    if (strtAddrFile === undefined) {
        console.error("The file containing streets was not provided as an argument, please retry.");
        return [];
    }

    const streets = fs.readFileSync(strtAddrFile, 'UTF-8').split(/\r?\n/);
    console.log("There are " + streets.length + " streets.");

    return streets;
}

function getDriverList() {
    const driverNameFile = process.argv.slice(2)[1];
    console.log("Driver Name File: " + driverNameFile);

    if (driverNameFile === undefined) {
        console.error("The file containing drivers was not provided as an argument, please retry.");
        return [];
    }

    const drivers = fs.readFileSync(driverNameFile, 'UTF-8').split(/\r?\n/);
    console.log("There are " + drivers.length + " drivers.");

    return drivers;
}