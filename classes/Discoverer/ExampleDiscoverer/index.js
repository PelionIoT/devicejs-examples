/**
    devicejs.org

    DeviceJS 
    (c) 2014 WigWag Inc.
**/

/**
 * @class ExampleDiscoverer
 */

var Discoverer = require('Class/Discoverer').Discoverer;
var dev$Promise = require('Class/DevPromise');
var UDPMultiplexer = require('Discoverer/WigWag/protocol').UDPMultiplexer;
var WigWagDeviceConnection = require('Discoverer/WigWag/protocol').WigWagDeviceConnection;

var ExampleDiscoverer = Discoverer.create('ExampleDiscoverer', function() {
    var self = this;

	var timer = null; // a timer which will discover a device.
	var numExampleDevices = 3;

    var discovered = 0,
        interval = null,
        discoverableTypes = {};

    this.start = function() {
        var config = this.configuration().domain;
        var id  = this.id();

        var setup = new dev$Promise().when(function (p) {
            //setup code
            interval = setInterval(function () {
                self.poll();
            },10000);
            p.resolve();
        });

        return setup;
    };

    var n =0;

    this.poll = function() {
    	console.log("poll()");
    	if(n < numExampleDevices) {
    		console.log('discover: ' + n);
    		self.discover("exampleDeviceThatEmitsSignature", {
    			num : n 
    		});
    		n++;
    	}
    };

    this.stop = function() {
        if (interval) {
            clearInterval(interval);
        }
    };

    this.addDiscoverableTypeCreator = function(signature, creator) {
    	console.log("addDiscoverableTypeCreator()");
        //mapping (one) signature to a device type creator (any data)
        discoverableTypes[signature] = creator;
    };

    this.getDiscoverableTypeCreator = function(signature) {
    	console.log("getDiscoverableTypeCreator()");
        return discoverableTypes[signature];
    };


});

module.exports = ExampleDiscoverer;