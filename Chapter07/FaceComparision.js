var GPIO = require('pigpio').Gpio,
		cameraModule = require('./CameraModuleRekognition'),	
		s3Bucket = require('./S3Put'),
		green_LED = new GPIO(19,{mode: GPIO.OUTPUT}),
		red_LED= new GPIO(17,{mode: GPIO.OUTPUT}),
		IR_out= new GPIO(5,{mode: GPIO.INPUT,alert: true});

	 	
red_LED.digitalWrite(0);
green_LED.digitalWrite(0);


/*
setInterval(function () {
//	console.log(button_IN.digitalRead())
},1000);  */
//green_LED.digitalWrite(1); 
	IR_out.on('alert', function(level, tick){

	if(level==1){	
	cameraModule.takeTargetPicture(function (callback) {
			var result = callback;
			if(result == 'success'){
					//upload in S3 and then do IndexFaces 
					console.log('Face Match Success...!!')
					green_LED.digitalWrite(1);
					setTimeout(function () {
						green_LED.digitalWrite(0);
					},5000)
			}
					
	})
						console.log('IR : Imaging you..!!')
					red_LED.digitalWrite(level);
		
	}
	else {
		red_LED.digitalWrite(level);

	}

})


