var AWS = require('aws-sdk'),
	indexfaces = require('./indexFaces'),
	searchFaces = require('./searchFacesByImage'),
    fs = require('fs');

// For dev purposes only

AWS.config.update({ accessKeyId: 'your accessKeyId', secretAccessKey: 'your secretAccessKey' });
AWS.config.region = 'region of your bucket';
var bucket = 'pibucketmaneesh';
var inputFilePathReferenceImage = '/home/pi/Node_Programs/photos/OrigReference.jpg';
var inputFilePathTargetImage = '/home/pi/Node_Programs/photos/TargetImage.jpg';
var s3 = new AWS.S3();

module.exports.uploadToS3 = function (callback) {
// Read in the file, convert it to base64, store to S3
fs.readFile(inputFilePathReferenceImage, function (err, data) {
  if (err) { throw err; }

    var base64data = new Buffer(data, 'binary');
    var params = {Bucket: bucket,
    Key: "OrigReferenceS3.jpg",
    Body: base64data};

    s3.putObject(params,function (err, data) {
    	if(err){
    		console.log(err.toString())
		}
		else{
				console.log(arguments);
      		console.log(data);
      		console.log('Successfully uploaded Image.');
      		indexfaces.IndexFacesMethod(callback)
		}
  });
  
});

}

module.exports.uploadTarget_to_S3 = function (callback) {
// Read in the file, convert it to base64, store to S3
fs.readFile(inputFilePathTargetImage, function (err, data) {
  if (err) { throw err; }

    var base64data = new Buffer(data, 'binary');
    var params = {
    	   Bucket: bucket,
      	Key: "TargetImageS3.jpg",
   	   Body: base64data
    };

    s3.putObject(params,function (err, data) {
    	if(err){
    		console.log(err.toString())
		}
		else{
				console.log(arguments);
      		console.log(data);
      		console.log('Successfully uploaded Image.');
      		searchFaces.searchFaceMethod(callback);
		}
  });
  
});

}


module.exports.deleteFromS3 = function () {
	
 var params = {
  Bucket: bucket, 
  Key: "OrigReferenceS3.jpg"
 };
 s3.deleteObject(params, function(err, data) {
   if (err) {
   	console.log(err, err.stack);
   	} 
   else  {
   	console.log(data);
   	}
  
 });

}