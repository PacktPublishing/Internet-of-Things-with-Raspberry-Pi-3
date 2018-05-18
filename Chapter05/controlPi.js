var mqtt = require('mqtt')
var motor_Dir= require('./Motor_LED_1.2');

var options = {
                   port:'1883',
                   host: '192.168.1.5'
                 }

var client = mqtt.connect(options)

client.on('connect', () => {

  client.subscribe('controlPi/cmd');

  console.log ("\r\n Raspberry Pi mqtt client connected to broker \r\n ");
  
}) 



    client.on('message', (topic, message) => {
  
	message= message.toString();

	if(message=='clockwise'){
	    motor_Dir.rotate_clockwise((callback) =>{
	    	var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement);

	   });
	}
	else if(message=='anticlockwise'){
		motor_Dir.rotate_anti_clockwise((callback) =>{
			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)

		});
		
	}
	else {

		motor_Dir.motor_stop((callbacka)=> {

			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}
	          
})
