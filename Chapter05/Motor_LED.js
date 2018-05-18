var GPIO= require('onoff').Gpio;
var red_LED= new GPIO(17,'out'),
 			green_LED= new GPIO(5,'out'),
 			enable= new GPIO(23,'out'),
 			input_1= new GPIO(24,'out'),
 			input_2= new GPIO(25,'out');

module.exports.rotate_clockwise = function(callback){

 enable.writeSync(1);
 input_1.writeSync(1);
 input_2.writeSync(0);
 green_LED.writeSync(1);
 red_LED.writeSync(0);
 console.log ("Clockwise Rotation")
callback("Clockwise Rotation")
}


module.exports.rotate_anti_clockwise = function(callback){

 			enable.writeSync(1);
 input_1.writeSync(0);
 			input_2.writeSync(1);
 			green_LED.writeSync(0);
 			red_LED.writeSync(1);
 console.log ("Anti Clockwise Rotation")
callback ("Anti Clockwise Rotation")
	
}

module.exports.motor_stop = function(callback){

 			enable.writeSync(0);
 input_1.writeSync(0);
 			input_2.writeSync(0);
 			green_LED.writeSync(0);
 			red_LED.writeSync(0);
 console.log ("Motor Stopped")
callback ("Motor Stopped")
	
}
