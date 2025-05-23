const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const heicConvert = require('heic-convert');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    const data = JSON.parse(event.body);

    // Transform data to match database schema
    const insertData = {
      title: data.title,
      date: new Date(data.date).toISOString(),
      meetingType: data.meetingType,
      description: data.description,
      tags: data.tags || [],
      photos: data.photos, // Keep original URLs
      thumbnail: data.thumbnail
    };

    // Handle HEIC images
    if (insertData.photos && insertData.photos.length > 0) {
      const convertedPhotos = await Promise.all(
        insertData.photos.map(async (photoUrl) => {
          if (photoUrl.toLowerCase().endsWith('.heic')) {
            try {
              // Fetch the image data from Cloudinary
              const response = await axios.get(photoUrl, { responseType: 'arraybuffer' });
              const imageBuffer = Buffer.from(response.data);

              // Convert HEIC to JPEG
              const jpegBuffer = await heicConvert({
                buffer: imageBuffer,
                format: 'JPEG',
                quality: 0.9
              });

              // Generate new URL for converted image
              return photoUrl.replace('.heic', '.jpg');
            } catch (error) {
              console.error('HEIC conversion error:', error);
              return photoUrl; // Return original URL if conversion fails
            }
          }
          return photoUrl; // Return non-HEIC URLs as-is
        })
      );
      insertData.photos = convertedPhotos;
    }

    const { data: result, error } = await supabase
      .from('gallery')
      .insert([insertData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result[0])
    };
  } catch (error) {
    console.error('Global error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        details: error.details || null
      })
    };
  }
};
