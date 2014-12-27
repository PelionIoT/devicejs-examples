/**
    devicejs.org

    DeviceJS 
    (c) 2014 WigWag Inc.
**/
var Device = require('Class/Device');
var dev$Promise = require('Class/DevPromise');
var log = require('utils/logger').stdlogger(); // change to DevJS custom logger


var util = require('util');

var ExampleDeviceThatEmits = Device.create(function() {
    var self = this;

    // some 'private' variable:
    var timer = null;  // internal timer for this example

    this.setup = function() {
        console.log("setting up example device");
        return new dev$Promise().when(function(token) { // setup() returns a promise
            // any setup that occurs each time the device comes online
            counter = 0;
            if(timer) {     // as an example, make an internal timer which emits 
                timer = setInterval(function(){  // every 2 seconds
                    self.special(1);
                    //self.events().emit('special',counter++); // emit the internal event
                },2000);
            }
            token.resolve();
        });
    };

    this.warmBoot = function() {
    };

    this.stateValue = function(value) {
        //response to alteration of state value in devicejs to propagate that value to the device
        console.log("exampledevice setting value: ",value);
        return new dev$Promise().when(function (p) {
            p.resolve();
        });
    };

}, {
    services: [],
    facades: [ 'ExampleHappened' ],
    defaults: { 
        stateValue: 0,
        specialValue: 100
    },
    specialStaticThing: 1  // example static variable for class
}).addDiscovererType('ExampleDiscoverer', {  // <-- needs to match the Discoverer which can create 'ExampleDeviceThatEmits' - note this Discoverer needs to exist in DeviceJS
    signature: "exampleDeviceThatEmitsSignature",
    scope: 'ExampleDeviceThatEmits',
    identify: function(info) {
        console.log('identify(' + util.inspect(info) + ")")
        return new dev$Promise().when(function(token) {
            console.log("resolve: " + info.num);
            token.resolve(''+info.num); // <---- note returning a number here would break the Discoverer system (tix DVJS-268)
        });
    },
    configure: function(info) {
        console.log('configure(' + util.inspect(info) + ")")
        return new dev$Promise().when(function(token) {
            token.resolve({});
        });
    }
});

module.exports = ExampleDeviceThatEmits;
