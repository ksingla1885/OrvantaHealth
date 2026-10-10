const { S3Client, CreateBucketCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    forcePathStyle: true // Highly recommended for S3-compatible APIs
});

const BUCKET_NAME = 'orvantahealth';

// Attempt to create bucket on startup if it doesn't exist
s3Client.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }))
  .then(() => console.log('✓ Neon Storage bucket verified/created'))
  .catch(err => {
      if (err.name !== 'BucketAlreadyExists' && err.name !== 'BucketAlreadyOwnedByYou') {
          console.warn('Note: Could not ensure bucket creation:', err.message);
      }
  });

const labReportStorage = multerS3({
    s3: s3Client,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        cb(null, `lab-reports/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
    }
});

const prescriptionStorage = multerS3({
    s3: s3Client,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        cb(null, `prescriptions/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
    }
});

const profilePicStorage = multerS3({
    s3: s3Client,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        cb(null, `profiles/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
    }
});

module.exports = {
    s3Client,
    BUCKET_NAME,
    labReportStorage,
    prescriptionStorage,
    profilePicStorage
};
