var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL_ADDRESS',
    pass: 'PASSWORD'
  }
});

		 
		 
const videoMailOptions = {
  from: 'YOUR_EMAIL_ADDRESS', // sender address
  to: 'RECEPIENT_EMAIL_ADDRESS', // list of receivers
  subject: 'Intruder in your Castle..!!', // Subject line
  html: '<p>Some one is trying to steal your gold..!!</p>',// plain text body
  attachments: [{
		filename: 'IntruderVideo.h264',
           	 path: '/home/pi/Node_Programs/photos/video.h264' // stream this file
		}]
};

const photoMailOptions = {
  from: 'YOUR_EMAIL_ADDRESS', // sender address
  to: 'RECEPIENT_EMAIL_ADDRESS', // list of receivers
  subject: 'Intruder in your Castle..!!', // Subject line
  html: '<p>Some one is trying to steal your gold..!!</p>',// plain text body
  attachments: [{
		filename: 'IntruderImage.jpg',
           	 path: '/home/pi/Node_Programs/photos/test2.jpg' // stream this file
		}]
};


module.exports.sendMailPhoto = function (){

transporter.sendMail(photoMailOptions, function (err, info) {
   if(err){
     console.log(err.toString())
   }
   else{
     console.log('Photo email success..!!');
   }
});

}



module.exports.sendMailVideo = function (){

transporter.sendMail(videoMailOptions, function (err, info) {
   if(err){
     console.log(err.toString())
   }
   else{
     console.log('Video email success..!!');
   }
});

}