const axios = require('axios');
const heicConvert = require('heic-convert');

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

    const batchSize = 3;
    const convertedPhotos = [];
    
    for (let i = 0; i < photos.length; i += batchSize) {
      const batch = photos.slice(i, i + batchSize);
      const batchPromises = batch.map(async (photoUrl) => {
        if (!photoUrl.toLowerCase().endsWith('.heic')) {
          return photoUrl;
        }

        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
          try {
            const response = await axios.get(photoUrl, {
              responseType: 'arraybuffer',
              timeout: AXIOS_TIMEOUT
            });

            // Skip large images
            if (response.data.length > 5000000) { // 5MB limit
              console.warn('Image too large:', photoUrl);
              return photoUrl;
            }

            const jpegBuffer = await heicConvert({
              buffer: Buffer.from(response.data),
              format: 'JPEG',
              quality: 0.8
            });

            return photoUrl.replace('.heic', '.jpg');
          } catch (error) {
            if (attempt === MAX_RETRIES - 1) {
              console.error('HEIC conversion failed:', error);
              return photoUrl;
            }
          }
        }
        return photoUrl;
      });

      const batchResults = await Promise.all(batchPromises);
      convertedPhotos.push(...batchResults);
    }

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