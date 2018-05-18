var request = require('request');

var requestPromise = require('request-promise');

var options = {
    uri: 'http://api.openweathermap.org/data/2.5/weather?id=1273293&APPID=db4d42dfc51faa72f27020abb02d8465',
   
};


var sensorData=require('./sensor')
var googleSheetAPI=require('./quickstart')


var sendInterval = setInterval(function () {

  var dataPacket= new Array(), i=0;

  requestPromise(options)
  
      .then(function (resp) {
         var APIresult=JSON.parse(resp);
  	
  	dataPacket[i]=APIresult.wind.speed

  	
  	dataPacket[++i]=APIresult.main.pressure
  	
  	
  	dataPacket[++i]=APIresult.sys.sunrise
  	
  	
  	dataPacket[++i]=APIresult.sys.sunset

      })
      .then(function(){
        	//get sensor data
        	
        	sensorData.getSensorData(function(callback){
          	var sensorDataResult=JSON.parse(callback);
          	console.log(sensorDataResult.temp_sens_1)
          	dataPacket[++i] =sensorDataResult.temp_sens_1
          	dataPacket[++i] =sensorDataResult.temp_sens_2
          	dataPacket[++i] =sensorDataResult.humidity
          	console.log(dataPacket)

          })
  	

      })
        .then(function(){
          googleSheetAPI.updateGoogleSheet(dataPacket)
  	

      })
      .catch(function (err) {
          // API call failed...
          console.log(err)
      });

},5000)

