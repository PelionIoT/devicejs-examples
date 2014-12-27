// DeviceJS
// (c) WigWag Inc 2014
var Facade = require('Class/Facade');

var Special = Facade.create('ExampleHappened', {
    //increment current state value and print
    special : function(increment) {
    	console.log("stateValue = " + this.stateValue());
        return this.stateValue(this.stateValue()+increment);
    }
}, {
    specialValue : function(value) {
        return typeof value === "number";
    }
});

module.exports = Special;
