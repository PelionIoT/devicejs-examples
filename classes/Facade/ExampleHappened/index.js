// DeviceJS
// (c) WigWag Inc 2014
var Facade = require('Class/Facade');

var util=require('util');

var Special = Facade.create('ExampleHappened', {
    //increment current state value and print
    incrementSpecial : function(increment) {
    	console.dir("special(): " + util.inspect(this.special()));
    	console.log("specialValue = " + this.special());
    	console.log("args: ");
    	console.dir(arguments);
    	if(typeof increment == 'number')
    		return this.special(this.special()+increment);
    	else
    		return this.special();
    }
}, {
    special : function(value) {
        return typeof value === "number";
    }
});

module.exports = Special;
