var express = require('express');  
var app = express();



app.get('/get/information',function(req,res){
            console.log("get request received from client")
            res.send("success")
      })



var server= app.listen(9090,function(){
 var host = server.address().address;
 var port = server.address().port;
 console.log ("Example app listening at http://%s:%s", host, port);

})





