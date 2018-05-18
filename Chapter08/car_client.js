var mqtt = require('mqtt');
var motor_Dir= require ('./car_control.js ');

var options = {
                   port:'1883',
                 
                  host: IP_Adress_Of_Mqtt_Broker_Server
                 }


var client = mqtt.connect(options)
	client.on('connect', () => {
	client.subscribe('controlPi/cmd');
	 console.log ("\r\n Raspberry Pi mqtt client connected to broker \r\n ");
  })


  client.on('message', (topic, message) => {
	message= message.toString();
	
	else if(message=='forward'){
		motor_Dir.move_forward((callback)=> {
			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}
		else if(message=='reverse'){
		motor_Dir.move_reverse((callback)=> {
			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}

	else if(message=='right'){
		motor_Dir.move_right((callback)=> {
			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}
	else if(message=='left'){
		motor_Dir.move_left((callback)=> {
			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}
	else if(message=='stop') {

		motor_Dir.motor_stop((callback)=> {

			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}

	else if(message=='64'){
		motor_Dir.motor_speed(message,(callback)=> {
			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}




	else if(message=='128'){
		motor_Dir.motor_speed(message,(callback)=> {
			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}

	else if(message=='192'){
		motor_Dir.motor_speed(message,(callback)=> {
			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}
else if(message=='255'){
		motor_Dir.motor_speed(message,(callback)=> {
			var Acknowledgement=callback;
	   		client.publish('raspbPi/ack',Acknowledgement)
		})
	}


	else {
		console.log("wrong command")
	}	          
  })





