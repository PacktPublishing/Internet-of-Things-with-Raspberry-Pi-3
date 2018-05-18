var Client = require('node-rest-client').Client;

var client = new Client();


setInterval(function () {     
   	        
   	  var sendReq= client.get("http://127.0.0.1:9090/get/information", function (data) {   
                    console.log("response from server: "+data+' :: '+ new Date());
                     });	
	 
	      sendReq.on('error', function (err) {

                      console.log('request error', err);
                    });
  },5000);
