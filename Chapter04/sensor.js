'use strict';


var  GPIO= require('onoff').Gpio,
fs= require('fs');


//var heartBeat= new GPIO(22,'in');


var device1_path='/sys/bus/w1/devices/28-0516a05186ff/';
var device2_path='/sys/bus/w1/devices/28-0517026efdff/'


//DHT11

var rpiDhtSensor= require('rpi-dht-sensor');
var dht= new rpiDhtSensor.DHT11(27);



module.exports.getSensorData = function(callback){
    
var date= new Date();


//DHT11 humidity and temperature sensor
	
   var readout=dht.read()
   var dht11_data=JSON.parse(JSON.stringify(readout)),
   	dht11_data_humidity=dht11_data.humidity,
	dht11_data_temp=((dht11_data.temperature) * 9/5)+32;
	//console.log(dht11_data)
	//console.log(dht11_data.temperature);
	//console.log('\r\n'+dht11_data.humidity)



//DS18b20 sensor 1

	var sensor1Data =fs.readFileSync(device1_path+'w1_slave');
		sensor1Data=sensor1Data.toString().split('\n');
		var s1_line1Array=sensor1Data[0].split(' '),
		    s1_line2Array=sensor1Data[1].split('t='),
		    s1_raw_Temp=s1_line2Array[1],
		    s1_temp_C=s1_raw_Temp/1000,
		    s1_temp_C=(s1_temp_C * 9/5)+32
		//console.log(s1_temp_C);




//DS18b20 sensor 2

	var sensor2Data =fs.readFileSync(device2_path+'w1_slave');
		sensor2Data=sensor2Data.toString().split('\n');
		var s2_line1Array=sensor2Data[0].split(' '),
		    s2_line2Array=sensor2Data[1].split('t='),
		    s2_raw_Temp=s2_line2Array[1],
		    s2_temp_C=s2_raw_Temp/1000,
                    s2_temp_C= (s2_temp_C *9/5)+32
		//console.log(s2_temp_C);
	
		var sensordataPacket={

				"temp_sens_1":s1_temp_C,
				"temp_sens_2":s2_temp_C,
				"humidity":dht11_data.humidity}
		 


      sensordataPacket= JSON.stringify(sensordataPacket)
      //var message = new Message(dataPacket);
      
      //console.log('\r\n Sending message: ' + sensordataPacket +'\r\n');
	callback(sensordataPacket)

}



//sudo modprobe w1-gpio
//sudo modeprobe w1-therm
//dtoverlay=w1-gpio
