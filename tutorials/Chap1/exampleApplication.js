// exampleApplication.js
// This application monitors the example
// motion sensors and toggles the example
// lights accordingly

var next = { 'on': 'off', 'off': 'on' };
var power = 'on';

var allMotionSensors = dev$.selectByInterface('MotionSensor');
allMotionSensors.subscribeToEvent('motion');

allMotionSensors.on('event', function(resourceID, type, data) {
    console.log(resourceID, 'emitted', type, 'with data', data);
    dev$.selectByInterface('Switchable').set('power', power);
    power = next[power];
});
