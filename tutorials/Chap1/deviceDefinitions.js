/**
This is out of deviceJS, Tutorial 1
**/



// deviceDefinitions.js
// Defines interfaces and device types for a sensor and light

// The dimmable interface is for lighting devices that
// support dimming
dev$.addInterfaceType({
    "name": "Dimmable",
    "version": "0.0.1",
    "commands": { },
    "state": {
        "brightness": {
            "readOnly": false,
            "schema": {
                "type": "number",
                "minimum": 0, 
                "maximum": 1 
            }
        }
    },
    "events": { }
});

// The switchable interface is for devices that
// can be turned on and off
dev$.addInterfaceType({
    "name": "Switchable",
    "version": "0.0.1",
    "commands": { 
        "on": {
            "arguments": [ ],
            "returns": { "type": "null" }
        },
        "off": {
            "arguments": [ ],
            "return": { "type": "null" }
        }
    },
    "state": {
        "power": {
            "readOnly": false,
            "schema": {
                "type": "string",
                "pattern": "^(on|off)$"
            }
        }
    },
    "events": { }
});

// The motion sensor interface is for devices
// that act as a motion sensor
dev$.addInterfaceType({
    "name": "MotionSensor",
    "version": "0.0.1",
    "commands": { },
    "state": { },
    "events": {
        "motion": {
            "schema": { "type": "number" }
        }
    }
});

// This defines a new type of motion sensor
// That implements the motion sensor
// interface
dev$.addResourceType({
    "name": "Examples/ExampleMotionSensor",
    "version": "0.0.1",
    "interfaces": [ "MotionSensor" ]
});

// This defines a new light that
// can be powered on and off and
// be dimmed up and down
dev$.addResourceType({
    "name": "Examples/ExampleLight",
    "version": "0.0.1",
    "interfaces": [ "Dimmable", "Switchable" ]
});

// This is the device controller for our example motion sensor
// A device controller is essentially the implementation of 
// the interfaces that the device supports. Since this is just
// an example, the code below simply sets up a timer when the
// device controller is started and periodically emits a ‘motion’
// event, as defined in the MotionSensor interface. Normally the
// code in the device controller would take care of communicating
// with the device it controls and passing events along in the same
// way.
var ExampleMotionSensor = dev$.resource('Examples/ExampleMotionSensor', {
    start: function(options) {
        var self = this;

        console.log('Start ExampleMotionSensor');

        this._motionSenseInterval = setInterval(function() {
            self.emit('motion', Math.random());
        }, 4000);
    },
    stop: function() {
        clearInterval(this._motionSenseInterval);
    },
    state: { },
    commands: { }
});

// This is the device controller for the example light
// Again, since this is just an example it does not control
// an actual device. The code here would normally communicate
// with the device in question.
var ExampleLight = dev$.resource('Examples/ExampleLight', {
    start: function(options) {
        console.log('Start ExampleLight');
        this._power = 'off';
        this._brightness = 0.0;
    },
    stop: function() {
    },
    state: {
        power: {
            get: function() {
                return this._power;
            },
            set: function(value) {
                console.log('SET POWER', value);
                this._power = value;
            }
        },
        brightness: {
            get: function() {
                return this._brightness;
            },
            set: function(value) {
                console.log('SET BRIGHTNESS %d %%', parseInt(this._brightness*100));
                this._brightness = value;
            }
        }
    },
    commands: {
        on: function() {
            console.log('TURN ON LIGHT');
            return this.state.power.set('on');
        },
        off: function() {
            console.log('TURN OFF LIGHT');
            return this.state.power.set('off');
        }
    }
});


var exampleMotionSensor1 = new ExampleMotionSensor('motion1', dev$.getServerAddress(), { });
var exampleMotionSensor2 = new ExampleMotionSensor('motion2', dev$.getServerAddress(), { });
var exampleLight1 = new ExampleLight('light1', dev$.getServerAddress(), { });
var exampleLight2 = new ExampleLight('light2', dev$.getServerAddress(), { });
var exampleLight3 = new ExampleLight('light3', dev$.getServerAddress(), { });

// Bring all device controllers offline.
// This registers new devices with 
// devicejs and allows these device controllers’
// methods to be called
exampleMotionSensor1.start();
exampleMotionSensor2.start();
exampleLight1.start();
exampleLight2.start();
exampleLight3.start();
