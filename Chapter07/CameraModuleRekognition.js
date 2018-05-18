var PiCamera = require('pi-camera'),
s3Bucket = require('./S3Put');

var myCameraPhoto = new PiCamera({
  mode: 'photo',
  output: `/home/pi/Node_Programs/photos/OrigReference.jpg`,
  width: 640,
  height: 480,
  nopreview: false,
});

var myCameraPhotoTarget = new PiCamera({
  mode: 'photo',
  output: `/home/pi/Node_Programs/photos/TargetImage.jpg`,
  width: 640,
  height: 480,
  nopreview: false,
});


var camerInUse = false;

module.exports.takePicture =  function (callback){

if (camerInUse == false) {
	camerInUse = true;
 myCameraPhoto.snap()
  .then((result) => {
	console.log('Your picture was captured')
	//callback('success') 
	s3Bucket.uploadToS3(callback);
	camerInUse = false;
	//sendMail();
    // Your picture was captured 
  })
  .catch((error) => {
	console.log(error.toString());
	callback(error.toString())
     // Handle your error 
  });
}
else {

	console.log('camera in use..')
	}
}



module.exports.takeTargetPicture =  function (callback){

if (camerInUse == false) {
	camerInUse = true;
 myCameraPhotoTarget.snap()
  .then((result) => {
	console.log('Your picture was captured')
	//callback('success') 
	s3Bucket.uploadTarget_to_S3(callback);
	camerInUse = false;
	//sendMail();
    // Your picture was captured 
  })
  .catch((error) => {
	console.log(error.toString());
	callback(error.toString())
     // Handle your error 
  });
}
else {

	console.log('camera in use..')
	}
}


