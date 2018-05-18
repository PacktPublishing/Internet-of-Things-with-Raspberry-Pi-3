var GPIO = require('pigpio').Gpio,
		cameraModule = require('./CameraModule'),
		emailModule = require('./EmailModule'),
		PIR_out= new GPIO(19,{mode: GPIO.INPUT,alert: true}),
		red_LED= new GPIO(17,{mode: GPIO.OUTPUT}),
		buzzer= new GPIO(26,{mode: GPIO.OUTPUT}),
		IR_out= new GPIO(5,{mode: GPIO.INPUT,alert: true}),
		trigger = new GPIO(16, {mode: GPIO.OUTPUT}),
		echo = new GPIO(21, {mode: GPIO.INPUT, alert: true});
		
		
trigger.digitalWrite(0); // Make sure trigger is low		
red_LED.digitalWrite(0);

PIR_out.on('alert', function(level, tick){
	if(level==1){
	
	cameraModule.takePicture(function (callback) {
			var result = callback;
			if(result == 'success'){
					emailModule.sendMailPhoto()		
			}
	})

		console.log('PIR : Intruder Alert..!!')
		red_LED.digitalWrite(level);
		buzzer.digitalWrite(level);
		
	}
	else {
		red_LED.digitalWrite(level);
		buzzer.digitalWrite(level);
	}

})


IR_out.on('alert', function(level, tick){
	if(level==1){
	
	cameraModule.takeVideo(function (callback) {
			var result = callback;
			if(result == 'success'){
					emailModule.sendMailVideo()	;
			}
	})

		console.log('IR : Intruder Alert..!!')
		red_LED.digitalWrite(level);
		buzzer.digitalWrite(level);
		
	}
	else {
		red_LED.digitalWrite(level);
		buzzer.digitalWrite(level);
	}

})





//The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
var MICROSECDONDS_PER_CM = 1000000/34321;
 
// Trigger a distance measurement once per second
setInterval(function () {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 5000);


 

  var startTick;
 
  echo.on('alert', function (level, tick) {
    var endTick,
      diff;
 
    if (level == 1) {
      startTick = tick;
    } else {
      endTick = tick;
      
      diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      var actualDist = (diff / 2 / MICROSECDONDS_PER_CM) ;
      if(actualDist <10){
      	console.log('Ultrasonic : Intruder Detected...!!')
			   red_LED.digitalWrite(1);
					cameraModule.takePicture(function (callback) {
							var result = callback;
							if(result == 'success'){
									emailModule.sendMailPhoto()		
								}
					})			   
      }
      else {
      	red_LED.digitalWrite(0);
      }
    }
  });

 


