var AWS = require('aws-sdk'),
    fs = require('fs');

AWS.config.update({ accessKeyId: 'your accessKeyId', secretAccessKey: 'your secretAccessKey' });

AWS.config.update({region:'region of your bucket'});

   var  rekognition = new AWS.Rekognition();

module.exports.IndexFacesMethod = function (callback) {
var params = {
  CollectionId: 'piCollection', /* required */
  Image: { /* required */
    S3Object: {
      Bucket: 'pibucketmaneesh',
      Name: 'OrigReferenceS3.jpg'
    }
  },
  DetectionAttributes: [
    "ALL"
    /* more items */
  ],
  ExternalImageId: 'ImagePi'
};
rekognition.indexFaces(params, function(err, data) {
  if (err) {
  	console.log(err, err.stack);
  	 }
  else {
 	 console.log(JSON.stringify(data));    
  	 callback('success')
  	 }
});

}