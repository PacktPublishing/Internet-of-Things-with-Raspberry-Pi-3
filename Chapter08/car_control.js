var GPIO = require('pigpio').Gpio;



	var red_LED		 = new GPIO(17,{mode: GPIO.OUTPUT}),
	green_LED   	 = new GPIO(5,{mode: GPIO.OUTPUT}),
	front_left_LED	 = new GPIO(19,{mode: GPIO.OUTPUT}),
	front_right_LED  = new GPIO(26,{mode: GPIO.OUTPUT}),
	enable_1         = new GPIO(12,{mode: GPIO.OUTPUT}),
 	enable_2         = new GPIO(23,{mode: GPIO.OUTPUT}),
	input_1          = new GPIO(14,{mode: GPIO.OUTPUT}),
 	input_2          = new GPIO(15,{mode: GPIO.OUTPUT}),
	input_3          = new GPIO(24,{mode: GPIO.OUTPUT}),
 	input_4          = new GPIO(25,{mode: GPIO.OUTPUT});

 	var rightIndicatorHandler='', leftIndicatorHanlder= '';


 	module.exports.move_forward = function(callback){

 		clearInterval(leftIndicatorHanlder);
		clearInterval(rightIndicatorHandler);

		 	enable_1.digitalWrite(1);
			input_1.digitalWrite(0);
			input_2.digitalWrite(1);
	

	     	enable_2.digitalWrite(1);
 			input_3.digitalWrite(1);
 			input_4.digitalWrite(0);

 			green_LED.digitalWrite(1);
 			red_LED.digitalWrite(0);
			console.log ("move forward")
			callback ("move forward")
	}


module.exports.move_reverse = function(callback){
		clearInterval(leftIndicatorHanlder);
		clearInterval(rightIndicatorHandler);

		 enable_1.digitalWrite(1);
		 input_1.digitalWrite(1);
		 input_2.digitalWrite(0);

	     enable_2.digitalWrite(1);
 		 input_3.digitalWrite(0);
 		 input_4.digitalWrite(1);

 		  green_LED.digitalWrite(0);
 		  red_LED.digitalWrite(1);
		  console.log ("move reverse")
		  callback ("move reverse")
}


module.exports.move_right = function(callback){

	
		indicatorRight();
		 enable_1.digitalWrite(0);
		 input_1.digitalWrite(0);
		 input_2.digitalWrite(0);

	        enable_2.digitalWrite(1);
 	        input_3.digitalWrite(1);
 	         input_4.digitalWrite(0);
 	        // green_LED.digitalWrite(1);
 	        //  red_LED.digitalWrite(0);

	         console.log ("Turn Right")
	         callback ("Turn Right")
}

	
module.exports.move_left = function(callback){

			
			indicatorLeft();

			 enable_1.digitalWrite(1);
			 input_1.digitalWrite(0);
			 input_2.digitalWrite(1);

	        enable_2.digitalWrite(0);
 			input_3.digitalWrite(0);
 			input_4.digitalWrite(0);

 			//green_LED.digitalWrite(1);
 			//red_LED.digitalWrite(0);
			console.log ("Turn Left")
			callback ("Turn Left")
	}

module.exports.motor_stop = function(callback){

	 		clearInterval(leftIndicatorHanlder);
			clearInterval(rightIndicatorHandler);

 			enable_1.digitalWrite(0);
			input_1.digitalWrite(0);
 			input_2.digitalWrite(0);

			enable_2.digitalWrite(0);
 			input_3.digitalWrite(0);
 			input_4.digitalWrite(0);

 			green_LED.digitalWrite(0);
 			red_LED.digitalWrite(0);

 			
			
			console.log ("Motor Stopped")
			callback ("Motor Stopped")
}

module.exports.motor_speed = function(pwm,callback){
		 console.log(pwm)
		 enable_1.pwmWrite(pwm);
		enable_2.pwmWrite(pwm);
		 console.log ("speed change")
		 callback("speed change")
}




indicatorLeft = function(){
leftIndicatorHanlder = setInterval(function() {
	if(front_left_LED.digitalRead()==1){
				front_left_LED.digitalWrite(0)
		}
		else{
			 front_left_LED.digitalWrite(1)
			}
			 },250)
}


indicatorRight = function(){
rightIndicatorHandler = setInterval(function() {
	if(front_right_LED.digitalRead()==1){
				front_right_LED.digitalWrite(0)
		}
		else{
			 front_right_LED.digitalWrite(1)
			}
			 },250)
}


