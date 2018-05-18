 	const mqtt = require('mqtt')

 	const options={
                           port:'1883',
                           host:'127.0.0.1'
                 }

    const client = mqtt.connect(options)

    client.on('connect', () => {
 	 client.subscribe('pub/data')  ;
 	 console.log("\r\ndesktop mqtt client connected to broker \r\n ");
  
	}) 


client.on('message', (topic, message) => {

   if (topic=='pub/data') {
      console.log('Data recieved from Rpi client on topic: pub/data '+ message.toString());
      client.publish('sub/ack','Ack: Success..!!');
      console.log("Acknowledgement sent to Rpi client ==> Ack: Success..!! \r\n")

     }            
})

