const axios = require('axios');
const heicConvert = require('heic-convert');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.handler = async (event) => {
  const AXIOS_TIMEOUT = 8000;
  const MAX_RETRIES = 2;

  try {
    const data = JSON.parse(event.body);
    const { photos } = data;

    if (!photos?.length) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: [] })
      };
    }

    const convertedPhotos = await Promise.all(
      photos.map(async (photoUrl) => {
        if (!photoUrl.toLowerCase().endsWith('.heic')) {
          // Already browser-friendly
          return photoUrl;
        }
        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
          try {
            // Download the HEIC file
            const response = await axios.get(photoUrl, { responseType: 'arraybuffer', timeout: AXIOS_TIMEOUT });
            // Convert to JPEG
            const jpegBuffer = await heicConvert({
              buffer: Buffer.from(response.data),
              format: 'JPEG',
              quality: 0.8
            });
            // Upload the JPEG to Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                { resource_type: 'image', format: 'jpg', quality: 'auto' },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              ).end(jpegBuffer);
            });
            // Return the JPEG URL
            return uploadResult.secure_url;
          } catch (error) {
            if (attempt === MAX_RETRIES - 1) {
              console.error('HEIC conversion/upload failed:', error);
              return photoUrl; // fallback to original if all attempts fail
            }
          }
        }
        return photoUrl;
      })
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photos: convertedPhotos })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message,
        details: error.details || null
      })
    };
  }
}; 