const PiCamera = require('pi-camera');

const myCameraPhoto = new PiCamera({
  mode: 'photo',
  output: `/home/pi/Node_Programs/photos/test2.jpg`,
  width: 640,
  height: 480,
  nopreview: false,
});

const myCameraVideo = new PiCamera({
  mode: 'video',
  output: `/home/pi/Node_Programs/photos/video.h264`,
  width: 1920,
  height: 1080,
  timeout: 5000, // Record for 5 seconds 
  nopreview: false,
});

var camerInUse = false;

module.exports.takePicture =  function (callback){

    if (camerInUse == false) {
    	  camerInUse = true;
        myCameraPhoto.snap()
         .then((result) => {
    	     console.log('Your picture was captured')
    	     callback('success')
    	     camerInUse = false;
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

module.exports.takeVideo =  function  (callback) {

if(camerInUse == false){
	camerInUse = true;
		myCameraVideo.record()
  	.then((result) => {
  	console.log('Recording completed…!!');
	callback('success')
	camerInUse = false;
	// Your video was captured 
  })
  .catch((error) => {
	console.log(error.toString());   
     // Handle your error 
  });

}
else{
	console.log('camera in use..')
}

}