var AWS = require('aws-sdk'),
    fs = require('fs');

// For dev purposes only
AWS.config.update({ accessKeyId: 'your accessKeyId', secretAccessKey: 'your secretAccessKey' });
AWS.config.update({region:'ap-southeast-2'});
var  rekognition = new AWS.Rekognition();


module.exports.searchFaceMethod = function (callback) {
var params = {
  CollectionId: 'piCollection', 
  Image: { 
   
    S3Object: {
      Bucket: 'pibucketmaneesh',
      Name: 'TargetImageS3.jpg'     
    }
  },
  FaceMatchThreshold: 90.0,
  MaxFaces: 1
};
rekognition.searchFacesByImage(params, function(err, data) {
  if (err) {
  	console.log(err, err.stack);
  	}
  else { 
   console.log(JSON.stringify(data)); 
   callback('success')
    }
});

}