  const mqtt = require('mqtt')
    const options={
                           port:'1883',
                           host:'192.168.1.5'
                 }

    const client = mqtt.connect(options)

client.on('connect', () => {
  console.log("Rpi mqtt client connected to broker\r\n")
  client.subscribe('sub/ack')   
})  


setInterval(function () {
                 console.log('Data pushed from Pi client on topic: pub/data ==> pi_data')
                 client.publish('pub/data','pi_data')     
            },5000)


client.on('message', (topic, message) => {
  if (topic=='sub/ack'){
                   console.log('Acknowledgement recieved on topic: '+topic+' ==> '+message.toString()+'\r\n')
}

})